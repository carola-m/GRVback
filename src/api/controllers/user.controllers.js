const {validateEmail, validatePassword, usedEmail} = require("../../utils/validators")

const User = require ("../models/user.models")

const bcrypt = require("bcrypt")
const {generateSign, verifySign} = require("../../utils/jwt")

const login = async (req, res) => {
    try {
        const userInfo = await User.findOne({email:req.body.email})

        if(!userInfo){
            return res.status(404).json({message: "Email not registered"});
        }
        
        if(!bcrypt.compareSync(req.body.password, userInfo.password)){
            return res.status(404).json({message: "Password is incorrect"});
        }

        //generamos el token.
        const token = generateSign(userInfo._id, userInfo.email)

        //login correcto, enviamos los datos al front.
        return res.status(200).json({user:userInfo, token:token})

    } catch (error) {
       return res.status(500).json(error) 
    }
}

const register = async (req, res) => {
    try {
        const newUser = new User (req.body); 
        // console.log(newUser);
        //Validar email 
        if(!validateEmail(newUser.email)){
            return res.status(400).json({message: "Invalid email"})
        }

        //Validar password
        if(!validatePassword(newUser.password)){
           return res.status(400).json({message: "Invalid password"})
        }
        //Validar usedemail
        if (await usedEmail(newUser.email)){
            return res.status(400).json({message: "Already register"})
        }

        //Encriptar password
        newUser.password = bcrypt.hashSync(newUser.password, 10)        

        //Salvar el registro en BBDD
        const createdUser = await newUser.save();

        // Ha ido todo OK, devolvemos 201
        return res.status(201).json(createdUser)

    } catch (error) {
       return res.status(500).json(error) 
    }
}

const regcliente = async (req, res) => {
    try {
        const newUser = new User (req.body); 
        // console.log(newUser);
        //Validar email 
        if(!validateEmail(newUser.email)){
            return res.status(400).json({message: "Invalid email"})
        }

        //Validar password
        if(!validatePassword(newUser.password)){
           return res.status(400).json({message: "Invalid password"})
        }

        //Validar mail ya usado
        if (await usedEmail(newUser.email)){
            return res.status(400).json({message: "Already register"})
        }

        //Encriptar password
        newUser.password = bcrypt.hashSync(newUser.password, 10)        

        //Salvar el registro en BBDD
        const createdUser = await newUser.save();

        // Ha ido todo OK, devolvemos 201
        return res.status(201).json(createdUser)

    } catch (error) {
       return res.status(500).json(error) 
    }
}

const checkSession = (req, res) => {
    try {
        return res.status(201).json(req.user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const prueba = (req, res) => {
    return res.status(200).json("Estoy en la ruta de prueba");
}

// cambio de contraseña
const changepw = async (req, res) => {
    try {
        const {id} = req.params;
        const putPassword = new User(req.body)
        putPassword._id=id;
        
        const updatedPwd = await User.findByIdAndUpdate(id, putPassword);

        if (!updatedPwd){
            return res.status(404).json({message: "Usuario no encontrado. No se puede resetear password"})
        }

        return res.status(200).json({message: "Password actualizada correctamente"})   

    } catch (error) { 
        return res.status(500).json(error)
    }
}

// reseteo de password
const resetpw = (req, res) => {
    return res.status(200).json("Creada Password temporal. Enviado correo.");
}

module.exports = {login, register, regcliente, checkSession, prueba, changepw, resetpw}