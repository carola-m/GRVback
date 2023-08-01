const express = require("express");

const {login, register, regcliente, checkSession, prueba, changepw, resetpw} = require("../controllers/user.controllers");
const {isAuth} = require("../../middlewares/auth");
const { reset } = require("nodemon");

const userRouter = express.Router();

userRouter.get("/prueba", prueba);

userRouter.post("/login", login);
userRouter.post("/regoffline", register)
userRouter.post("/regcliente", regcliente)
userRouter.post("/checksession", checkSession)
userRouter.put("/chgpasswd/:id", changepw)
userRouter.post("/resetpw", resetpw)

module.exports = userRouter