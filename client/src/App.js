import React, { useEffect, useRef } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
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
  const intervalId = useRef();

  const validateToken = async (token) => {
    console.log(`token: `+token)
    console.log(typeof(token))
    try {
      const response = await fetch(`http://localhost:5050/session/validate_token?token=${token}`);
      if (!response.ok) {
        throw new Error('Token validation failed');
      }
      const data = await response.json();
      console.log(data);
      // You can now use this data to do any additional processing if required
    } catch (error) {
      console.error(error);
      toast.error('Failed to validate token');
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      if (!sessionStorage.getItem('token')) {
        Cookies.remove('connect.sid');
        navigate("/");
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    }
  }, [navigate]);

  useEffect(() => {
    const checkCookie = () => {
      const token = Cookies.get('connect.sid');
      console.log(token)
      if (!token && !window.location.pathname.includes("/create")) {
        sessionStorage.clear();
        navigate("/");
      } else {
        validateToken(token); 
      }
    };

    intervalId.current = setInterval(checkCookie, 1000);

    return () => {
      clearInterval(intervalId.current);
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    Cookies.remove('connect.sid');
    navigate("/");
  };

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <Routes>
        <Route path="/create" element={<Create />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home handleLogout={handleLogout} />} />
        <Route path="/bloggs" element={<Bloggs />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/network" element={<Network />} />
      </Routes>
    </div>
  );
};

export default App;
