const { Coches, FotoCoches } = require ("../models/coches.models")

const getCoches = async(req, res) => {
    try {
        const {id} = req.params;
        const allCoches = await Coches.find({idcliente:id});
        if (allCoches.length == 0)
            return res.status(404).json({message: "No hay coches asociados al cliente informados"})
        
        return res.status(200).json(allCoches);
    } catch (error) { 
        return res.status(500).json(error)
    }
}

const getCochebyId = async (req, res) =>  {
    try {
       const {id} = req.params;
       const findCoche = await Coches.findById(id);

       if (!findCoche){
          return res.status(404).json({message: 'El Id informado no esta asociado a ningun coche'}); 
       }

       //Recupero las fotos de los coches.
       const allFotos = await FotoCoches.find({idcoche:id});

       return res.status(200).json({coche:findCoche, fotos:allFotos}) ;
    } catch (error) {
       return res.status(500).json(error) ;
    }
    // res.send('listado movies')
};

const postCoche = async(req, res) => {
    try {
       //grabo el dato del coche
       const newCoche = new Coches(req.body)
       const createdCoche = await newCoche.save()

       // No ha habido errores.
       return res.status(201).json(createdCoche);
    } catch (error) { 
       return res.status(500).json(error)
    }
}

const putCoche = async(req, res) => {
    try {
        const {id} = req.params;
        const putCoche = new Coches(req.body)
        putCoche._id=id;
        
        const updatedCoches = await Coches.findByIdAndUpdate(id, putCoches);
        if (!updatedCoches){
            return res.status(404).json({message: "El Id informado no esta asociado a ningun coche"})
        }

        return res.status(200).json(updatedCoche)   
    } catch (error) { 
        return res.status(500).json(error)
    }
}

const deleteCoche = async(req, res) => {
    try {
        const {id} = req.params
        const deletedCoche = await Coches.findByIdAndDelete(id);

        if(!deletedCoche) {
            return res.status(404).json({message: "El Id informado no esta asociado a ningun coche"})
        }
          
        return res.status(200).json(deletedCoche)
    } catch (error) { 
        return res.status(500).json(error)
    }
}


const postFotoCoche = async(req, res) => {
    try {
       //grabo el dato del coche
       const newFotoCoche = new FotoCoches(req.body)

       if (req.file)
       {
          newFotoCoche.imagen = req.file.path;
       }
 
       const createdFotoCoche = await newFotoCoche.save()

       // No ha habido errores.
       return res.status(201).json(createdFotoCoche);
    } catch (error) { 
       return res.status(500).json(error)
    }
}

const deleteFotoCoche = async(req, res) => {
    try {
        const {id} = req.params
        const deletedFotoCoche = await FotoCoches.findByIdAndDelete(id);

        if(!deletedFotoCoche) {
            return res.status(404).json({message: "El Id informado no esta asociado a ninguna foto de coche"})
        }
        if (deletedFotoCoche.imagen)
           deleteFile(deletedFotoCoche.imagen)          

        return res.status(200).json(deletedFotoCoche)
    } catch (error) { 
        return res.status(500).json(error)
    }
}
module.exports = {getCoches, getCochebyId, postCoche, putCoche, deleteCoche, postFotoCoche, deleteFotoCoche }