import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Dropdown, Button, Modal, Form, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export default function MyNavbar() {
  const [agentName, setAgentName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");

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

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handlePostContentChange = (event) => setNewPostContent(event.target.value);

  async function handleLogout() {
    await fetch('http://localhost:5050/logout', { method: 'POST', credentials: 'include' });
    sessionStorage.clear();
    document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/');
  }

  async function handleSubmitPost() {
    // Handle the submission of the new post here
    // After submitting, close the modal and clear the post content
    handleModalClose();
    setNewPostContent("");
  }

  const isLoginPage = location.pathname === "/login";
  const isCreatePage = location.pathname === "/create";
  const isMainPage = location.pathname === "/main";
  const isBloggsPage = location.pathname === "/bloggs";
  const isNetworkPage = location.pathname === "/network";

  let logoStyle = {
    width: "30%", 
  };

  if (isLoginPage || isCreatePage) {
    logoStyle.width = "50%"; 
  } else if (isMainPage || isBloggsPage || isNetworkPage) {
    logoStyle.width = "40%"; 
  }

  const postButtonStyle = {
    backgroundColor: "#8D88EA",
    color: "white",
    fontSize: "20px",
    padding: "10px 120px",
    marginRight: "auto"
  };

  const modalContainerStyle = {
    backgroundColor: "#f8f9fa" // Set the desired container color here
  };

  const submitButtonStyle = {
    backgroundColor: "black",
    color: "white"
  };

  return (
    <div>
      <Navbar expand="lg" bg="light" variant="light" style={{ display: "flex", justifyContent: "space-between" }}>
        <Navbar.Brand as={NavLink} to="/">
          <Image style={logoStyle} src="/images/codebloggs/codebloggs logo2.png" alt="Logo" />
        </Navbar.Brand>
        <Button style={postButtonStyle} onClick={handleModalOpen}>
          Post
        </Button>
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
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Blog something</Modal.Title>
          </Modal.Header>
          <Modal.Body style={modalContainerStyle}>
            <Form.Control
              as="textarea"
              rows={3}
              value={newPostContent}
              onChange={handlePostContentChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmitPost} style={submitButtonStyle}>
              Submit Post
            </Button>
          </Modal.Footer>
        </Modal>
      </Navbar>
    </div>
  );
}
