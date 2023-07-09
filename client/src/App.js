import React, { useEffect, useRef } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./components/login";
import ErrorPage from "./components/errorpage";
import Main from "./components/main";
import Transactions from "./components/transactions";
import Graph from "./components/graph";

const App = () => {
  const navigate = useNavigate();
  const intervalId = useRef();

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
      if (!token) {
        sessionStorage.clear();
        navigate("/");
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
        <Route exact path="/admin/record" element={<RecordList />} />
        <Route path="/admin/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/" element={<Login />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/main" element={<Main handleLogout={handleLogout} />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
    </div>
  );
};

export default App;
