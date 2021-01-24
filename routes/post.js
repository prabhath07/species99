const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model("post");
const requirelogin = require('../middleware/requirelogin');
const user = mongoose.model("user");


router.get('/allpost',requirelogin,(req,res)=>{
 // console.log("coming here allpost");
  Post.find().populate("postedBy","_id name")
  .then(posts=>{
   // console.log(posts);
    res.json({posts})
  })
  .catch(err=>{
    console.log(err);
  })
})

router.post('/createpost',requirelogin,(req,res)=>{
 // console.log("coming here");
  const {title,body,pic}= req.body;
  if(!title||!body){
     return res.status(422).json({msg : 'plz add all fields'});
  }
  console.log(req.user);
 const post = new Post({
   title, body,photo:pic, postedBy:req.user
 })
 post.save().then(reult=>{
   res.json({post});
 }).catch(err=>{
   console.log(err);
 })
})


router.post('/profilepic',requirelogin,(req,res)=>{
  // console.log("coming here");
   const {pic}= req.body;
   if(!pic){
      return res.status(422).json({msg : 'plz add all fields'});
   }
  user.findByIdAndUpdate(req.user._id,{
      $pop:{
        profile:1 
              },
      $push:{
        profile:req.body.url
      }
    },{new:true}).select("-password -email").then(result=>{
      res.json(result)
    }).catch(err=>{
      return res.status(422).json({error:err})
    })
 })



 router.put('/updateprofile',requirelogin,(req,res)=>{
  
   const {name,profile}= req.body;



   if(!profile && !name){
   
     console.log(profile);
     user.findOne({_id:req.user._id})
     .then(user=>{
       res.json(user);
     } )
   
   }
else if(!profile && name){
 // console.log("2");
  user.findByIdAndUpdate(req.user._id,{ 
    $set:{ name:req.body.name}
},
).select("-password -email").then(result=>{
res.json(result)
}).catch(err=>{
return res.status(422).json({error:err})
})

}
else if(profile && !name){
 // console.log("3");
user.findByIdAndUpdate(req.user._id,{ 
         $set:{profile:req.body.profile}
    },
 ).select("-password -email").then(result=>{
    res.json(result)
  }).catch(err=>{
    return res.status(422).json({error:err})
  })

}

else if(profile && name){
 // console.log("4");

  user.findByIdAndUpdate(req.user._id,{ 
    $set:{profile:req.body.profile,
    name:req.body.name}
},
).select("-password -email").then(result=>{
res.json(result)
}).catch(err=>{
return res.status(422).json({error:err})
})

}

else{
  return res.status(422).json({msg : 'error'});
}



   })



  
router.get('/mypost',requirelogin,(req,res)=>{
Post.find({postedBy:req.user._id})
.populate("postedBy","_id name")
.then(mypost=>{
  user.findOne({_id:mypost[0]._id})
  .select("-password")
  .then(usera =>{
    res.json({mypost,usera})
  })

}).catch(err=>{
  console.log(err);
})
})





router.put('/like',requirelogin,(req,res)=>{
  Post.findByIdAndUpdate(req.body.postId,{
    $push:{likes:req.user._id}
  },{
  new:true}).exec((err,result)=>{
    if(err){
    return res.status(422).json({error:err})}
    else
    return res.json({result})
  })
}) 
router.put('/unlike',requirelogin,(req,res)=>{
  Post.findByIdAndUpdate(req.body.postId,{
    $pull:{likes:req.user._id}
  },{
  new:true}).exec((err,result)=>{
    if(err){
    return res.status(422).json({error:err})}
    else
    return res.json({result})
  })
})  

router.delete('/delete/:postId',requirelogin,(req,res)=>{
  Post.findOne({_id:req.params.postId})
  .populate("postedBy","_id")
  .exec((err,post)=>{
    if(err || !post){
      return res.status(422).json({error:err})
    }
    if(post.postedBy._id.toString()=== req.user._id.toString()){
      post.remove()
      .then(result=>res.json(result))
      .catch(err=>console.log(err))

    }
  })
})
router.get('/userdetails',requirelogin,(req,res)=>{
      user.findOne({_id:req.user._id})
     .select("-password")// to not send password to the front end
      .then(usera =>{
        // console.log(usera)
         
              res.json({usera})
          })
     
      .catch(err=>{
          return res.status(404).json({error:"user not found here"})
      })


})


router.get('/profiletest',requirelogin,(req,res)=>{
  // console.log(req.params.userid)
      user.findOne({_id:req.user.userid})
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


module.exports = router;