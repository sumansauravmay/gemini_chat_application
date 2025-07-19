const express = require("express");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { createChatRoom, getAllChatRooms } = require("./controller/createChatRoom");

const chatrouter = express.Router();

chatrouter.post("/chatroom", authMiddleware, createChatRoom);
chatrouter.get("/chatroom", authMiddleware, getAllChatRooms);

module.exports = { chatrouter };
