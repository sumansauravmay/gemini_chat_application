// controller/createChatRoom.js
const { pool } = require("../../../config/db");
const {
  insertChatRoomQuery,
  getAllChatRoomQuery,
  createChatRoomTable,
} = require("../chatRoom.queries");


const initializeChatRommTable = async () => {
  try {
    await pool.query(createChatRoomTable);
    console.log("Chat room table is ready");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};


const createChatRoom = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const result = await pool.query(insertChatRoomQuery, [userId, title]);

    res.status(201).json({ success: true, chatroom: result.rows[0] });
  } catch (error) {
    console.error("Error creating chatroom:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};




module.exports = { createChatRoom, initializeChatRommTable };
