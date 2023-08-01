const mongoose = require('mongoose');
const user = require('../api/models/user.models');
const dotenv = require("dotenv").config();

mongoose.connect(process.env.DB_URL)

.then(async () => {
    const allUser = await user.find();
    if (allUser.length > 0){
       await user.collection.drop();
       console.log('Tabla de usuarios borrada')
    }   
} )
.catch ( (error) => console.log("error borrando tabla de usuarios. ", error))
.finally ( () => mongoose.disconnect())
