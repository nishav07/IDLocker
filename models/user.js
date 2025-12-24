const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"username required"]
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,"email id is reuqired"]
    }
})

const User = mongoose.model("User",userSchema);

module.exports = User;