const jwt = require("jsonwebtoken");
const { pool } = require("../../../config/db");
const bcrypt = require("bcrypt");
const { generateOTP } = require("../../../utils/generateOtp");
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

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "24h",
    });
    let otpMail = generateOTP();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      otpMail,
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    // console.error("Error logging in:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otpMail } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide email." });
  }
  if (!otpMail) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide email OTP." });
  }
  try {
    const result = await pool.query(
      "SELECT * FROM user_otps WHERE email = $1 ORDER BY expires_at DESC LIMIT 1",
      [email]
    );

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "No OTP found. Please request a new one.",
        });
    }

    const otpRecord = result.rows[0];

    // Check if OTP is expired
    if (new Date() > otpRecord.expires_at) {
      return res
        .status(400)
        .json({
          success: false,
          message: "OTP expired. Please request a new one.",
        });
    }

    // Check if OTP matches
    if (otpRecord.otp !== otpMail) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    // If valid, you can optionally delete it (to prevent reuse)
    await pool.query("DELETE FROM user_otps WHERE id = $1", [otpRecord.id]);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  loginUser,
};
