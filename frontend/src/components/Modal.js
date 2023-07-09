import React from 'react';
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import "../css/Modal.css";

export default function Modal({setModalOpen}) {
  const navigate=useNavigate();
  return (
    <div className="darkBg" onClick={()=>setModalOpen(false)}>
      <div className="centered">
      <div className="modal">
        <div className="modalHeader">
            <h5 className="heading">Confirm</h5>
        </div>
        <button className="closeBtn">
          <RiCloseLine onClick={()=>setModalOpen(false)}></RiCloseLine>
        </button>
        <div className="modalContent">
          Logout Confirm?
        </div>
        <div className="modalActions">
          <div className="actionsContainer">
            <button className="logOutBtn" onClick={()=>{setModalOpen(false);
            localStorage.clear();
            navigate("/signin")}}>Log Out</button>
            <button className="cancelBtn" onClick={()=>setModalOpen(false)}>Cancel</button>
          </div>
        </div>
       </div>
     </div>
    </div>
    
    
  )
}
