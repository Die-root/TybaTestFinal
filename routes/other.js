// Script con rutas adicionales

const express = require('express');
const router = express.Router();

// Ruta Pagina principal


router.get('/', (req,res,next)=>{

    res.render('index');

});

// Ruta perfil

router.get('/profile',autenticacion, (req, res, next) => {
    res.render('profile');
  });



  // Funciones auxiliares

  // Verifica si no se ha autenticado ningun usuario

  // "noAutenticacion "Se utiliza para dar o no acceso a las rutas de login o singup
  
  function autenticacion(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/');
  };

  
module.exports=router;