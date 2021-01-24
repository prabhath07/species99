import React, { useState } from 'react'
import{Link,useHistory } from 'react-router-dom';
import M from 'materialize-css' 
import Axios from 'axios';



const Signup = () => {
const history = useHistory()
const [name,Setname]= useState("");
const [password,Setpassword]= useState("");
const [email,Setemail]= useState("");
const [img, setimg]=useState("");
   const [url, seturl]=useState("");
  // const [profile,setprofile]=usestate("")
const postData = ()=>{
    const data = new FormData()
     data.append("file",img);
     data.append("upload_preset","species");
     data.append("cloud_name","prabhath");
    
     Axios.post("https://api.cloudinary.com/v1_1/prabhath/image/upload",data)
    .then(data=>{console.log(data);
    seturl(data.data.secure_url);
    console.log(url);})
   

    fetch("/signup",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
           },
        body:JSON.stringify({
            name,
            email,
            password,
            profile:url
        })
    }).then(res=>res.json())
    .then(res=>{
        if(res.error){
            M.toast({html: res.error})
        }
        else{
            M.toast({html:res.message,classes:"#43a047 green darken-1"})
            history.push('./signin');
        }
    }).catch(err=>{
console.log(err);
    })
}

    return (
        <div className="gif3">
             
        <div class ="card auth-card2">
            <h2 className="x-large ma">_Species_</h2>
            <input type='text' onChange={(e)=>Setname(e.target.value)} placeholder='Name'/>
            <input type='email' onChange={(e)=>Setemail(e.target.value)}placeholder='Email'/>
            <input type='password' onChange={(e)=>Setpassword(e.target.value)}placeholder="Password"/>
            <div class="file-field input-field">       

            <div class="btn">
            <span>File</span>
           <input type="file" onChange={(e)=>{console.log(e.target.files);
            setimg(e.target.files[0]);
             console.log(img)}}/>
           </div>
           </div>

            <button className="btn ma3 waves-effect waves-light font" onClick={postData}>Submit</button>
            
            <Link to='/signin' style={{color:'black'}}>Already have an account ?</Link>
        </div>
        
        </div>
       
    )
}
export default Signup;