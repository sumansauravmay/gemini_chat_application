const express = require("express");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { createChatRoom } = require("./controller/createChatRoom");

const chatrouter = express.Router();

chatrouter.post("/chatroom", authMiddleware, createChatRoom);

module.exports = { chatrouter };
