import React,{useEffect,useState} from 'react'
import '../css/Profile.css'
import PostDetails from './PostDetails';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
    
    const [isFollow, setIsFollow] = useState(false);
    const [post, setPost] = useState([]);
    const [user, setUser] = useState("");
    const {userId}=useParams();
    var dummyPic="https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg";
    console.log(userId);

    const followUser=(userId)=>{
      fetch("/follow",{
        method:"put",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          followId: userId
        })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data)
        setIsFollow(true)
      })
    }
    
    const unfollowUser=(userId)=>{
      fetch("/unfollow",{
        method:"put",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          followId: userId
        })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data)
        setIsFollow(false)
      })
    }
  
    // const toggleDetails=(pics)=>{
    //   if(show){
    //     setShow(false);
    //   }
    //   else{
    //     setShow(true);
    //     setPosts(pics);
    //   }
    // }
    
  
    useEffect(() => {
      fetch(`/users/${userId}`,{
        
      }).then(res=>res.json())
      .then((data)=>{
        console.log(data);
        setUser(data.user);
        setPost(data.post);
        if(data.user.follower.includes(JSON.parse(localStorage.getItem("user"))._id))
        {
          setIsFollow(true)
        }
      })
      .catch(err=>console.log(err))
    }, [])
  
  
    return (
      <div className="profile">
        <div className="profile-frame">
          <div className="profile-pic">
            <img src={user.Photo?user.Photo:dummyPic} alt="" />
            </div>
            <div className="profile-data">
              <div style={{display:"flex" , alignItems:"center"}}>
                <h1>{user.name}</h1>
                <button className="followBtn" onClick={()=>{
                  if(isFollow){
                    unfollowUser(user._id)
                  }
                  else{
                    followUser(user._id)
                  }
                }}>{isFollow?"Unfollow":"Follow"}</button>
              </div>
              
              <div className="profile-info" style={{display:"flex"}}>
                <p>{post.length} Posts</p>
                <p>{user.following ? user.following.length:"0"} Following</p>
                <p>{user.follower ? user.follower.length:"0"} Followers</p>
            </div>
          </div>
        </div>
        <hr style={{
          width:"90%",
          opacity:"0.8",
          margin:"25px auto"
        }}/>
        <div className="gallery">
          {post.map((pics)=>{
            return <img 
            key={pics._id} 
            src={pics.photo} 
            className="item" 
            alt=""
            // onClick={()=>{
            //   toggleDetails(pics);
            // }}
            />
          })}
        </div>
  {/* {
    show && <PostDetails item={posts} toggleDetails={toggleDetails} />
  } */}
        
      </div>
      
    )
  }
