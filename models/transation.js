
// Script con el modelo de las transacciones 

const mongoose = require('mongoose');
const {Schema}= mongoose;

// Modelo transaccion 

const userSchema = new Schema ({
    valor: String,
    descripcion: String,
    userId:String

    
});



module.exports= mongoose.model('transations',userSchema);