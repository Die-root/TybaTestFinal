// Script con rutas adicionales

const express = require('express');
const passport =require('passport');
const router = express.Router();

const Transation = require('../models/transation');

// Ruta mapa


router.get('/map', autenticacion,(req,res,next)=>{

  res.render('maps');

});

// Ruta nueva transaccion 

router.get('/newTransation',autenticacion,async (req, res) => {
  res.render('newTransation');
})



router.post('/newTransation', async (req, res) => {
    const body = req.body;
    const userId= req.user.id;
    console.log(body)
  

    try {
       
      
        const newTran= new Transation();
        newTran.valor= body.valor;
        newTran.descripcion= body.descripcion;
        newTran.userId= userId;
        await newTran.save()
       
        res.redirect('/');
    } catch (error) {
        console.log('error', error);
    }
});
  
// Funciones auxiliares

  // Verifica si no se ha autenticado ningun usuario

  // "autenticacion "Se utiliza para dar o no acceso a las rutas de login o singup
  
  function autenticacion(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/');
  };

  
  

module.exports=router;