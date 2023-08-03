const mongoose = require("mongoose");
const Schema = mongoose.Schema 

const actuacionesSchema = new Schema(
    {
        idcoche: {type:String, require:true},
        fechaActuacion: {type:String, require:true},
        numKilometros: {type:Number, require:false},
        descripcion: {type:String, require:true}
    },{
        timestamps: true 
    }
)

const Actuaciones = mongoose.model("actuaciones", actuacionesSchema);

const fotoActuacionesSchema = new Schema(
   {
        idactuacion: {type:String, require:true},
        imagen: {type:String, require:true},
        descripcion: {type:String, require:true}
   },{
        timestamps: true 
   }
)

const FotoActuaciones = mongoose.model("fotoactuaciones", fotoActuacionesSchema);

const recambioActuacionesSchema = new Schema(
   {
        idactuacion: {type:String, require:true},
        recambio: {type:String, require:true},
        importe: {type:Number, require:true}
   },{
        timestamps: true 
   }
)

const RecambiosActuaciones = mongoose.model("recambiosactuaciones", recambioActuacionesSchema);

module.exports = {Actuaciones, FotoActuaciones, RecambiosActuaciones}