const { Actuaciones, FotoActuaciones, RecambiosActuaciones } = require ("../models/actuaciones.models")

const getActuacion = async(req, res) => {
    try {
        const {id} = req.params;
        const allActuaciones = await Actuaciones.find({idcoche:id});
        if (allActuaciones.length == 0)
            return res.status(404).json({message: "No hay actuaciones asociados al coche informado"})
        
        return res.status(200).json(allActuaciones);
    } catch (error) { 
        return res.status(500).json(error)
    }
}

const getActuacionbyId = async (req, res) =>  {
    try {
       const {id} = req.params;
       const findActuacion = await Actuaciones.findById(id);

       if (!findActuacion){
          return res.status(404).json({message: 'El Id informado no esta asociado a ninguna actuacion sobre algun coche'}); 
       }

       //Recupero las fotos de los coches.
       const allFotosActuacion = await FotoActuaciones.find({idactuacion:id});

       //Recupero los recambios de los coches.
       const allRecambiosActuacion = await RecambiosActuaciones.find({idactuacion:id});

       return res.status(200).json({actuacion:findActuacion,fotos:allFotosActuacion, recambios:allRecambiosActuacion}) ;
       
    } catch (error) {
       return res.status(500).json(error) ;
    }
    // res.send('listado movies')
};

const postActuacion = async(req, res) => {
    try {
       //grabo el dato del coche
       const newActuacion = new Actuaciones(req.body)
       const createdActuacion = await newActuacion.save()

       // No ha habido errores.
       return res.status(201).json(createdActuacion);
    } catch (error) { 
       return res.status(500).json(error)
    }
}

const putActuacion = async(req, res) => {
    try {
        const {id} = req.params;
        const putActuacion = new Actuaciones(req.body)
        putActuacion._id=id;
        
        const updatedActuacion = await Actuaciones.findByIdAndUpdate(id, putActuacion);
        if (!updatedActuacion){
            return res.status(404).json({message: "El Id informado no esta asociado a ninguna actuacion sobre algun coche"})
        }

        return res.status(200).json(updatedActuacion)   
    } catch (error) { 
        return res.status(500).json(error)
    }
}

const deleteActuacion = async(req, res) => {
    try {
        const {id} = req.params
        const deletedActuacion = await Actuaciones.findByIdAndDelete(id);

        if(!deletedActuacion) {
            return res.status(404).json({message: "El Id informado no esta asociado a ninguna actuacion sobre algun coche"})
        }
          
        return res.status(200).json(deletedActuacion)
    } catch (error) { 
        return res.status(500).json(error)
    }
}

const postFotoActuacion = async(req, res) => {
    try {
       //grabo el dato del coche
       const newFotoActuacion = new FotoActuaciones(req.body)

       if (req.file)
       {
        newFotoActuacion.imagen = req.file.path;
       }
 
       const createdFotoActuacion = await newFotoActuacion.save()

       // No ha habido errores.
       return res.status(201).json(createdFotoActuacion);
    } catch (error) { 
       return res.status(500).json(error)
    }
}

const deleteFotoActuacion = async(req, res) => {
    try {
        const {id} = req.params
        const deletedFotoActuaciones = await FotoActuaciones.findByIdAndDelete(id);

        if(!deletedFotoActuaciones) {
            return res.status(404).json({message: "El Id informado no esta asociado a ninguna foto de actuacion sobre coche"})
        }

        if (deletedFotoActuaciones.imagen)
           deleteFile(deletedFotoActuaciones.imagen)          

        return res.status(200).json(deletedFotoActuaciones)
    } catch (error) { 
        return res.status(500).json(error)
    }
}

const postRecambio = async(req, res) => {
    try {
       //grabo el dato del coche
       const newRecambio = new RecambiosActuaciones(req.body)
       const createdRecambio = await newRecambio.save()

       // No ha habido errores.
       return res.status(201).json(createdRecambio);
    } catch (error) { 
       return res.status(500).json(error)
    }
}
const putRecambio = async(req, res) => {
    try {
        const {id} = req.params;
        const putRecambio = new RecambiosActuaciones(req.body)
        putRecambio._id=id;
        
        const updatedRecambio = await RecambiosActuaciones.findByIdAndUpdate(id, putRecambio);
        if (!updatedRecambio){
            return res.status(404).json({message: "El Id informado no esta asociado a ningun recambio de actuacion sobre algun coche"})
        }

        return res.status(200).json(updatedRecambio)   
    } catch (error) { 
        return res.status(500).json(error)
    }
}
const deleteRecambio = async(req, res) => {
    try {
        const {id} = req.params
        const deletedRecambio = await RecambiosActuaciones.findByIdAndDelete(id);

        if(!deletedRecambio) {
            return res.status(404).json({message: "El Id informado no esta asociado a ningun recambio de actuacion sobre algun coche"})
        }

        return res.status(200).json(deletedRecambio)
    } catch (error) { 
        return res.status(500).json(error)
    }
}

module.exports = {getActuacion, getActuacionbyId, postActuacion, putActuacion, deleteActuacion, postFotoActuacion, deleteFotoActuacion, postRecambio, putRecambio, deleteRecambio }