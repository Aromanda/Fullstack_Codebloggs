import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "./sidebar";
import "../css/network.css";

const Main = ({ userId }) => {
  const [userData, setUserData] = useState([]);
  const [userLastPosts, setUserLastPosts] = useState({});
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

  useEffect(() => {
    if (userData.length > 0) {
      const fetchLastPosts = async () => {
        const lastPosts = {};
        for (const user of userData) {
          try {
            const response = await fetch(`http://localhost:5050/post?user_id=${user._id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.ok) {
              const data = await response.json();
              console.log(`User ${user._id} posts:`, data); // Log the data received
              if (!Array.isArray(data.result)) {
                console.warn(`Invalid data format for user ${user._id}. Expected an array.`);
                lastPosts[user._id] = null;
              } else {
                const validPosts = data.result.filter((post) => post.content && post.user_id === user._id);
                validPosts.sort((a, b) => new Date(b.time_stamp) - new Date(a.time_stamp));
                lastPosts[user._id] = validPosts.length > 0 ? validPosts[0] : null;
              }
            } else {
              console.error(`Failed to fetch posts for user ${user._id}. Please try again.`);
              lastPosts[user._id] = null;
            }
          } catch (error) {
            console.error(error);
            lastPosts[user._id] = null;
          }
        }
        setUserLastPosts(lastPosts);
        setIsLoading(false);
      };

      fetchLastPosts();
    }
  }, [userData]);

  const getInitials = (name) => {
    if (!name) {
      return "";
    }
    const names = name.split(" ");
    const initials = names.map((n) => n.charAt(0)).join("").toUpperCase();
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
                              {userLastPosts[user._id] ? (
                                <Card.Text>
                                  <strong>Timestamp:</strong> {userLastPosts[user._id].time_stamp}
                                  <br />
                                  <strong>Content:</strong> {userLastPosts[user._id].content}
                                </Card.Text>
                              ) : (
                                <p>No content yet!</p>
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