const mongoose = require("mongoose");
const Schema = mongoose.Schema 

const cochesSchema = new Schema(
    {
        idcliente: {type:String, require:true},
        marca: {type:String, require:true},
        modelo: {type:String, require:true},
        matricula: {type:String, require:true},
        fecmatriculacion: {type:String, require:false},
        fecultitv: {type:String, require:false}
},{
   timestamps: true 
})

const Coches = mongoose.model("coches", cochesSchema);

const fotoCochesSchema = new Schema(
    {
        idcoche: {type:String, require:true},
        imagen: {type:String, require:true},
        descripcion: {type:String, require:true}
},{
   timestamps: true 
})

const FotoCoches = mongoose.model("fotocoches", fotoCochesSchema);

module.exports = {Coches, FotoCoches}