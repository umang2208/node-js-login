const express = require('express');
const path = require('path');
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const router = require('./router');

const app = express();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

// load static css
app.use('/static', express.static(path.join(__dirname, 'public')))


app.use(session({
    secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true
}));

app.use('/route', router);

// home route
app.get('/', (req, res) =>{
    // res.render('base', { title : "Login System"});
    res.render('signUpoption', { title : "Login System"});
})

app.listen(4200, ()=>{ console.log("Lostening to the server on http://localhost:4200")});