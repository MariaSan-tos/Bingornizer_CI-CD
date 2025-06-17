const express = require("express")
const path = require("path")
const { urlencoded, json } = require("express");
const { userController, eventController, bingoCardController } = require("./controllers/index.js");
const { user, event } = require('./models');
const { where } = require("sequelize");
const { stringify } = require("querystring");
const session = require('express-session');
const methodOverride = require('method-override');

const app = express();
const timeSession = 1000*60*10

app.use(session({
    secret: 'sua-chave-secreta',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge:  timeSession
    }
}));

app.use(urlencoded({ extended: true }));

app.use(json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '/public')));

app.use(methodOverride('_method'));

app.listen(3000, () => {
    console.log("estou na porta 3000")
});

function secure_pass(req, res, next){
    if(req.session.user){
        next()
    } else{
        res.redirect('/user/login');
    }
}

app.get('/', (req, res) => {
    res.render('homePage');
});

app.use('/user', userController);

app.use(secure_pass);

app.use('/event', eventController);
app.use('/bingoCard', bingoCardController);