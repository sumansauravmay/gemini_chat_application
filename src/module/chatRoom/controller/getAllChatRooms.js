const { pool } = require("../../../config/db");
const { getAllChatRoomQuery } = require("../chatRoom.queries");

const getAllChatRooms = async (req, res) => {
  //   const userId = req.user.id;
  //   try {
  //     const result = await pool.query(getAllChatRoomQuery, [userId]);
  //     return res.status(200).json({ success: true, chatRooms: result.rows });
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //     return res
  //       .status(500)
  //       .json({ success: false, message: "Internal server error" });
  //   }

  const userId = req.user.id;
  const cacheKey = `chatrooms:${userId}`;

  const cached = await redis.get(cacheKey);
  if (cached) return res.json({ success: true, chatrooms: JSON.parse(cached) });

  const result = await pool.query(
    "SELECT * FROM chatrooms WHERE user_id = $1",
    [userId]
  );
  redis.set(cacheKey, JSON.stringify(result.rows), "EX", 600); // 10 minutes

  res.json({ success: true, chatrooms: result.rows });
};

module.exports = { getAllChatRooms };
