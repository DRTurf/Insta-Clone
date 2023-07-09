import React,{useEffect,useState} from 'react'
import '../css/Profile.css'
import PostDetails from '../components/PostDetails';
import ProfilePic from '../components/ProfilePic';


export default function Profile() {
  var dummyPic="https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isPic, setIsPic] = useState(false);
  const [user, setUser] = useState("");

  

  const toggleDetails=(pics)=>{
    if(show){
      setShow(false);
    }
    else{
      setShow(true);
      setPosts(pics);
    }
  }

  const changePic=()=>{
    if(isPic){
      setIsPic(false);
    }
    else{
      setIsPic(true);
    }
  }

  const [pic, setPic] = useState([]);

  useEffect(() => {
    fetch(`/users/${JSON.parse(localStorage.getItem("user"))._id}`,{
      headers: {
        "Authorization" : "Bearer " +localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then((data)=>{
      setPic(data.post)
      setUser(data.user)
    })
    .catch(err=>console.log(err))
  }, [])


  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic" onClick={()=>changePic()}>
          <img src={user.Photo?user.Photo:dummyPic} alt="" />
          </div>
          <div className="profile-data">
            <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
            <div className="profile-info" style={{display:"flex"}}>
              <p>{pic?pic.length:"0"} Posts</p>
              <p>{user.following?user.following.length:"0"} Following</p>
              <p>{user.follower?user.follower.length:"0"} Followers</p>
          </div>
        </div>
      </div>
      <hr style={{
        width:"90%",
        opacity:"0.8",
        margin:"25px auto"
      }}/>
      <div className="gallery">
        {pic.map((pics)=>{
          return <img 
          key={pics._id} 
          src={pics.photo} 
          className="item" 
          alt=""
          onClick={()=>{
            toggleDetails(pics);
          }}
          />
        })}
      </div>
{
  show && <PostDetails item={posts} toggleDetails={toggleDetails} />
}
{
  isPic && <ProfilePic changePic={changePic}/>
}
    </div>
    
  )
}
