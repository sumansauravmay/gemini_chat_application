


const express = require('express');
const { userRouter } = require('../module/users/user.route');
const { chatrouter } = require('../module/chatRoom/chatRoom.route');
const { subscriptionRouter } = require('../module/subscriptionPayment/subscription.route');
const allRoutes = express.Router();

allRoutes.use('/auth', userRouter);
allRoutes.use('/', chatrouter);
allRoutes.use('/subscribe', subscriptionRouter);





module.exports = { allRoutes };