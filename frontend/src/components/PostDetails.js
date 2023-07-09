import React from 'react';
import "../css/PostDetails.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function PostDetails({item,toggleDetails}) {
  const navigate = useNavigate()

  const notifyA= (message) => toast.error(message);
  const notifyB= (message) => toast.success(message);

  const removePost=(postId)=>{
    if(window.confirm("Are you sure you want to remove this post?")){
      fetch(`/deletePost/${postId}`,{
      method:"delete",
      headers: {
        "Authorization": "Bearer "+localStorage.getItem("jwt")
      },
    }).then((res)=>res.json())
    .then((result)=>{
      if(result.message){
        console.log(result)
        notifyB(result.message);
        navigate("/");
        toggleDetails();
      }
      else if(result.error){
        notifyA(result.error);
      }
    })
    }
    
    
  }

  return (
    <div className="showComment">
 
      <div className="container">
          
          <div className="postPic">
            <img src={item.photo} alt="" />
          </div>

          <div className="details">

          <div className="card-header" style={{borderBottom:"1px solid #00000029"}}>
              <div className="card-pic">
                  <img src="https://images.unsplash.com/photo-1597626259989-a11e97b7772d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGtpdHRlbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
              </div> 
              <h5>{item.postedBy.name}</h5>
              <div className="deletePost">
              <span className="material-symbols-outlined" onClick={()=>{
                removePost(item._id);
                
              }}>delete</span>
              </div>
          </div>

          <div className="comment-section" style={{borderBottom:"1px solid #00000029"}}>
            {
              item.comments.map((text)=>{
                return (<p className="comm">
                <span className="commenter" style={{fontWeight:"bolder"}}>{text.postedBy.name}{" "}</span>
                <span className="commentText">{text.comment}</span>
              </p>)
              })
            }
            
          </div>


          <div className="card-content">
                
                <p>{item.likes.length} likes</p>
                <p>{item.body}</p>
          </div>

          <div className="add-comment">
                <span className="material-symbols-outlined">sentiment_satisfied</span>
                  <input type="text" 
                  placeholder="Add a comment" 
                //   value={comment}
                //   onChange={(e)=>{
                //     setComment(e.target.value);
                //   }}
                />
                  <button className="comment" 
                //    onClick={()=>{
                //     makeComment(comment,item._id)
                //     toggleDetails()
                //     }}
                  >Post</button>
          </div>

        </div>
      </div>

      <div className="close-comment">
        <span className="material-symbols-outlined material-symbols-outlined-comment"  
        onClick={()=>{
          toggleDetails();
        }}>close</span>
      </div>
      </div>
  )
}
