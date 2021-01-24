import React, { useState,useContext } from 'react';
import{Link,useHistory } from 'react-router-dom';
import M from 'materialize-css' ;
import {userContext} from '../../App'
const Login = () => {
const {state,dispatch}=useContext(userContext)

    const history = useHistory()
const [password,Setpassword]= useState("");
const [email,Setemail]= useState("");
const postData = ()=>{
    fetch("/signin",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
           },
        body:JSON.stringify({
            email,
            password
        })
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
            M.toast({html: data.error})
        }
        else{
            localStorage.setItem("jwt",data.token);
            localStorage.setItem("user",JSON.stringify(data.user))
            dispatch ({type:"USER",payload:data.user})
            M.toast({html:"Signed-in succesfully",classes:"#43a047 green darken-1"})
            history.push('./userfeed');
        }
    }).catch(err=>{
console.log(err);
    })
}
    return ( 
    <div className="gif2">
             
    <div class ="card auth-card">
        <h2 className="x-large ma">_Species_</h2>
        <input type='email'  onChange={(e)=>Setemail(e.target.value)} placeholder='Email'/>
        <input type='password' onChange={(e)=>Setpassword(e.target.value)} placeholder="Password"/>
        <button className="btn ma3 waves-effect waves-light font"
        onClick={postData}>SignIn</button>
        <br/>
            <Link to='/signup' style={{color:'black'}}>Don't have an account ?</Link>
    </div>
    </div>
    )
}
export default Login;