import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';

const Main = () => {
  const navigate = useNavigate();

  const navigateToUserManager = () => {
    navigate("/userManager");
  };

  const navigateToContentManager = () => {
    navigate("/contentmanager");
  };

  return (
    <Container fluid style={{ backgroundColor: '#8D88EA', height: '100vh', padding: 0 }}>
      <Sidebar />
      <div style={{ marginLeft: '15%', padding: '20px' }}>
        <h1>Welcome to the Admin Page!</h1>
        <Row>
          <Col md={6} style={{ marginBottom: '20px' }}>
            <Card onClick={navigateToUserManager} style={{ cursor: 'pointer' }}>
              <Card.Body>
                <Card.Title>User Manager</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Admin access only</Card.Subtitle>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} style={{ marginBottom: '20px' }}>
            <Card onClick={navigateToContentManager} style={{ cursor: 'pointer' }}>
              <Card.Body>
                <Card.Title>Content Manager</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Admin access only</Card.Subtitle>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Main; 