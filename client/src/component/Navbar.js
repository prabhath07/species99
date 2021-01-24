import React,{useContext} from 'react';
import{Link } from 'react-router-dom';
import {userContext} from '../App'


 const Navbar = () => {
var {state,dispatch} = useContext(userContext);
const signout = async()=>{
  await localStorage.clear();
  dispatch({type:"CLEAR"})
  
}

const renderlist = ()=>{
  if(state){
    return[
      <li><Link to="/profile">Profile</Link></li>,
      <li><Link to="/create">CreatePost</Link></li>,
      <li><Link onClick={signout} to="/" >Signout</Link></li>,
    ]
  }
  else{
    return[
     
      <li><Link to="/signin">Login</Link></li>,
      <li><Link to="/signup">Signup</Link></li>,
     
    ]

  }
}
    return (
        
        <nav>
        <div class="nav-wrapper col ">
          <Link to={localStorage.getItem("jwt")?"/userfeed":"/signin"} class="brand-logo left mright font4"><i class="bi bi-controller"></i>_Species_</Link>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
          {renderlist()}
          </ul>
        </div>
      </nav>
    )
}

export default Navbar;