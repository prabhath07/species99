import React , {useState,useEffect} from 'react'
import{Link,useHistory } from 'react-router-dom';
import M from 'materialize-css' ;
import Axios from 'axios';
const Createpost = () => {
const history = useHistory()
const [title,setitle]= useState("");
const [body, setbody]=useState("");
const [img, setimg]=useState("");
const [url, seturl]=useState("");

   const postDetails=()=>{
     const data = new FormData()
     data.append("file",img);
     data.append("upload_preset","species");
     data.append("cloud_name","prabhath");
    
     Axios.post("https://api.cloudinary.com/v1_1/prabhath/image/upload",data)
    .then(data=>{
    seturl(data.data.secure_url);
    console.log(url);    
    
    })
    .catch(err=>console.log(err))

    const token = localStorage.getItem("jwt");
    fetch("/createpost",{
     method:'post',
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+ token
         },
      body:JSON.stringify({
          title,
          body,
         pic: url })    })
         
    .then(res=>{
    if(res.error){
        M.toast({html: res.error})
    }
    else{
        M.toast({html:"posted succesfully",classes:"#43a047 green darken-1"})
        history.push('./userfeed');
       
    }
})
  .then(res=>{
      if(res.error){
          M.toast({html: res.error})
      }
      else{
          M.toast({html:"posted succesfully",classes:"#43a047 green darken-1"})
          history.push('./userfeed');
          console.log("coming");
      }
  }).catch(err=>{
console.log(err);
  })
}
   

   


    return (
        <div className = 'gif6'>
        <div className="card auth-card input-filed" 
        style={{margin:"30px auto",
        maxWidth:"500px",
        padding:"20px",
        textAlign:"center"}} >
            <h2 className="x-large ma">_Create_Post_</h2>
     <input type = "text" onChange={(e)=>{setitle(e.target.value);}} value={title}placeholder="title"/> 
     <input type = "text" value={body} onChange={(e)=>{setbody(e.target.value)} }placeholder="body"/> 
     <div class="file-field input-field">
      <div class="btn">
        <span>File</span>
        <input type="file" onChange={(e)=>{console.log(e.target.files);
        setimg(e.target.files[0]);
        console.log(img)}}/>
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text"/>
      </div>
    </div>
    <button className="btn  waves-effect waves-light ma3 font" onClick={postDetails}>Submit Post</button>

        </div>
        </div>
    )
}
export default Createpost;



