const {validateEmail, validatePassword, usedEmail} = require("../../utils/validators")

const randomstring = require("randomstring");
const { enviarMail } = require('../../utils/sendmail');

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

const checkSession = (req, res) => {
    try {
       return res.status(201).json("Dentro de checkSession")
        // return res.status(201).json(req.user)
    } catch (error) {
       return res.status(500).json(error)
    }
}

// cambio de contraseña
const changepw = async (req, res) => {
    try {
        // Recupero los datos de la peticion
        const {id} = req.params;
        const putPassword = new User(req.body)
        putPassword._id=id;

        //Encriptar password
        putPassword.password = bcrypt.hashSync(putPassword.password, 10)        

        // busco el usuario asociado al id.
        const userChange = await User.findById(id);
        if(!userChange){
           return res.status(404).json({message: 'El id no pertenece a ningun usuario registrado'}); 
        }

        // añado el role y el idcliente que tuviera, por que se inicializan.
        putPassword.role = userChange.role
        putPassword.idcliente = userChange.idcliente
        
        //actualizo la informacion
        const updatedPwd = await User.findByIdAndUpdate(id, putPassword);

        // compruebo los resultados.
        if (!updatedPwd){
            return res.status(404).json({message: "Usuario no encontrado. No se puede resetear password"})
        }

        return res.status(200).json({message: "Password actualizada correctamente"})   

    } catch (error) { 
        return res.status(500).json(error)
    }
}

// reseteo de password
const resetpw = async (req, res) => {
    try {
        const {email} = req.params;

        const getUser = await User.find({email:email});

        if (!getUser)
            return res.status(404).json({message: "El email informado no esta asociado a ningun cliente."})

        //Inicializo la password,
        let newPassword = randomstring.generate(8);
        //Encriptar password
        let newPasswordEnc = bcrypt.hashSync(newPassword, 10)     

        let userTmp = {};
        userTmp = {password:newPasswordEnc}
        userTmp = {...userTmp, updatedPW:true}
        userTmp = {...userTmp, idcliente:getUser._id}

        const newUser = new User(userTmp)
        const updateUser = await newUser.findByIdAndUpdate(id, userTmp)

        enviarMail(email, newPassword);
           
        return res.status(200).json({message: "Creada Password temporal. Enviado correo."});
    } catch (error) { 
        return res.status(500).json(error)
    }

}

module.exports = {login, register, checkSession, changepw, resetpw}