import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const linkStyle = {
  color: "white", // Change text color to white
  fontSize: "22px", 
  fontWeight: "bold", 
  paddingTop: "20px"
};

function Sidebar() {
  return (
    <Navbar style={{ backgroundColor: 'black', height: "100%", width: "15%", position: "fixed", zIndex: 1 }}> 
      {/* Use inline style to change the background to black. Bootstrap variant was removed since it won't work with black color */}
      <Nav className="flex-column" style={{ height: "100%" }}>
        <Link to="/home" style={linkStyle}>Home</Link>
        <Link to="/bloggs" style={linkStyle}>Bloggs</Link>
        <Link to="/network" style={linkStyle}>Network</Link>
        <Link to="/admin" style={linkStyle}>Admin</Link>
      </Nav>
    </Navbar>
  );
}

export default Sidebar;