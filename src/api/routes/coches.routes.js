const express = require("express");
const upload = require('../../middlewares/upload.file');

const {getCoches, getCochebyId, postCoche, putCoche, deleteCoche, postFotoCoche, deleteFotoCoche } = require("../controllers/coches.controllers");

const {isAuth, isAdmin} = require("../../middlewares/auth");

const cochesRouter = express.Router();

cochesRouter.get("/:id", [isAuth], getCoches)
cochesRouter.get("/detalle/:id", [isAuth], getCochebyId)

cochesRouter.post('/', [isAdmin], postCoche)
cochesRouter.put("/:id", [isAdmin], putCoche)
cochesRouter.delete("/:id", [isAdmin], deleteCoche)

cochesRouter.post('/foto', [isAdmin, upload.single('imagen')], postFotoCoche)
cochesRouter.delete("/foto/:id", [isAdmin], deleteFotoCoche)

module.exports = cochesRouter