import React from 'react';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';

const state = localStorage.getItem("user");

//console.log(state);
 const Feed = () => {
     const [data,setdata]= useState([]);
    // const [likes,setlikes]=useState("");
     
    
     useEffect(()=>{
         fetch('/allpost',{
           
             headers:{
                 "Authorization":"Bearer "+ localStorage.getItem("jwt")
             }
         }).then(res=>res.json())
         .then(result=>{
           
           setdata(result.posts);
        
         })
     },[])

     const likepost= (id)=>{
         fetch('/like',{
             method:'put',
             headers:{
                 "Authorization":"Bearer "+ localStorage.getItem("jwt")
                 , "content-type":"application/json"
             },
             body:JSON.stringify(
                 {
                     postId:id
                 }
             )
         }).then(res=>res.json())
         .then(result=>{
             const newdata = data.map(item=>{
                 if(item._id==result._id){
                     return result
                 }
                 else{
                     return item
                 }
             })
             setdata(newdata);
            })
            .catch(err=>{
                console.log(err);
            }) 
         }

     const unlikepost= (id)=>{
        fetch('/unlike',{
            method:'put',
            headers:{
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
                , "content-type":"application/json"
            },
            body:JSON.stringify(
                {
                    postId:id
                }
            )
        }).then(res=>res.json())
        .then(result=>{
             const newdata = data.map(item=>{
                 if(item._id==result._id){
                     return result
                 }
                 else{
                     return item
                 }
             })
             setdata(newdata);
            })
            .catch(err=>{
                console.log(err);
            })   }


    const deletepost =(postid)=>{
       // console.log(postid);
       
        fetch( '/delete/'+postid,{
            method:'delete',
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }

        })
        .then(res=>res.json())
        .then(result=>{
            const newdata = data.filter(item=>{
               
                    return item._id !== result._id
                                
            })
            setdata(newdata);
           })
    }  
    
    
const check = (id)=>{
const s = JSON.stringify(id) 
//id.toUpperCase();
//console.log(s ,state)
    if(s==state){
        return true
    }
    else
    return false


}


    return (
        <div className = "back home" >
            {
        data.map(item=>{
        //   console.log(item.postedBy._id.toString()) 
         const url = '/profile/'+item.postedBy._id
         return(
         <div className="card home-card">
             <h5 className="ma1">
              {check(item.postedBy._id) && <Link to='/profile'>{item.postedBy.name}</Link> }
              {!check(item.postedBy._id) && <Link to={url}>{item.postedBy.name}</Link> }

              { check(item.postedBy._id) && (<Link><i class="material-icons" style={{float:"right"}} onClick={()=>{deletepost(item._id)}} >delete</i></Link>) }
                         </h5>            
                        <div className='card-image'>
                           < img style={{maxHeight:'50vh', maxWidth:'50vw'}} src = {item.photo}/>
                        </div>
                        <div className="card-content">  
                        <Link>
                     <i class="material-icons" style={{  marginRight:'10px'}} onClick={()=>{likepost(item._id)}} >thumb_up</i>
                        </Link>
                        <Link>
                     <i class="material-icons" style={{}} onClick={()=>{unlikepost(item._id)}} >thumb_down</i>
                        </Link>                      

                        <h6>{item.likes.length} Likes</h6>
                        <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            <input type="text" placeholder="add comment"/>
                        </div>
                    </div>
             )})
            }

        </div>
         )}
       
export default Feed;