import React, {useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Create from "./components/create";
import Login from "./components/login";
import Home from "./components/home";
import Bloggs from "./components/bloggs";
import Admin from "./components/admin";
import Network from "./components/network";
import { toast } from 'react-toastify';


const App = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    const validateToken = async (token) => {

      console.log(`token: `+token)

      try {
        const response = await fetch(`http://localhost:5050/session/validate_token?token=${token}`);
        if (!response.ok) { throw new Error('Token validation failed');}

        const data = await response.json();
        console.log(`data`);
        console.log(data);

        setUserId(data.userId);
        setEmail(data.email);

      } catch (error) {
        console.error(error);
        toast.error('Failed to validate token');
      }
    };

    validateToken(token).then(r => r)
  }, [navigate])

  return (
    <div>
      {/*<Navbar handleLogout={handleLogout} />*/}
      <Navbar email={email}/>
      <Routes>
        <Route path="/create" element={<Create />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home userId={userId}/>} />
        <Route path="/bloggs" element={<Bloggs />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/network" element={<Network />} />
      </Routes>
    </div>
  );
};

export default App;
