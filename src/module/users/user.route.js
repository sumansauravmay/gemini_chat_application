
const express = require('express');
const { addNewUser, getAllUsers, getUserById } = require('./controller/addNewUser');
const { loginUser } = require('./controller/userLogin');


const userRouter = express.Router();


userRouter.post("/add-user", addNewUser)
userRouter.get("/all-users", getAllUsers)
userRouter.get("/user/:id", getUserById)
userRouter.get("/login-user", loginUser)



module.exports = {userRouter};
