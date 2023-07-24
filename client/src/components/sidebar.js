// Sidebar.js

import React, { useEffect, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaBloggerB, FaNetworkWired, FaUserCog, FaBars } from 'react-icons/fa';
import "../css/sidebar.css";

const linkStyle = {
  color: 'white',
  fontSize: '22px',
  fontWeight: 'bold',
};

const iconStyle = {
  color: 'white',
  fontSize: '32px', // Increase the icon size
  margin: '10px auto', // Center the icons horizontally and add vertical margin between icons
};

function Sidebar(props) {
  const { authLevel } = props;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!authLevel) {
    return null;
  }

  const handleToggleSidebar = () => {
    setShowSidebar((prevShow) => !prevShow);
  };

  return (
    <div className={`sidebar-container ${isMobile ? (showSidebar ? "show-sidebar" : "hide-sidebar") : "show-sidebar"}`}>
      {isMobile ? (
        <Navbar style={{ backgroundColor: 'black', height: '56px', zIndex: 1 }}>
          <span className="navbar-icon" onClick={handleToggleSidebar}>
            <FaBars />
          </span>
          <div className={`icon-bar ${showSidebar ? "show-icon-bar" : ""}`}>
            <Link to="/home" style={linkStyle}><FaHome style={iconStyle} /></Link>
            <Link to="/bloggs" style={linkStyle}><FaBloggerB style={iconStyle} /></Link>
            <Link to="/network" style={linkStyle}><FaNetworkWired style={iconStyle} /></Link>
            {authLevel === "admin" && (
              <Link to="/admin" style={linkStyle}><FaUserCog style={iconStyle} /></Link>
            )}
          </div>
        </Navbar>
      ) : (
        <Navbar className={`sidebar ${isMobile ? "mobile" : ""}`} style={{ backgroundColor: 'black', height: '100%', width: '15%', position: 'fixed', zIndex: 1 }}>
          <Nav className="flex-column" style={{ height: '100%' }}>
            <Link to="/home" style={linkStyle}>
              <FaHome style={iconStyle} />
              {isMobile ? null : "Home"}
            </Link>
            <Link to="/bloggs" style={linkStyle}>
              <FaBloggerB style={iconStyle} />
              {isMobile ? null : "Bloggs"}
            </Link>
            <Link to="/network" style={linkStyle}>
              <FaNetworkWired style={iconStyle} />
              {isMobile ? null : "Network"}
            </Link>
            {authLevel === "admin" && (
              <Link to="/admin" style={linkStyle}>
                <FaUserCog style={iconStyle} />
                {isMobile ? null : "Admin"}
              </Link>
            )}
          </Nav>
        </Navbar>
      )}
    </div>
  );
}

export default Sidebar;