// Script con las rutas relacionadas a inicio de sesion 

const express = require('express');
const passport =require('passport');
const router = express.Router();

// Ruta login

router.get('/login',noAutenticacion, (req,res,next)=>{
    res.render('login');
    

});

// Autentica mediante local-auth usando passport
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    passReqToCallback:true,
  })); 


// Ruta singup

router.get('/singup', noAutenticacion ,(req,res,next)=>{
 
    res.render('singup');
    
});

// Autentica mediante local-auth usando passport

router.post('/singup', passport.authenticate('local-singup', {
    successRedirect: '/profile',
    failureRedirect: '/singUp',
    passReqToCallback:true,
 
  })); 


// Ruta logout  
 
  
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
  });



// Funciones auxiliares

  // Verifica si no se ha autenticado ningun usuario

  // "noAutenticacion "Se utiliza para dar o no acceso a las rutas de login o singup

function noAutenticacion(req, res, next) {
    if(!req.isAuthenticated()) {
      // Siguiente Pagina
      return next();
    }
    // Redirecciona al inicio
    res.redirect('/');
  };


module.exports=router;

