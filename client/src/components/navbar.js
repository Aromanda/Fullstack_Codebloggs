import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Dropdown, Button, Modal, Form, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Cookies from "js-cookie";

export default function MyNavbar(props) {
  const { userId } = props;
  const [agentName, setAgentName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [showAccountSettingsModal, setShowAccountSettingsModal] = useState(false);

  // Define styles
  const logoStyle = {
    width: "30%",
    cursor: "pointer",
  };

  const postButtonStyle = {
    backgroundColor: "#8D88EA",
    color: "white",
    fontSize: "20px",
    padding: "10px 120px",
    marginRight: "auto",
  };

  const modalContainerStyle = {
    backgroundColor: "#F8F9FA",
  };

  const submitButtonStyle = {
    backgroundColor: "black",
    color: "white",
  };

  useEffect(() => {
    async function fetchAgentData() {
      const response = await fetch("http://localhost:5050/user/");
      if (response.ok) {
        const records = await response.json();
        const email = sessionStorage.getItem("email");
        const agent = records.find((record) => record.email === email);
        if (agent) {
          const { first_name, last_name, user_id } = agent;
          setAgentName(`${first_name} ${last_name}`);
          sessionStorage.setItem("user_id", user_id);
        }
      }
    }
    fetchAgentData();
  }, []);

  const handleLogoClick = () => {
    if (location.pathname === "/" || location.pathname === "/create") {
      return; // Do nothing when on the "/" or "/create" path
    }
    navigate("/home"); // Redirect to "/home" for other paths
  };

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  const handlePostContentChange = (event) => setNewPostContent(event.target.value);

  async function handleLogout() {
    sessionStorage.clear();
    Cookies.remove("connect.sid");
    document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  }

  const handleAccountSettings = () => {
    setShowAccountSettingsModal(true);
  };

  const handleAccountSettingsClose = () => {
    setShowAccountSettingsModal(false);
  };

  const handleSaveChanges = () => {
    // Perform actions to save the changes here
    alert("Settings updated successfully!");
    setShowAccountSettingsModal(false); // Close the modal after saving changes
  };

  async function handleSubmitPost() {
    console.log(newPostContent);
    try {
      const response = await fetch("http://localhost:5050/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newPostContent, user_id: userId }),
      });
      if (response.ok) {
        console.log("Post submitted successfully");
      } else {
        console.log("Error submitting the post");
      }
    } catch (error) {
      console.log("Error submitting the post:", error);
    }
    handleModalClose();
    setNewPostContent("");
  }

  const isHomePage = location.pathname === "/home";

  if (isHomePage) {
    logoStyle.width = "30%";
  } else {
    logoStyle.width = "40%";
  }

  return (
    <div>
      <Navbar expand="lg" bg="light" variant="light" style={{ display: "flex", justifyContent: "space-between" }}>
        <Navbar.Brand onClick={handleLogoClick}>
          <Image style={logoStyle} src="/rocketElevators/codebloggs logo2.png" alt="Logo" />
        </Navbar.Brand>
        {!(location.pathname === "/" || location.pathname === "/create") && (
          <Button style={postButtonStyle} onClick={handleModalOpen}>
            Post
          </Button>
        )}
        {!(location.pathname === "/" || location.pathname === "/create") && (
          <Dropdown alignRight>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className="btn"
              style={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
                fontStyle: "italic",
                borderRadius: "5px",
              }}
            >
              {agentName} <i className="fas fa-caret-down"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleAccountSettings}>Account Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Blog something</Modal.Title>
          </Modal.Header>
          <Modal.Body style={modalContainerStyle}>
            <Form.Control as="textarea" rows={3} value={newPostContent} onChange={handlePostContentChange} />
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

        {/* Account Settings Modal */}
        <Modal show={showAccountSettingsModal} onHide={handleAccountSettingsClose}>
          <Modal.Header closeButton>
            <Modal.Title>Account Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Here you can update your account settings!</p>
            {/* Add your account settings form or options here */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAccountSettingsClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Navbar>
    </div>
  );
}