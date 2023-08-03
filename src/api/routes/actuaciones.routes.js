const express = require("express");

const {getActuacion, getActuacionbyId, postActuacion, putActuacion, deleteActuacion, postFotoActuacion, putFotoActuacion, deleteFotoActuacion, postRecambio, putRecambio, deleteRecambio } = require("../controllers/actuaciones.controllers");
const {isAuth, isAdmin} = require("../../middlewares/auth");
const upload = require('../../middlewares/upload.file');

const actuacionRouter = express.Router();

actuacionRouter.get("/:id", [isAuth], getActuacion)
actuacionRouter.get("/detalle/:id", [isAuth], getActuacionbyId)

actuacionRouter.post('/', [isAdmin], postActuacion)
actuacionRouter.put("/:id", [isAdmin], putActuacion)
actuacionRouter.delete("/:id", [isAdmin], deleteActuacion)

actuacionRouter.post('/foto', [isAdmin], postFotoActuacion)
actuacionRouter.delete("/foto/:id", [isAdmin], deleteFotoActuacion)

actuacionRouter.post('/recambio', [isAdmin], postRecambio)
actuacionRouter.put("/recambio/:id", [isAdmin, upload.single('imagen')], putRecambio)
actuacionRouter.delete("/recambi/:id", [isAdmin], deleteRecambio)

module.exports = actuacionRouter