// Script con el modelo de los usuarios 

const mongoose = require('mongoose');
const {Schema}= mongoose;

// Modulo para encriptar informacion 

const bcrypt= require('bcrypt-nodejs');   

// Modelo usuario
const userSchema = new Schema ({
    email: String,
    password: String,
    
});

// Encriptacion de la contraseña
userSchema.methods.encryptPassword = (password) => 
{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Comparacion de  la contraseña

userSchema.methods.comparePassword= function (password) 
{
    return bcrypt.compareSync(password, this.password);
};

module.exports= mongoose.model('users',userSchema);
