const express = require("express");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { createChatRoom } = require("./controller/createChatRoom");
const { getChatRoomById } = require("./controller/getChatRoomById");
const { getAllChatRooms } = require("./controller/getAllChatRooms");

const chatrouter = express.Router();

chatrouter.post("/chatroom", authMiddleware, createChatRoom);
chatrouter.get("/chatroom", authMiddleware, getAllChatRooms);
chatrouter.get("/chatroom/:id", authMiddleware, getChatRoomById);

module.exports = { chatrouter };
