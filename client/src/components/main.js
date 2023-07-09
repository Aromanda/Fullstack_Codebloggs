import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Main = ({ handleLogout }) => {
  const navigate = useNavigate();

  return (
    <Container fluid>
      <Row className="justify-content-md-center mt-5">
        <Col md="4">
          <Card>
            <Card.Body>
              <Card.Title>List of Agents</Card.Title>
              <Card.Text>
                Meet the elite: a lineup of exceptional agents ready to tackle any mission with unmatched expertise
              </Card.Text>
              <Button onClick={() => navigate("/admin/record")}>View Agents</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <Card.Body>
              <Card.Title>Transaction per Agents</Card.Title>
              <Card.Text>
                Unleashing the Sales Force: Explore a world where agents dominate markets, closing deals with unrivaled finesse
              </Card.Text>
              <Button onClick={() => navigate("/transactions")}>View Transactions</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <Card.Body>
              <Card.Title>Graph of the total transactions</Card.Title>
              <Card.Text>
              The Transaction Graph: A visual symphony illustrating the pulsating rhythm of global economic exchanges.
              </Card.Text>
              <Button onClick={() => navigate("/graph")}>Graph</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5">
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </Row>
    </Container>
  );
}

export default Main;
