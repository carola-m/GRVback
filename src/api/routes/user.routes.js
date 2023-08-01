const express = require("express");

const {login, register, checkSession, changepw, resetpw} = require("../controllers/user.controllers");
const {isAuth} = require("../../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/regoffline", register)
userRouter.post("/checksession", checkSession)
userRouter.put("/chgpasswd/:id", changepw)
userRouter.post("/resetpw", resetpw)

module.exports = userRouter