const { json } = require('express');
const User = require("../models/user.js");
const docs = require("../models/document.js")
const upload = require("../config/multer.js");
const cloudinary = require("../config/cloudinary.js");
const fs = require("fs");
const Docs = require('../models/document.js');

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
    // console.log("user ka dataaaaaaaaaaaa",user)
    const doc = await docs.find({userID:userID});
    // console.log(doc);
    res.render(`components/${page}`,{
      data:doc,
      user:user
    })
}

async function create(req,res){

    const {name,docsID} = req.body;
    const userID = req.session.user.id;
    // console.log("docs ka data", {
    //     name,
    //     docsID,
    //     userID
    // })

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
      res.redirect("/dashboard")
    }

    // res.send("okay hai jeeeeee")

   
}

async function drop(req,res){
try {

    const {postID} = req.body;


 const doc = await Docs.findById(postID);

 const publicId = doc.publicId;

 console.log("wtffffff",postID,publicId);

if (!doc) {
  return res.sendStatus(403);
}


  await cloudinary.uploader.destroy(publicId);
  await Docs.findByIdAndDelete(postID);

  console.log("yaha tak kak pipeline clearrr")
  res.sendStatus(200)
} catch (error) {
  res.sendStatus(400)
}


}

async function edit(req,res){
try {
  const {newEmail} = req.body;
  const userID = req.session.user.id;
  console.log("new email",newEmail,userID);
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
  const {docsName,docsId} = req.body;
  console.log("edit waal data",{
    docsName,docsId
  })

  res.sendStatus(200);
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