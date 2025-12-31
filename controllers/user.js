const { json } = require('express');
const User = require("../models/user.js");
const docs = require("../models/document.js")

function index (req,res){
    res.render("index.ejs")
}

function dashboard(req,res){
    res.render("dashboard.ejs")
}

module.exports = {
    index,
    dashboard
}