import React,{useEffect,useState} from 'react'
import '../css/Home.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


export default function MyFollowing() {
    const [data, setData] = useState([])
    const [comment, setComment] = useState("")
    var dummyPic="https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
    
    
    const [show, setShow] = useState(false)
    const [item, setItem] = useState([])
    const navigate=useNavigate();
  
  
    const notifyB= (message) => toast.success(message);
  
    const toggleFunc=(posts)=>{
      if(show){
        setShow(false);
      }
        else{
          setShow(true);
          setItem(posts)
        }
      }
    
  
    useEffect(() => {
      const token=localStorage.getItem("jwt");
      if(!token){
        navigate("/Signin")
      }
      fetch("/myfollowing",{
        headers: {
          "Authorization": "Bearer "+localStorage.getItem("jwt")
      },
      }).then(res=>res.json())
      .then(result=>setData(result))
      .catch(err=>console.log(err))
    }, [])
    
   
    const likedPost=(id)=>{
      fetch("/like",{
        method:"put",
        headers:{
          "Content-Type": "application/json",
          "Authorization" : "Bearer " +localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          postId:id
        })
      }).then(res=>res.json())
      .then(result=>{
        const newData= data.map((posts)=>{
          if(posts._id===result._id)
          return result;
          else 
          return posts;
        })
        setData(newData)
        console.log(result)
      })
      .catch(err=>{console.log(err)})
    }
  
  
    const unlikedPost=(id)=>{
      fetch("/unlike",{
        method:"put",
        headers:{
          "Content-Type": "application/json",
          "Authorization" : "Bearer " +localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          postId:id
        })
      }).then(res=>res.json())
      .then(result=>{
        const newData= data.map((posts)=>{
          if(posts._id===result._id)
          return result;
          else 
          return posts;
        })
        setData(newData)
        console.log(result)
      })
      .catch(err=>{console.log(err)})
    }
  
    const makeComment=(comment,id)=>{
      fetch("/comment",{
        method:"put",
        headers:{
          "Content-Type": "application/json",
          "Authorization" : "Bearer " +localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          comment:comment,
          postId:id
        })
      }).then(res=>res.json())
      .then((result)=>{
        const newData= data.map((posts)=>{
          if(posts._id===result._id)
          return result;
          else 
          return posts;
        })
        setData(newData)
        setComment("");
        notifyB("Comment posted");
        console.log(result);
      })
    }
  
    return (
      <div className="home">
        {data.map((posts)=>{
          return(
  
            <div className="card">
  
            <div className="card-header">
                <div className="card-pic">
                    <img src={posts.postedBy.Photo?posts.postedBy.Photo:dummyPic} alt="" />
                </div>
                <Link to={`/profile/${posts.postedBy._id}`}> 
                <h5>{posts.postedBy.name}
                </h5>
                </Link> 
               
            </div>
  
              <div className="card-image">
                <img src={posts.photo} alt="" />
              </div>
  
                <div className="card-content">
                  {
                    posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)?(<span 
                      class="material-symbols-outlined material-symbols-outlined-red" 
                    onClick={()=>{unlikedPost(posts._id)}}>favorite
                    </span>):(<span className="material-symbols-outlined" 
                    onClick={()=>{likedPost(posts._id)}}>favorite
                    </span>)
                  }
                
                
                  <p>{posts.likes.length} likes</p>
                  <p>{posts.body}</p>
                  <p style={{fontWeight:"bold",cursor:"pointer"}} onClick={()=>{
                    toggleFunc(posts)
                  }}>Veiw all comments</p>
                  </div>
  
                  <div className="add-comment">
                  <span className="material-symbols-outlined">sentiment_satisfied</span>
                    <input type="text" 
                    placeholder="Add a comment" 
                    value={comment}
                    onChange={(e)=>{
                      setComment(e.target.value);
                    }}/>
                    <button className="comment" onClick={()=>{
                      makeComment(comment,posts._id)
                      }
                      }>Post</button>
                  </div>
  
                </div>
          )
        })}{
          show && (<div className="showComment">
   
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
                  
                  <p>{item.likes.length}likes</p>
                  <p>{item.body}</p>
            </div>
  
            <div className="add-comment">
                  <span className="material-symbols-outlined">sentiment_satisfied</span>
                    <input type="text" 
                    placeholder="Add a comment" 
                    value={comment}
                    onChange={(e)=>{
                      setComment(e.target.value);
                    }}/>
                    <button className="comment" 
                     onClick={()=>{
                      makeComment(comment,item._id)
                      toggleFunc()
                      }}
                    >Post</button>
            </div>
  
          </div>
        </div>
  
        <div className="close-comment">
          <span className="material-symbols-outlined material-symbols-outlined-comment"  onClick={()=>{
            toggleFunc()
          }}>close</span>
        </div>
        </div>)
        }
        
        
      </div>
      
      
    )
  }
  
