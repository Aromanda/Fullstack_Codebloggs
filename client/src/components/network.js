import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "./sidebar";
const Main = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5050/user/${userId}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [userId]);
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
        <Col xs={4}>
          <div style={{ padding: "20px" }}>
            <h1>Welcome to the network Page!</h1>
            {userData && (
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
                        {getInitials(`${userData.first_name} ${userData.last_name}`)}
                      </div>
                    </Col>
                    <Col xs={4}>
                      <h3>{userData.name}</h3>
                      <Card.Text>
                        <strong>Email:</strong> {userData.email}
                        <br />
                        <strong>First Name:</strong> {userData.first_name}
                        <br />
                        <strong>Last Name:</strong> {userData.last_name}
                        <br />
                        <strong>Location:</strong> {userData.location}
                        <br />
                        <strong>Birthdate:</strong> {userData.birthdate}
                        <br />
                        <strong>Occupation:</strong> {userData.occupation}
                        <br />
                        <strong>Status:</strong> {userData.status}
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Main;