import React from 'react';
import {useState,useEffect} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';


 const Profile = () => {
     const [posts,setposts]=useState([]);
     const [userdetails,setuser]= useState({});
     const [name,setname]=useState("");
     const [followers,setfollowers]= useState([]);
     const [following,setfollowing]= useState([]);
     const [profile,setprofile]=useState("");

     



     useEffect(()=>{
         fetch('/userdetails',{
             headers:{
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             }})
             .then(res=>res.json())
             .then(data=>{
                // console.log(data);
                 setuser(data.usera);
                 setfollowers(data.usera.followers);
                 setfollowing(data.usera.following);
                 setname(data.usera.name);
                 setprofile(data.usera.profile);
                 

             })
         

 fetch('/mypost',{
     headers:{
         "Authorization":"Bearer "+localStorage.getItem("jwt")

     }
 }).then(res=>res.json())
 .then(result =>{
   //  console.log(result);
     setposts(result.mypost)
 })
 .catch(err=>{console.log(err)})
     },[])



    return (
    
        <div style={{maxWidth:"70vw",margin:"0px auto"}} > 
        <div 
        style={{display:'flex',justifyContent:'space-around',margin:'18px 0px',borderBottom:'2px solid grey',}}> 
        <div>                   
      
      <img style={{width:'160px',height:'160px',borderRadius:'80px'}} src ={profile}/>
        </div>
        <div>
        <h4 className='fontstyle'>{name}</h4>
        <div style={{display:'flex',justifyContent:'space-between',width:'110%'}}> <h6>{followers.length} followers</h6> 
        <h6>{following.length} following</h6> 
        <h6>{posts.length} posts</h6> </div>
        
      <Link to="/updateprofile"> <button className="btn ma3 waves-effect waves-light font"
        >Updateprofile</button></Link>
       
        </div></div>
       
        
              
        <div className="gallery">
            {posts.map(item=>{
                return(
                    <img className="img" src ={item.photo}/>
                )

            })}
        </div>  
        </div>
    )
}
export default Profile;