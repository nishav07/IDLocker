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
    const hashPass = await middleware.hashing(password);
    
    const user = new User({ userName:userName,password:hashPass,email:email});
    await user.save();
    res.send('sinuppp ho gyaa sir');
   } catch (error) {
    console.log(error);
   }
}

async function login (req,res){
    const {email,password} = req.body;
    console.log("login wala data:",{
        email,
        password
    })

     const users = await User.find({email:email});

     if(users.length == 0){
        return res.send("user not found")
     }

   
    console.log("login wala data",users);
    const hashPass = users[0].password;
    const isTrue = await middleware.verify(password,hashPass);

    console.log(`data of pass`,hashPass,isTrue,)

    if(users[0] && isTrue){
        return res.send("logged innnnnnn")
    } else {
        return res.send("password wrong h")
    }

    
}

module.exports = {
    auth,
    signup,
    login
}