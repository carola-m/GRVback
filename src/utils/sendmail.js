const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const enviarMail = (mail, password) =>{

    // console.log(process.env.MAILUSER, ' ', process.env.MAILPSSWD)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPSSWD
        }
    }); 

    let dircorreo2 = 'juan.lucas@bootcamp-upgrade.com'
    let mailOptions={
        from:"Administrador",
        to:dircorreo2,  // en despliegue quitar el 2 - usar dircorreo.
        subject:"Acceso al portal del taller GRV",
        html:`<p>Se le ha creado un usuario, para poder acceder a los datos recogidos en el taller GRV asociados a las actuaciones que se  han realizado, con referencia al coche revisado en nuestro taller.</p> 
        <p>Los datos de acceso son</p>
        <p>usuario/email: ${mail}</p>
        <p>password: ${password}</p>
        <p>En el primer acceso a la aplicacion del colegio se requerira cambiar la contraseña</p>
        `
    };
    transporter.sendMail(mailOptions,(error, info)=>{
        if (error){
            console.log(error);
        }
        else{
            console.log('el correo se envio correctamente'+info.response); 
        }
    });
};

module.exports = { enviarMail }