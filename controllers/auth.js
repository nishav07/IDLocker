const { json } = require('express');
const User = require("../models/user.js");
const docs = require("../models/document.js");

function auth (req,res){
    res.render("auth.ejs")
}

function signup (req,res){
    const {userName,password,email} = req.body;
    console.log("signup wala data:",{
        userName,
        password,
        email
    })
    res.send('ok hai boss')
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