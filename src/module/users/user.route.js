
const express = require('express');
const { addNewUser, getAllUsers, getUserById } = require('./controller/addNewUser');
const { loginUser, verifyOtp } = require('./controller/userLogin');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { getOtpForForgetPassword, resetPassword } = require('./controller/forgetPassword');


const userRouter = express.Router();

// registration
userRouter.post("/signup", addNewUser);
//login
userRouter.post("/send-otp", loginUser);
//verify otp
userRouter.post("/verify-otp", verifyOtp);

//forget Password
userRouter.post("/forgot-password", getOtpForForgetPassword);
//reset password
userRouter.post("/change-password", authMiddleware, resetPassword);


userRouter.get("/all-users", getAllUsers);


userRouter.get("/user/me", authMiddleware, getUserById)



module.exports = {userRouter};
