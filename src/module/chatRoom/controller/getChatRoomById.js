const { pool } = require("../../../config/db");
const { getChatRoomByIdQuery } = require("../chatRoom.queries");

const getChatRoomById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(getChatRoomByIdQuery, [id]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Chat room not found" });
    }
    return res.status(200).json({ success: true, chatRoom: result.rows[0] });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { getChatRoomById };
