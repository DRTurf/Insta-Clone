import React,{useState} from 'react';
import './App.css';
import Navbar from './components/NavBar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signin from './components/SignIn';
import Signup from './components/SignUp';
import Profile from './screens/Profile';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './screens/Home';
import Createpost from './screens/CreatePost';
import { LoginContext } from './context/LoginContext';
import Modal from './components/Modal';
import UserProfile from './components/UserProfile';
import MyFollowing from './screens/MyFollowing';


function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <BrowserRouter><div className="App">
      <LoginContext.Provider value={{setUserLogin,setModalOpen}}>
      <Navbar login={userLogin}/> 
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route exact path="/Profile" element={<Profile/>}></Route>
      <Route path="/Signin" element={<Signin/>}></Route>
      <Route path="/Signup" element={<Signup/>}></Route>
      <Route path="/CreatePost" element={<Createpost/>}></Route>
      <Route path="/Profile/:userId" element={<UserProfile/>}></Route>
      <Route path="/MyFollowing" element={<MyFollowing/>}></Route>
      </Routes>
      
      <ToastContainer theme="dark"/>
      {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
      </LoginContext.Provider>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
