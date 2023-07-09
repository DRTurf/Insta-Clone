import React,{useContext} from 'react';
import logo from '../img/logo.png';
import '../css/navbar.css';
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

export default function NavBar({login}) {
  const { setModalOpen } =useContext(LoginContext)
  const navigate = useNavigate();

  const goTO =()=>{
    navigate("/");
  }

  const loginStatus=()=>{
    const token=localStorage.getItem("jwt");
    if(login || token){
      return[
        <>
        <Link to="/Profile"><li>Profile</li></Link>
        <Link to="/CreatePost"><li>Create Post</li></Link>
        <Link style={{marginLeft:"20px"}} to="/MyFollowing" ><li>My Following</li></Link>
        <Link to={""}>
          <button className="primaryBtn" onClick={()=>setModalOpen(true)}>Log Out</button>
        </Link>
        </>
      ]
    }
    else{
      return[
        <>
        <Link to="/Signup"><li>SignUp</li></Link>
        <Link to="/Signin"><li>SignIn</li></Link>
        </>
      ]
    }
  }


   
  return (
    <div className="navbar">
       <img src={logo} alt=""  onClick={()=>{
        goTO();
        }}/>
       <ul className='nav-menu'>{loginStatus()}
       </ul>
    </div>
  )
}
