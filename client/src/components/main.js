import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const Main = () => {
  const linkStyle = {
    fontSize: "20px",
    fontStyle: "italic"
  };

  return (
    <Container fluid style={{ backgroundColor: "#8D88EA", height: "100vh", padding: 0 }}>
      <Navbar bg="light" variant="light" style={{ height: "100%", width: "15%", position: "fixed", zIndex: 1 }}>
        <Nav className="flex-column" style={{ height: "100%" }}>
          <Nav.Link href="#home" style={linkStyle}>Home</Nav.Link>
          <Nav.Link href="#bloggs" style={linkStyle}>Bloggs</Nav.Link>
          <Nav.Link href="#network" style={linkStyle}>Network</Nav.Link>
        </Nav>
      </Navbar>
      <div style={{ marginLeft: "15%", padding: "20px" }}>
        <h1>Welcome to the Main Page!</h1>
      </div>
    </Container>
  );
}

export default Main;
