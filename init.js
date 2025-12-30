const mongoose = require('mongoose');
const User = require("./models/user");

const db = require("./config/db");


const user = [
   {
    userName:"Nishavvv",
    password:"1234567",
    email:"nishavvvvv7@gmail.com"
   },{
    userName:"Rishav",
    password:"Rishav2015$",
    email:"rishavvvv7@gmail.com"
   }
]

async function userr() {
   await User.insertMany(user)
}

userr();