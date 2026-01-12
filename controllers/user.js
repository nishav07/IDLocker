const { json } = require('express');
const User = require("../models/user.js");
const docs = require("../models/document.js")
const upload = require("../config/multer.js");
const cloudinary = require("../config/cloudinary.js");
const fs = require("fs");
const Docs = require('../models/document.js');

const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "IDLocker" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
};



function index (req,res){
    res.render("index.ejs")
}

function dashboard(req,res){
    res.render("dashboard.ejs");
}

async function components(req,res){
    const page = req.params.page;
    const userID = req.session.user.id;
    const user = await User.findById(userID)
  
    const doc = await docs.find({userID:userID});
  
    res.render(`components/${page}`,{
      data:doc,
      user:user
    })
}

async function create(req,res){

    const {name,docsID} = req.body;
    const userID = req.session.user.id;
 

     try {
    
     const result = await streamUpload(req.file.buffer);


    
      const doc = await docs.create({
        userID: userID,   
        docsID: docsID,
        name: name,
        imgPath:result.secure_url,
        publicId: result.public_id

      });


       req.flash("success",`${name} Uploded`)
      res.redirect("/dashboard")

    } catch (err) {
      req.flash("error",`${name} not Uploded`)
      console.log(err);
      res.redirect("/dashboard")
    }

   
}

async function drop(req,res){
try {

    const {postID} = req.body;


 const doc = await Docs.findById(postID);

 const publicId = doc.publicId;

if (!doc) {
  return res.sendStatus(403);
}


  await cloudinary.uploader.destroy(publicId);
  await Docs.findByIdAndDelete(postID);

  console.log("yaha tak ka pipeline clearrr")
  res.sendStatus(200)
} catch (error) {
  res.sendStatus(400)
}


}

async function edit(req,res){
try {
  const {newEmail} = req.body;
  const userID = req.session.user.id;
  await User.findByIdAndUpdate(userID,{email:newEmail});
  req.flash("success",`email has changed successfully`);
  res.redirect("/dashboard");
} catch (error) {
  req.flash("error",`email not changed`);
  console.log(err);
  res.redirect("/dashboard");
}
}

async function docEdit(req,res){
  try {
    const {docsName,docsId,id} = req.body;

    const doc = await Docs.findByIdAndUpdate(id,{docsID:docsId,name:docsName})
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

module.exports = {
    index,
    dashboard,
    components,
    create,
    drop,
    edit,
    docEdit
}