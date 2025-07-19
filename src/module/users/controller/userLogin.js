const jwt = require("jsonwebtoken");
const { pool } = require("../../../config/db");
const bcrypt = require("bcrypt");
const { generateOTP } = require("../../../utils/generateOtp");
const { updateUserQuery } = require("../userSchema/user.queries");
const SECRET_KEY = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    // Check if user exists
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    let otp = generateOTP();
    const otp_expires_at = new Date(Date.now() + 10 * 60 * 1000);

    const updateResult = await pool.query(updateUserQuery, [
      user.id,
      user.name,
      user.email,
      user.phone,
      user.password,
      otp,
      otp_expires_at,
      false,
    ]);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully. Please verify your email/sms otp",
      otp,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otpMail } = req.body;

  if (!email || !otpMail) {
    return res.status(400).json({
      success: false,
      message: "Email and OTP are required",
    });
  }

  try {
    // Fetch user by email
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check OTP match
    if (user.otp !== otpMail) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Check if OTP is expired
    if (!user.otp_expires_at || new Date() > user.otp_expires_at) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // Mark user as verified, clear OTP and expiry
    await pool.query(
      "UPDATE users SET is_verified = true, otp = NULL, otp_expires_at = NULL WHERE email = $1",
      [email]
    );

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully. User is now verified.",
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  loginUser,
  verifyOtp,
};
