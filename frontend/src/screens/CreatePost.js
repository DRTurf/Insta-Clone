
import React ,{useState,useEffect} from 'react';
import "../css/CreatePost.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function CreatePost() {
    const navigate = useNavigate();
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");


    const notifyA= (message) => toast.error(message);
    const notifyB= (message) => toast.success(message);

    useEffect(() => {
        if(url){
            fetch("/createpost",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                notifyA(data.error);
                }
                else {
                  notifyB("Saved successfully");
                  navigate("/")
                }
        })
        .catch(err=>console.log(err))
        } 
  
    }, [url]);
    

    

    const postDetails=()=>{
        console.log(body,image);
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
        console.log(url)
    }





    const loadFile =(event)=>{
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
          URL.revokeObjectURL(output.src) // free memory
        }
      };
  return (
    <div className="createPost">
        <div className="post-header">
            <h4 style={{margin:"3px auto"}}>Create New Post</h4>
            <button id="post-btn" onClick={()=>{postDetails()}}>Share</button>
        </div>
        <div className="main-div">
            <img id="output" src="https://th.bing.com/th/id/OIP.ZaA8xlyk9o8DcMEBQIrGkQHaHa?pid=ImgDet&rs=1"alt=""/>
            <input 
            type="file" 
            accept="image/*" 
            onChange={(event)=>{
                loadFile(event)
                setImage(event.target.files[0])}
            } />
        </div>
        <div className="details">
            <div className="card-header">
                <div className="card-pic">
                    <img src="https://images.unsplash.com/photo-1597626259989-a11e97b7772d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGtpdHRlbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                </div>
                <h5>DRTurf</h5>
            </div>
            <textarea 
            type="text" 
            placeholder="Write a caption"
            value={body}
            onChange={(e) => { setBody(e.target.value) }}>
          </textarea>
        </div>
    </div>
  )
}
