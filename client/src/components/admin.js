import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";

const Main = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/userManager");
  };

  return (
    <Container fluid style={{ backgroundColor: "#8D88EA", height: "100vh", padding: 0 }}>
      <Row>
        <Col md={2} style={{ padding: 0 }}>
          <Sidebar authLevel="admin" />
        </Col>
        <Col md={10} style={{ marginLeft: "15%", padding: "20px" }}>
          <h1>Welcome to the Admin Page!</h1>
          <Row>
            <Col md={6} style={{ marginBottom: "20px" }}>
              <Card onClick={handleClick} style={{ cursor: "pointer" }}>
                <Card.Body>
                  <Card.Title>User Manager</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Admin access only</Card.Subtitle>
                  <Card.Text></Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} style={{ marginBottom: "20px" }}>
              <Card onClick={handleClick} style={{ cursor: "pointer" }}>
                <Card.Body>
                  <Card.Title>Content Manager</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Admin access only</Card.Subtitle>
                  <Card.Text></Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
