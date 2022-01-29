const express = require('express');
const engine = require('ejs-mate');
const morgan =require('morgan');
const passport =require('passport');
const session   = require('express-session');
const flash = require('connect-flash');

// Inicializaciones
const app = express();
require('./database');
require('./map');
require('./passport/local-auth');

// Configuracion 

app.set('views',__dirname +  '/views');

app.engine('ejs',engine);
app.set('view engine','ejs')
app.set('port', process.env.PORT || 3000);

//middlewares


app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname));

app.use(session({
    secret:'palabraClave',
    resave: false,
    saveUninitialized:false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


app.use((req,res,next)=>{
    app.locals.errorSingup= req.flash('ErrorSingup');
    app.locals.errorSingin= req.flash('ErrorSingin');
    app.locals.user=req.user; 
    next();
})


// Rutas


app.use('/', require('./routes/session'));
app.use('/', require('./routes/other'));
app.use('/', require('./routes/funcionalidades'));


// Inicio del servidor

app.listen(app.get('port'), () => {
    console.log('Servidor iniciado puerto ', app.get('port'));
  });
  