import React, { useState,useContext } from "react";
import '../css/signin.css';
import logo from "../img/logo.png";
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginContext } from "../context/LoginContext";

export default function SignIn() {
  const{setUserLogin}=useContext(LoginContext)
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");




  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;



  const notifyA= (message) => toast.error(message);
  const notifyB= (message) => toast.success(message);

  const postData=()=>{
    if(!emailRegex.test(email)){
      return notifyA("Invalid email");
    }
    else if(!passwordRegex.test(password)){
      return notifyA("Password must contain at least eight characters,one special character,an upper case and lower case character");
    }
    
    fetch("/signin",{
      method:"post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email:email,
        password:password
      }) 
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
      notifyA(data.error);
      }
      else{
        notifyB("Login successful");
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        setUserLogin(true);
        navigate("/")
      }
      
      console.log(data)
    })
  }

  return (
    <div className="signIn">
      <div>
        <div className="loginForm">
        <img className="signUpLogo" src={logo} alt="" />
        <div>
          <input 
          type="email" 
          name="email" 
          id="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
          />
        </div>
        <div>
          <input 
          type="password" 
          name="password" 
          id="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          />
        </div>
        <div>
          <input 
          type="submit" 
          id="login-btn" 
          value="Sign In" 
          onClick={() => { postData() }}/>
        </div>
        <div className="loginForm2">
          Don't have an account ?
          <Link to="/Signup">
          <span style={{color:"blue",cursor:"pointer"}}>Sign Up</span>
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}
