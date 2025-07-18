const { pool } = require("../../../config/db");
const bcrypt = require("bcrypt");
const {
  createUserTableQuery,
  insertUserQuery,
  getAllUserQuery,
  getUsersByIdQuery,
} = require("../userSchema/user.queries");

// Create table (ensure it exists)
const initializeUserTable = async () => {
  try {
    await pool.query(createUserTableQuery);
    console.log("Users table is ready");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};

const addNewUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(insertUserQuery, [
      name,
      email,
      phone,
      hashedPassword,
    ]);

    return res.status(201).json({
      success: true,
      message: "User added successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(getAllUserQuery);
    return res.status(200).json({ success: true, users: result.rows });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(getUsersByIdQuery, [id]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  initializeUserTable,
  addNewUser,
  getAllUsers,
  getUserById,
};
