const mongoose = require('mongoose');

const docsSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:[true,"userID required"]
    },
    docsID:{
        type:String,
        required:[true,"document ID is required"]
    },
    name:{
        type:String,
        required:true
    },
    imgPath:{
        type:String,
        required:[true,"email id is reuqired"]
    }
})

const Docs = mongoose.model("Doc",chatSchema);

module.exports = Docs;