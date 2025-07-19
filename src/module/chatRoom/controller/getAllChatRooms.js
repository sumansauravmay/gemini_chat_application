const { pool } = require("../../../config/db");
const { getAllChatRoomQuery } = require("../chatRoom.queries");

const getAllChatRooms = async (req, res) => {
  try {
    const result = await pool.query(getAllChatRoomQuery);
    return res.status(200).json({ success: true, chatRooms: result.rows });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { getAllChatRooms };

