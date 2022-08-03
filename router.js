var express = require("express");
var router = express.Router();

var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

const  credential = {
    email : "admin@gmail.com",
    password : "admin123"
}

// login user
router.post('/login', (req, res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        console.log(req.body.email);
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        //res.end("Login Successful...!");
    }else{
        res.end("Invalid Username")
    }
});

// route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

router.get('/base', (req, res) => {
 
        res.render('base', {user : req.session.user})
    
})
router.get('/signUp',(req,res)=>{
    res.render('signUp',{user:req.session.user});
    
})
router.get('/home',(req,res)=>{
    res.render('home',{user:req.session.user});
    
})
router.post('/signin', (req, res)=>{
        if(!localStorage.getItem(req.body.email)){
            localStorage.setItem(req.body.email , req.body.email);
            console.log(req.body.email , "inside signin");
            
            req.session.user = req.body.email;
            res.redirect('/route/home');
        }
        else {
            res.send("check your email id it is already registerd or invalid");
        }
        //res.end("Login Successful...!");
    
});


// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', { title: "Express", logout : "logout Successfully...!"})
        }
    })
})

module.exports = router;