const { cache } = require("../../../config/cacheQueue");
const { pool } = require("../../../config/db");
const { generateGeminiContent } = require("../../../services/geminiApi");
const {
  insertMessageQuery,
  createMessagesTable,
} = require("../chatRoom.queries");

// Create table (ensure it exists)
const initializeMessagesTable = async () => {
  try {
    await pool.query(createMessagesTable);
    console.log("Messages table is ready");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};

const messageChatRoom = async (req, res) => {
  try {
    const userId = req.user.id;
    const chatroomId = req.params.id;
    const { message } = req.body;

    if (!message) {
      return res
        .status(400)
        .json({ success: false, message: "Message required" });
    }

    const cacheKey = `chat:${chatroomId}:msg:${message.trim().toLowerCase()}`;
    let geminiResponse = cache.get(cacheKey);

    if (!geminiResponse) {
      // Not in cache — generate response and cache it
      geminiResponse = await generateGeminiContent(message);
      cache.set(cacheKey, geminiResponse);
    }

    await pool.query(insertMessageQuery, [chatroomId, "user", userId, message]);

    // const geminiResponse = await generateGeminiContent(message);
    await pool.query(insertMessageQuery, [
      chatroomId,
      "gemini",
      null,
      geminiResponse,
    ]);
    return res.status(200).json({
      success: true,
      userMessage: message,
      geminiResponse,
      fromCache: !!cache.get(cacheKey),
    });
  } catch (error) {
    console.error("Error in messageChatRoom:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { messageChatRoom, initializeMessagesTable };
