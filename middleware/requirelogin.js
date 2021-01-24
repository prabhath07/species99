const jwt = require('jsonwebtoken');
//const {jwts}= require('../keys');
const mongoose = require('mongoose');
const user = mongoose.model("user");
const {jwts} =require('../config/keys');
//const jwts ="mysecrettoken";

module.exports = (req,res,next)=>{
    const {authorization}= req.headers
   if(!authorization)
   {
       return res.status(401).json({error:'you must be logged in '})
   }

  const token = authorization.replace("Bearer ","") ; 
 
 // const token = authorization;
 // console.log(token);
  jwt.verify(token,jwts,(err,payload)=>{
      if(err){
         // console.log(err);
          return res.status(401).json({error:err});
              }
      const {_id}=payload
      user.findById(_id).then(userdata=>{
          req.user = userdata
        //  console.log('coming here');
          next()
      })
      .catch(err=>{
          console.log(err);
      })
  })
}
