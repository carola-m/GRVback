const mongoose = require("mongoose");
const Schema = mongoose.Schema 

const clientesSchema = new Schema(
    {
        name: {type:String, require:true},
        lastname: {type:String, require:true},
        email: {type:String, require:true},
        fecnacimiento: {type:String, require:false},
        direccion: {type:String, require:false},
        localidad: {type:String, require:false},
        codigopostal: {type:String, require:false}
},{
   timestamps: true 
})

const Clientes = mongoose.model("clientes", clientesSchema);

module.exports = Clientes