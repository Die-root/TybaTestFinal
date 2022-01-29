// Script de autenticacion usando passport

const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

// Modelo del usuario

const User = require('../models/user');

// Autenticacion //

// Serializacion y deserializacion
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    const user = await User.findById(id);
    done(null,user);
})

// Autenticacion sing up

passport.use('local-singup',new LocalStrategy({
    usernameField:'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,email,password, done ) => {
    
    // Verifica si el usuario existe 
    
    const userfound=await User.findOne({'email': email});
    
    if(userfound)
    {
       // Retorna mensaje de error si el usuario ya esta en uso
      return done (null,false,req.flash('ErrorSingup','Email ya usado'));
    }

    else
    {
        // Crea el nuevo usuario y lo guarda en la base de datos

        const newUser= new User();
        newUser.email= email;
        newUser.password= newUser.encryptPassword(password);
        await newUser.save();
        done(null,newUser);

    }
    
}));



passport.use('local-login',new LocalStrategy({
    usernameField:'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,email,password, done ) => {

    // Verifica si el usuario existe 
    const userfound=await User.findOne({'email': email});

    if(!userfound)
    {
       // Retorna un mensaje de error si el usuario no existe  
       return done (null,false,req.flash('ErrorSingin','Usuario no existente'));
    }


    if(!userfound.comparePassword(password))
    {
        // Retorna un mensaje de error si la contraseña no es correcta
        return done (null,false,req.flash('ErrorSingin','contraseña incorrecta'));
    }

    // Retorna el usuario encontrado

    done(null,userfound)
    
}));

