const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model("post");
const requirelogin = require('../middleware/requirelogin');
const user = mongoose.model("user");
router.get('/profile/:userid',requirelogin,(req,res)=>{
   // console.log(req.params.userid)
       user.findOne({_id:req.params.userid})
      .select("-password")// to not send password to the front end
       .then(usera =>{
         // console.log(usera)
           Post.find({postedBy:usera._id})
           .populate("postedBy","_id name")
           .exec((err,post)=>{
               if(err||!post){
                   return res.status(422).json({error:err})
               
               }
             //  console.log(usera,post);
               res.json({usera,post})
           })

       })
       .catch(err=>{
           return res.status(404).json({error:"user not found here"})
       })


})

router.put('/follow',requirelogin,(req,res)=>{
  user.findByIdAndUpdate(req.body.followid,{
    $push:{followers:req.user._id}
  },{new:true},(err,result)=>{
    if(err){
      return res.status(422).json({error:err})
    }
    user.findByIdAndUpdate(req.user._id,{
      $push:{
        following:req.body.followid
      }
    },{new:true}).select("-password -email").then(result=>{
      res.json(result)
    }).catch(err=>{
      return res.status(422).json({error:err})
    })
  }
    )
})


router.put('/unfollow',requirelogin,(req,res)=>{
  user.findByIdAndUpdate(req.body.unfollowid,{
    $pull:{followers:req.user._id}
  },{new:true},(err,result)=>{
    if(err){
      return res.status(422).json({error:err})
    }
    user.findByIdAndUpdate(req.user._id,{
      $pull:{
        following:req.body.unfollowid
      }
    },{new:true}).select("-password -email").then(result=>{
      res.json(result)
    }).catch(err=>{
      return res.status(422).json({error:err})
    })
  }
    )

})


module.exports = router; 
