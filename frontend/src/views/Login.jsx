import React, { useState } from 'react'
import axios from 'axios'
import ApiCalls from '../helpers/ApiCalls'

import { useNavigate } from "react-router-dom";

const Login = () => {
  const initialCompte={
    username: "",
    password: ""
  };

  const[compte, SetCompte] = useState(initialCompte);
  // const[value, setValue] = useState("");
  const history = useNavigate();

  function  handleLoginChange(e){
    const{name,value}=  e.target;
    SetCompte({...compte,[name]:value});
  }


  const submitLogin = (e) =>{
    var res;
    e.preventDefault();
    const data = {
      username: compte.username,
      password: compte.password
    }
    ApiCalls.login(data)
    .then((value) => {
      res = value.roles[0]
    })

    if(res === "ROLE_RESPO"){
      history("/respo");
    }else{
      history("/admin");
    }
    // window.location.reload();
  }

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-header">Sign In to Your Account</div>
        <form className="login-form" onSubmit={submitLogin}>
          <div className="formController">
            <label>Username</label>
            <div className="input-group">
              <input name="username" type='text' placeholder='Enter your username' onChange={handleLoginChange}/>
            </div>
          </div>

          <div className="formController">
            <label>Password</label>
            <div className="input-group">
              <input name="password" type='password' placeholder='Enter your password' onChange={handleLoginChange}/>
            </div>
          </div>

          <input type="submit" value="Sign In" className='btnSubmit' />
        </form>
      </div>
    </div>
  )
}

export default Login