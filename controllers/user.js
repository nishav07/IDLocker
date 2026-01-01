const { json } = require('express');
const User = require("../models/user.js");
const docs = require("../models/document.js")

function index (req,res){
    res.render("index.ejs")
}

function dashboard(req,res){
    res.render("dashboard.ejs")
}

function components(req,res){
    const page = req.params.page;
    res.render(`components/${page}`)
}

module.exports = {
    index,
    dashboard,
    components
}