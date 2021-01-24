import React , {useState,useEffect} from 'react'
import{Link,useHistory } from 'react-router-dom';
import M from 'materialize-css' ;
import Axios from 'axios';
const Updateprofile = () => {
const history = useHistory()
    const [num,setnum]=useState(0);    
    const [name,setname]=useState("");
    const [img,setimg]=useState("");
   const [url, seturl]=useState("");

   const  postdata = async ()=>{
       setnum(num+1);
    const data = await new FormData()
    data.append("file",img);
    data.append("upload_preset","species");
    data.append("cloud_name","prabhath");
   
       Axios.post("https://api.cloudinary.com/v1_1/prabhath/image/upload",data)
   .then(dat=>{
     //  console.log(dat);
       seturl(dat.data.secure_url);})
      .then((result)=>{
      // console.log(url);
     fetch('/updateprofile',{
                 method:'put',
                headers:{
                 "Authorization":"Bearer "+localStorage.getItem("jwt"),
                 "Content-Type":"application/json"
             },
             body:
                JSON.stringify({
                 name,
                 profile:url
             })
         }).then(re=>re.json())
         .then(res=>{
           //  console.log(res);
             if(res.error){
                M.toast({html: res.error})
            }
            else if(num==1) {
                M.toast({html:"updated succesfully",classes:"#43a047 green darken-1"})
                ;
                setnum(0);
                // history.push('./profile');
            } })
            
            .catch(err=>{
    console.log(err); })
        })
        
   }


    return(
        <div className="gif7">
             
        <div class ="card auth-card">
            <h2 className="x-large ma">_Update_profile</h2>
            <input type='text' onChange={(e)=>setname(e.target.value)} placeholder='update Name'/>
            <div class="file-field input-field">          
            <div class="btn">
            <span>Profile</span>
           <input type="file" onChange={(e)=>{
               console.log(e.target.files);
               setimg(e.target.files[0]);
            }}/>
           </div >
           </div >
           <Link  ><button className="btn ma3 waves-effect waves-light font" onClick={postdata}>Submit</button></Link>
            
            <br/>
            
        </div>
        
        </div>
    )
}

export default Updateprofile;