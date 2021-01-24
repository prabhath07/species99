const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model("user");
const jwt = require('jsonwebtoken');
const {jwts}= require('../config/keys');
const requirelogin = require('../middleware/requirelogin');

router.get('/protected',requirelogin,(req,res)=>{
    res.send('hello user');
});

router.post('/signup',(req,res)=>{
    const {name,email,password,profile}= req.body;
    if(!email || !password || !name ){
      return  res.status(422).json({error:"please fill in  all fields"});
    }
  User.findOne({email:email})
  .then((saveduser)=>{
      if(saveduser){
      return  res.status(422).json({error:"allready exists"});
          
      }
bcrypt.hash(password,12)
.then(hashedpassword=>{
  //  console.log('coming here');
    const user = new User({
        name,
        email,
        password,
        profile:profile
      //  followers:[],
       // following:[]
    })
    user.password = hashedpassword;
user.save()
.then(user=>{
  res.json({message:'saved succesfully'})
})
})
.catch(err=>{
    console.log(err );
})
}

).catch(err=>{
    console.log(err );
})
     

})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
      return  res.status(422).json({error:'fill properly'});
    }
    User.findOne({email})
    .then(saveduser=>{
        if(!saveduser){
       return res.status(422).json({error:'invalid1 '});
        }
      //  console.log(password + saveduser.password);
    bcrypt.compare(password,saveduser.password)
     .then(doMatch =>{
        // if(password===saveduser.password){
        const token = jwt.sign({_id:saveduser._id},jwts);
        const {id,name,email}=saveduser;
        res.json({token,user:id,name,email});
            // res.json({message:'done!!!!'});
         })
        .catch(err=>{
            return res.status(422).json({message:'invalid2'})
        }
     )
     .catch(err=>{
         console.log(err);
     })
    })
})

    

module.exports = router; 

