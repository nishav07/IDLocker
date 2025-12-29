const { json } = require('express');
const User = require("../models/user.js");
const docs = require("../models/document.js")

function index (req,res){
    res.render("index.ejs")
}

function auth (req,res){
    res.render("auth.ejs")
}

function signup (req,res){
    const {userName,password,email} = req.body;
    console.log({
        userName,
        password,
        email
    })
    res.send('ok hai boss')
}
module.exports = {
    index,
    auth,
    signup
}