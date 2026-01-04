const { json } = require('express');
const User = require("../models/user.js");
const docs = require("../models/document.js")
const upload = require("../config/multer.js");
const cloudinary = require("../config/cloudinary.js");

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

async function create(req,res){

    const {name,docsID,document} = req.body;
    const userID = req.session.user.id;
    console.log("docs ka data", {
        name,
        docsID,
        document,
        userID
    })

     try {
      // cloudinary upload
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "IDLocker"
      });

      // save in mongo
      const doc = await docs.create({
        userId: userID,   // assume user logged in
        docsID: docsID,
        name: name,
        imgPath:document
      });

      res.json({
        success: true,
        message: "okayyy hai jeee",
        doc
      });

    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }

   
}

module.exports = {
    index,
    dashboard,
    components,
    create
}