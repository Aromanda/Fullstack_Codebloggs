import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "./sidebar";
import "../css/network.css"

const Main = ({ userId }) => {
  const [userData, setUserData] = useState([]);
  const [userPostData, setUserPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
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
  
  useEffect(() => {
    if (userData.length > 0) {
      const posts = userData.map(async user => {
        try {
          const response = await fetch(`http://localhost:5050/post/${user._id}`);
          if (response.ok) {
            const data = await response.json();
            data.result.sort((a, b) => new Date(b.time_stamp) - new Date(a.time_stamp));
            return { ...user, lastPost: data.result[0] };
          } else {
            console.error(`Failed to fetch posts for user ${user._id}. Please try again.`);
            return user;
          }
        } catch (error) {
          console.error(error);
          return user;
        }
      });
      Promise.all(posts)
        .then(results => setUserPostData(results))
        .catch(error => console.error(error))
        .finally(() => setIsLoading(false));
    }
  }, [userData]);
  
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
              {userPostData.map((user) => (
                <Col key={user._id} xs={12} sm={6} md={4} style={{ marginBottom: "20px" }}>
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
                          <h4>Last Post</h4>
                          {isLoading ? (
                            <p>Loading...</p>
                          ) : (
                            <>
                              {user.lastPost ? (
                                <Card.Text>
                                  <strong>Timestamp:</strong> {user.lastPost.time_stamp}
                                  <br />
                                  <strong>Content:</strong> {user.lastPost.content}
                                </Card.Text>
                              ) : (
                                <p>No post available.</p>
                              )}
                            </>
                          )}
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