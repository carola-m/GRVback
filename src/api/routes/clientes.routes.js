const express = require("express");

const {getClientesPaginado, getCliente, getClientebyId, postCliente, putCliente, deleteCliente } = require("../controllers/clientes.controllers");

const {isAuth, isAdmin} = require("../../middlewares/auth");

const clientesRouter = express.Router();

clientesRouter.get("/pagina", [isAuth], getClientesPaginado)
clientesRouter.get("/:id", [isAuth], getClientebyId)
clientesRouter.get("/", [isAuth], getCliente)

clientesRouter.post('/', [isAdmin], postCliente)
clientesRouter.put("/:id", [isAdmin], putCliente)
clientesRouter.delete("/:id", [isAdmin], deleteCliente)

module.exports = clientesRouter