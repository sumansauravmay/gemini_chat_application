
const express = require('express');
const { addNewUser, getAllUsers, getUserById } = require('./controller/addNewUser');
const { loginUser, verifyOtp } = require('./controller/userLogin');


const userRouter = express.Router();


userRouter.post("/add-user", addNewUser)
userRouter.post("/login-user", loginUser)
userRouter.post("/login-user/verify", verifyOtp)



userRouter.get("/all-users", getAllUsers)
userRouter.get("/user/:id", getUserById)



module.exports = {userRouter};
