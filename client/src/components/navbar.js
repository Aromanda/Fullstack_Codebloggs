import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Nav, Navbar, Dropdown, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export default function MyNavbar() {
  const [agentName, setAgentName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAgentData() {
      const response = await fetch("http://localhost:5050/record/");
      if (response.ok) {
        const records = await response.json();
        const email = sessionStorage.getItem("email");
        const agent = records.find((record) => record.email === email);
        if (agent) {
          const { first_name, last_name } = agent;
          setAgentName(`${first_name} ${last_name}`);
        }
      }
    }
    fetchAgentData();
  }, []);

  async function handleLogout() {
    await fetch('http://localhost:5050/logout', { method: 'POST', credentials: 'include' });
    sessionStorage.clear();
    document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/');
  }

  const isLoginPage = location.pathname === "/login";
  const isCreatePage = location.pathname === "/create";
  const isMainPage = location.pathname === "/main";
  const isBloggsPage = location.pathname === "/bloggs";
  const isNetworkPage = location.pathname === "/network";

  let logoStyle = {
    width: "30%", 
  };

  if (isLoginPage || isCreatePage ) {
    logoStyle.width = "50%"; 
  } else if (isMainPage || isBloggsPage || isNetworkPage) {
    logoStyle.width = "40%"; 
  }

  return (
    <div>
      <Navbar expand="lg" bg="light" variant="light">
        <Navbar.Brand as={NavLink} to="/">
          <Image style={logoStyle} src="/images/codebloggs/codebloggs logo2.png" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* Other Nav links here */}
          </Nav>
        </Navbar.Collapse>
        {!(location.pathname === "/" || location.pathname === "/create") && (
          <Dropdown alignRight>
            <Dropdown.Toggle 
              variant="secondary"
              id="dropdown-basic" 
              className="btn"
              style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold', fontStyle: 'italic', borderRadius: '5px' }}
            >
              {agentName} <i className="fas fa-caret-down"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/account-settings">
                Account Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Navbar>
    </div>
  );
}
