import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "./sidebar";
const Main = ({ userId }) => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5050/user/");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);
  const getInitials = (name) => {
    if (!name) {
      return "";
    }
    const names = name.split(" ");
    const initials = names
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase();
    return initials;
  };
  return (
    <Container fluid style={{ backgroundColor: "#8D88EA", height: "100vh", padding: 0 }}>
      <Row>
        <Col xs={2}>
          <Sidebar />
        </Col>
        <Col xs={10}>
          <div style={{ padding: "20px" }}>
            <h1>Welcome to the network Page!</h1>
            <Row>
              {userData.map((user) => (
                <Col key={user.id} xs={4} style={{ marginBottom: "20px" }}>
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col xs={2} style={{ display: "flex", alignItems: "center" }}>
                          <div
                            style={{
                              backgroundColor: "black",
                              color: "white",
                              width: "60px",
                              height: "60px",
                              fontSize: "20px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "50%",
                              marginRight: "20px",
                            }}
                          >
                            {getInitials(`${user.first_name} ${user.last_name}`)}
                          </div>
                        </Col>
                        <Col xs={10}>
                          <h3>{user.name}</h3>
                          <Card.Text>
                            <strong>Email:</strong> {user.email}
                            <br />
                            <strong>First Name:</strong> {user.first_name}
                            <br />
                            <strong>Last Name:</strong> {user.last_name}
                            <br />
                            <strong>Location:</strong> {user.location}
                            <br />
                            <strong>Birthdate:</strong> {user.birthdate}
                            <br />
                            <strong>Occupation:</strong> {user.occupation}
                            <br />
                            <strong>Status:</strong> {user.status}
                          </Card.Text>
                        </Col>
                      </Row>
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
};
export default Main;