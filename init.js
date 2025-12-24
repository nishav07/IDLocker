const mongoose = require('mongoose');
const User = require("./models/user");

const db = require("./config/db");


const user = [
   {
    userName:"Nishav",
    password:"1234567",
    email:"nishavvvv7@gmail.com"
   },{
    userName:"Rishav",
    password:"Rishav2015$",
    email:"rishavvvv7@gmail.com"
   },{
    userName:"daksh",
    password:"qwerty123",
    email:"ddkkksshh7@gmail.com"
   },{
    userName:"raman",
    password:"poiuyt124",
    email:"rrrman7@gmail.com"
   },
]

User.insertMany(user);