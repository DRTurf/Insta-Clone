import { useRef,useEffect,useState } from "react"
import React from 'react'

export default function ProfilePic({changePic}) {
    const hiddenFileInput=useRef(null);
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    const postDetails=()=>{
        const data=new FormData();
        data.append("file",image);
        data.append("upload_preset","cloud1");
        data.append("cloud_name","drturf");
        fetch("https://api.cloudinary.com/v1_1/drturf/image/upload",{
            method: "POST",
            body: data
        }).then(res=>res.json())
        .then(data =>setUrl(data.url))
        .catch(err =>console.log(err))
    }

    useEffect(() => {
      if(image){
        postDetails();
      }
    }, [image])
    
    const postPhoto=()=>{
        fetch("/uploadProfilePic",{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
           console.log(data)
           changePic();
           window.location.reload();
        }).catch(err=>console.log(err))
    }

    useEffect(() => {
      if(url){
        postPhoto();
      }
    }, [url])
    

    const handleClick=()=>{
        hiddenFileInput.current.click();
    }

  return (
    <div className="profilePic darkBg">
        <div className="changePic centered">
            <div>
                <h2>Change Profile Photo</h2>
            </div>
            <div style={{border:"1px solid #00000030"}}>
                <button className="upload-btn" style={{color:"#1EA1F7"}} onClick={()=>{handleClick()}}>Upload Photo</button>
                <input type="file" ref={hiddenFileInput} accept="image/*" style={{display:"none"}} 
                onChange={(e)=>{setImage(e.target.files[0])}}/>
            </div>
            <div style={{border:"1px solid #00000030"}}>
                <button className="upload-btn" style={{color:"#ED4956"}}
                onClick={()=>{
                    setUrl(null)
                    postPhoto()
                }}>{" "}
                Remove Current Photo</button>
            </div>
            <div style={{border:"1px solid #00000030"}}>
                <button style={{
                    background:"none", 
                    border:"none", 
                    cursor:"pointer", 
                    fontSize:"15px"
                    }}
                    onClick={()=>changePic()}>Cancel</button>
            </div>
        </div>
    </div>
  )
}
