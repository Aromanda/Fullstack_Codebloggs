import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const linkStyle = {
  color: 'white',
  fontSize: '22px',
  fontWeight: 'bold',
  paddingTop: '20px'
};
function Sidebar(props) {
  const { authLevel } = props;
  if (!authLevel) {
    return null; // return null or a placeholder component if authLevel is not defined yet
  }
  console.log(`authLevel:sidebar.js `+ authLevel);
  return (
    <Navbar style={{ backgroundColor: 'black', height: '100%', width: '15%', position: 'fixed', zIndex: 1 }}>
      <Nav className="flex-column" style={{ height: '100%' }}>
        <Link to="/home" style={linkStyle}>Home</Link>
        <Link to="/bloggs" style={linkStyle}>Bloggs</Link>
        <Link to="/network" style={linkStyle}>Network</Link>
        {authLevel === "admin" && <Link to="/admin" style={linkStyle}>Admin</Link>}
      </Nav>
    </Navbar>
  );
}
export default Sidebar;