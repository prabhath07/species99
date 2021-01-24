import './App.css';
import React from 'react';
import Navbar from './component/Navbar';
import {BrowserRouter as Router , Route, useHistory ,Switch } from 'react-router-dom';
import Home from './component/screens/home';
import Login from './component/screens/Login';
import Signup from './component/screens/Signup';
import Profile from './component/screens/Profile';
import Userprofile from './component/screens/userprofile';
import Feed from './component/screens/Feed';
import Createpost from './component/screens/Createpost';
import Updateprofile from './component/screens/updateprofile';

import {reducer,initialstate} from './reducer/userreducer';

import {useEffect, createContext,useReducer,useContext} from 'react';
export const UserContext = createContext()


const Routing =()=>{
  const Hist = useHistory();
  const {state,dispatch} = useContext(userContext)
  useEffect(()=>{

    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER",payload:user})
     // Hist.push('/profile/:userid');
    }
    else{
      Hist.push('/signin');
    }
  },[])
  return(
    <Switch>
       <Route exact path="/" ><Home/></Route>
    <Route exact path="/userfeed" ><Feed/></Route>
    <Route path="/signin" ><Login/></Route>
    <Route path="/signup" ><Signup/></Route>
    <Route exact path="/profile" ><Profile/></Route>
    <Route path="/create" ><Createpost/></Route>
    <Route path="/profile/:userid" ><Userprofile/></Route>
    <Route path="/updateprofile" ><Updateprofile/></Route>

    </Switch>
  )
}
export const userContext = createContext();
function App() {
  const [state,dispatch]=useReducer(reducer,initialstate);
  return (
    <userContext.Provider value ={{state,dispatch}} >
    <Router>
    <Navbar/>
    <Routing/>
    </Router>
    </userContext.Provider>
  );
}

export default App;
