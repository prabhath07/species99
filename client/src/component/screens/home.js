import React from 'react'
import{Link } from 'react-router-dom';

const Home = () => {
    const Onclock=()=>{
        return <Link to="/signin" ></Link>
    }
    return (
        <div className="gif">
            <div className="auth-card">
      <div className="overlay">
          <h1 className="x-large ma">_Species_</h1>
          <p className="lead">
           A place to simply hang out
          </p>
          <div className="buttons">
          <Link to="/signup" ><button className="btn ma2 waves-effect waves-light font" onClick={onclick}>Signup</button></Link>
            <Link to="/signin" ><button className="btn ma2 waves-effect waves-light font" onClick={onclick}>Login</button></Link>
        </div>
        <h5>created by <a  href="https://github.com/prabhath07">Prabhath Akula</a></h5>
      </div>
    </div>
            
        </div>
    )
}
export default Home;