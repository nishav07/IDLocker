const { json } = require('express');
const middleware = require("../middlewares/auth.js");
const User = require("../models/user.js");
const docs = require("../models/document.js");

function auth (req,res){
    res.render("auth.ejs")
}

async function signup (req,res){
   try {
     const {userName,password,email} = req.body;
    console.log("signup wala data:",{
        userName,
        password,
        email
    })
    const hashPass = await middlewares.hashing(password);
    
    const user = new User({ userName:userName,password:hashPass,email:email});
    await user.save();
    res.send('ok hai boss')
   } catch (error) {
    console.log(error);
   }
}

function login (req,res){
    const {userName,password} = req.body;
    console.log("login wala data:",{
        userName,
        password
    })

    res.send("okayyyyy hai bossssssssssss")
}

module.exports = {
    auth,
    signup,
    login
}