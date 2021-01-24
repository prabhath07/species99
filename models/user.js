const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema.Types


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    followers:[{
        type:ObjectId,ref:"user",
       // required:true
        

    }],
    following:[{
        type:ObjectId,ref:"user",
      //  required:true
    }]
    ,
    profile:{
        type:String,
        required:true,
        default:"https://res.cloudinary.com/prabhath/image/upload/v1609695667/nwstkuvdndyss3tmsrgf.jpg"
    }
})


mongoose.model("user",userSchema)