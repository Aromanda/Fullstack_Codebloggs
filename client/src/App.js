import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Create from "./components/create";
import Login from "./components/login";
import Home from "./components/home";
import Bloggs from "./components/bloggs";
import Admin from "./components/admin";
import Network from "./components/network";
import UserManager from "./components/userManager";
import Edit from "./components/editUser";
import ContentManager from "./components/contentmanager";
import { toast } from "react-toastify";

const App = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [postId, setPostId] = useState("");
  const [authLevel, setAuthLevel] = useState("");
  const [timeStamp, setTimeStamp] = useState(""); // New state for time_stamp
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const validateToken = async (token) => {
      try {
        const response = await fetch(`http://localhost:5050/session/validate_token?token=${token}`);
        if (!response.ok) {
          throw new Error("Token validation failed");
        }
        const data = await response.json();
        setUserId(data.userId);
        setEmail(data.email);
        setPostId(data.postId);
        setAuthLevel(data.auth_level);
        setTimeStamp(data.time_stamp); // Set the time_stamp state
      } catch (error) {
        console.error(error);
        toast.error("Failed to validate token");
      }
    };

    const path = window.location.pathname;
    if (path !== "/" && path !== "/create") {
      if (token) {
        validateToken(token);
      } else {
        navigate("/login");
      }
    }
  }, []);

  const isSidebarVisible = window.location.pathname !== "/" && window.location.pathname !== "/create";

  return (
    <div>
      <Navbar email={email} userId={userId} />
      {isSidebarVisible && <Sidebar authLevel={authLevel} />}
      <Routes>
        <Route path="/create" element={<Create />} />
        <Route path="/" element={<Login />} />
        <Route path="/userManager" element={<UserManager />} />
        <Route path="/editManager/:id" element={<Edit />} />
        <Route path="/home" element={<Home userId={userId} />} /> {/* Pass timeStamp as a prop */}
        <Route path="/bloggs" element={<Bloggs userId={userId} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/network" element={<Network userId={userId} postId={postId} />} />
        <Route path="/contentmanager" element={<ContentManager timeStamp={timeStamp} />} />
      </Routes>
    </div>
  );
};

export default App;
