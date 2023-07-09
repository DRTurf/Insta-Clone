import logo from "../img/logo.png";
import React, { useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
import '../css/signup.css';
import { toast } from 'react-toastify';

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  
  const notifyA= (message) => toast.error(message);
  const notifyB= (message) => toast.success(message);

  const postData = ()=>{
    if(!emailRegex.test(email)){
      return notifyA("Invalid email");
    }
    else if(!passwordRegex.test(password)){
      return notifyA("Password must contain at least eight characters,one special character,an upper case and lower case character");
    }
    
    fetch("/signup",{
      method:"post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name:name,
        email:email,
        userName:userName,
        password:password
      }) 
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
      notifyA(data.error);
      }
      else{
        notifyB(data.message);
        navigate("/Signin")
      }
      
      console.log(data)
    })
  }
  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
          <img className="signUpLogo" src={logo} alt="" />
          <p className="loginPara">
            Sign up to see photos and videos <br /> from your friends
          </p>
          <div>
            <input 
            type="email" 
            name="email" 
            id="email" 
            value={email} 
            placeholder="Email" 
            onChange={(e) => { setEmail(e.target.value) }} 
            />
          </div>
          <div>
            <input 
            type="text" 
            name="name" 
            id="name" 
            placeholder="Full Name" 
            value={name} 
            onChange={((e) => { setName(e.target.value) })} 
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={userName}
              onChange={(e) => { setUserName(e.target.value) }}
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
          <p
            className="loginPara"
            style={{ fontSize: "12px", margin: "3px 0px" }}
          >
            By signing up, you agree to out Terms, <br /> privacy policy and
            cookies policy.
          </p>
          <input 
          type="submit" 
          id="submit-btn" 
          value="Sign Up" 
          onClick={() => { postData() }} 
          />
        </div>
        <div className="form2">
          Already have an account ?
          <Link to="/signin">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
