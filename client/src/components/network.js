import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import Sidebar from './sidebar'; 

const Main = () => {
  return (
    <Container fluid style={{ backgroundColor: "#8D88EA", height: "100vh", padding: 0 }}>
      <Row>
        <Col xs={2}>
          <Sidebar /> {/* here we're including the Sidebar */}
        </Col>
        <Col xs={10}>
          <div style={{ padding: "20px" }}>
            <h1>Welcome to the network Page!</h1>
            <Row xs={1} md={2} className="g-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Col key={idx}>
                  <Card>
                    <Card.Img variant="top" src="" />
                    <Card.Body>
                      <Card.Title>USER CARD</Card.Title>
                      <Card.Text>
                        This is a longer card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit
                        longer.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Main;