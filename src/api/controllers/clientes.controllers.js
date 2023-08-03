const Clientes = require ("../models/clientes.models")
const User = require ("../models/user.models")
const bcrypt = require("bcrypt")
const randomstring = require("randomstring");
const { enviarMail } = require('../../utils/sendmail');

const getCliente = async(req, res) => {
    try {
        const allCliente = await Clientes.find();
        if (allCliente.length == 0)
            return res.status(404).json({message: "No hay clientes informados"})
        
        return res.status(200).json(allCliente);
    } catch (error) { 
        return res.status(500).json(error)
    }
}

const getClientebyId = async (req, res) =>  {
    try {
       const {id} = req.params;
       const idCliente = await Clientes.findById(id);

       if (!idCliente){
          return res.status(404).json({message: 'El Id informado no esta asociado a ningun cliente'}); 
       }

       return res.status(200).json(idCliente) ;
    } catch (error) {
       return res.status(500).json(error) ;
    }
    // res.send('listado movies')
};

//GET PAGINADO
const getClientesPaginado = async(req,res) => {
    try {
        //Recoger querys de numero de pagina(page) y limite por pagina(limit)
        let {page, limit} = req.query;
        
        //Contar el numero de elementos en mi coleccion
        const numClientes = await Clientes.countDocuments();
        
        //Si no está seteado seteo el limite a 5
        limit = limit ? parseInt(limit) || 5 : 5;

        //Comprobar el numero máximo de paginas dependiendo de mi limite
        let numPages = numClientes%limit > 0 ? numClientes/limit + 1 : numClientes/limit;

        //Si no está seteado seteo el numero de pagina a 1
        page = page > numPages ? numPages : page < 1 ? 1 :  parseInt(page) || 1;

        // Calculo el salto(skip) que tengo que dar a mi find para empezar a partir del elemento que quiero
        const skip = (page - 1) * limit;

        const allClientes = await Clientes.find().skip(skip).limit(limit);

        const response = {
            info: {
                numClientes: numClientes,
                page: page,
                limit: limit,
                nextPage: numPages >= page + 1 ? `/pagina?page=${page + 1}&limit=${limit}` : null,
                previusPage: page != 1 ? `/pagina?page=${page - 1}&limit=${limit}` : null
            },
            results: allClientes
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error)
    }
}

const postCliente = async(req, res) => {
    try {
       //grabo el dato del cliente 
       const newCliente = new Clientes(req.body)
       const createdCliente = await newCliente.save()

       //grabo el dato asociado a user-login
       //let newpassword = 'pepe1234%&$'
       let newPassword = randomstring.generate(8);

    //    console.log(newPassword);

       let userTmp = {};
       userTmp = {name:createdCliente.name}
       userTmp = {...userTmp, lastname:createdCliente.lastname}
       userTmp = {...userTmp, email:createdCliente.email}

       //Encriptar password
       let newPasswordEnc = bcrypt.hashSync(newPassword, 10)     

       userTmp = {...userTmp, password:newPasswordEnc}
       userTmp = {...userTmp, updatedPW:true}
       userTmp = {...userTmp, idcliente:createdCliente._id}

       const newUser = new User(userTmp)
       const createdUser = await newUser.save()

       enviarMail(createdCliente.email, newPassword);

       // No ha habido errores.
       return res.status(201).json(createdCliente);
    } catch (error) { 
       return res.status(500).json(error)
    }
}

const putCliente = async(req, res) => {
    try {
        const {id} = req.params;
        const putCliente = new Clientes(req.body)
        putCliente._id=id;
        
        const updatedCliente = await Clientes.findByIdAndUpdate(id, putCliente);
        if (!updatedCliente){
            return res.status(404).json({message: "El Id informado no esta asociado a ningun cliente"})
        }

        // actualizo lod satos del usuario-login
        let userTmp = {};
        userTmp = {name:putCliente.name}
        userTmp = {...userTmp, lastname:putCliente.lastname}
        userTmp = {...userTmp, email:putCliente.email}
        userTmp = {...userTmp, idcliente:putCliente._id}
 
        const updUser = new User(userTmp)
        const updatedUser = await User.updateOne({idcliente:id}, userTmp)

        return res.status(200).json(updatedCliente)   
    } catch (error) { 
        return res.status(500).json(error)
    }
}

const deleteCliente = async(req, res) => {
    try {
        const {id} = req.params
        const deletedCliente = await Clientes.findByIdAndDelete(id);

        if(!deletedCliente) {
            return res.status(404).json({message: "El Id informado no esta asociado a ningun cliente"})
        }
          
        return res.status(200).json(deletedCliente)
    } catch (error) { 
        return res.status(500).json(error)
    }
}



module.exports = {getClientesPaginado, getCliente, getClientebyId, postCliente, putCliente, deleteCliente }