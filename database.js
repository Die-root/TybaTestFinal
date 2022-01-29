// Script con la informacion de la base de datos
const mongoose = require('mongoose');

require('dotenv').config();

// Variables de entorno usando .env 
// Se mantendra el archivo .env en el repositorio , en un despliegue si se ignoraria 
const usuario = process.env.USER
const password = process.env.PASSWORD
const dbName = process.env.DBNAME

const uri = `mongodb+srv://${usuario}:${password}@cluster0.tkjoa.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión \n', e))