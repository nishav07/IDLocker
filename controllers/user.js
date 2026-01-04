const { json } = require('express');
const User = require("../models/user.js");
const docs = require("../models/document.js")
const upload = require("../config/multer.js");
const cloudinary = require("../config/cloudinary.js");
const fs = require("fs");

function index (req,res){
    res.render("index.ejs")
}

function dashboard(req,res){
    res.render("dashboard.ejs");
}

async function components(req,res){
    const page = req.params.page;
    const userID = req.session.user.id;
    const doc = await docs.find({userID:userID});
    console.log(doc);
    res.render(`components/${page}`,{data:doc})
}

async function create(req,res){

    const {name,docsID} = req.body;
    const userID = req.session.user.id;
    console.log("docs ka data", {
        name,
        docsID,
        userID
    })

     try {
      // cloudinary upload
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "IDLocker"
      });

      // save in mongo
      const doc = await docs.create({
        userID: userID,   // assume user logged in
        docsID: docsID,
        name: name,
        imgPath:result.secure_url,
        publicId: result.public_id

      });

       fs.unlinkSync(req.file.path);

       req.flash("success",`${name} Uploded`)
      res.redirect("/dashboard")

    } catch (err) {
      req.flash("error",`${name} not Uploded`)
      console.log(err);
      res.redirect("/")
    }

    // res.send("okay hai jeeeeee")

   
}

module.exports = {
    index,
    dashboard,
    components,
    create
}