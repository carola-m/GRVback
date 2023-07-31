const express = require("express");

const {login, register, checkSession, prueba} = require("../controllers/user.controllers");
const {isAuth} = require("../../middlewares/auth");

const userRouter = express.Router();

userRouter.get("/prueba", prueba);

userRouter.post("/login", login);
userRouter.post("/register",register)
userRouter.post("/checksession", checkSession)

module.exports = userRouter