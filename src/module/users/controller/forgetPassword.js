const { pool } = require("../../../config/db");
const { generateOTP } = require("../../../utils/generateOtp");
const { updateUserQuery } = require("../userSchema/user.queries");
const bcrypt = require("bcrypt");



const getOtpForForgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email" });
    }

    let otp = generateOTP();
    const otp_expires_at = new Date(Date.now() + 10 * 60 * 1000);

    await pool.query(updateUserQuery, [
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
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


// reset password after OTP verification
const resetPassword = async (req, res) => {
  const { id } = req.user;
  const { newPassword } = req.body;

  if (!newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "New password is required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [hashedPassword, id]
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


module.exports = { getOtpForForgetPassword, resetPassword };
