import React from 'react';
import {useState,useEffect,useContext} from 'react';
import {useParams} from 'react-router-dom';
import {UserContext} from '../../App'
// import {link} from 'react-router-dom';



 const Userprofile = () => {
     const [posts,setposts]=useState([]);
  //   const {state,dispatch} = useContext(UserContext)
     const[followers,setfollowers]=useState([]);
     const[following,setfollowing]=useState([]);
     const [userdetails,setuser]=useState({});

     const {userid} = useParams()

   //  console.log(userid);
    useEffect(()=>{
 fetch(`/profile/${userid}`,{
     method:'get',
     headers:
     {
         "Authorization":"Bearer "+localStorage.getItem("jwt")
     }
 }).then(res=>res.json())
 .then(result =>{
    // console.log(result);
   setuser(result.usera)  
  
 //  console.log(userdetails)
     setposts(result.post);
      setfollowers(result.usera.followers)
      setfollowing(result.usera.following)
   //  console.log(pos);

 })
 .catch(err=>{console.log(err)})
     },[])

     const followuser=()=>{
         fetch('/follow',{
             method:"put",
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             },
             body:JSON.stringify({followid:userid}
                 
             )
         }).then(res=>res.json())
         .then(data=>{
            // dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            setfollowers(userdetails.followers)
            setfollowing(userdetails.following)
            localStorage.setItem("userdetails",JSON.stringify(data))
         })
     }
     const unfollowuser=()=>{
         fetch('/unfollow',{
             method:"put",
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             },
             body:JSON.stringify({unfollowid:userid}
                 
             )
         }).then(res=>res.json())
         .then(data=>{
            setfollowers(userdetails.followers)
            setfollowing(userdetails.following)
           //  console.log(data);
         })
     }
    return (
    <>
    {userdetails ? <div style={{maxWidth:"70vw",margin:"0px auto"}} > 
        <div className='profil'
        style={{display:'flex',justifyContent:'space-around',margin:'18px 0px',borderBottom:'2px solid grey',}}> 
        <div >                    
       <img style={{width:'160px',height:'160px',borderRadius:'80px'}} src ="https://i.pinimg.com/474x/bc/d4/ac/bcd4ac32cc7d3f98b5e54bde37d6b09e.jpg"/>

        </div>
        <div>
        <h4 className='fontstyle'> {userdetails.name}</h4>
        <div style={{display:'flex',justifyContent:'space-between',width:'110%'}}> <h6>{followers.length} followers</h6> 
        <h6>{following.length} following</h6> 
        <h6>{posts.length} posts</h6> </div>
        <button className="btn ma3 waves-effect waves-light font"
        onClick={followuser}>Follow</button>
          <button className="btn  waves-effect waves-light font"
        onClick={unfollowuser}>Unfollow</button>
        </div>
        
        </div>
              
        <div className="gallery">
            { posts.map(item=>{
                return(
                    <img className="img" src ={item.photo}/>
                )

            })}
           
            

            </div>  
        </div> : <h2>loading...</h2>}
        
        </>
    )
}
export default  Userprofile;