

const express = require("express");
const { subscribePro, getSubscriptionStatus } = require("./subscriptionController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const subscriptionRouter = express.Router();


subscriptionRouter.post("/pro", authMiddleware, subscribePro);

subscriptionRouter.get("/status", authMiddleware, getSubscriptionStatus);



module.exports = { subscriptionRouter };