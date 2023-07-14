import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "./sidebar";


const Main = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
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

  // const fetchPosts = async () => {
  //   const response = await fetch("http://localhost:5050/post/");
  //   console.log(response);
  //   if (response.ok) {
  //     const data = await response.json();
  //     setPosts(data.result);
  //     data.result.forEach((post) => {
  //       fetchUser(post.user_id);
  //     });
  //     console.log(data);
  //   } else {
  //     console.error("Failed to fetch posts. Please try again.");
  //   }
  // };

  return (
    <Container fluid style={{ backgroundColor: "#8D88EA", height: "100vh", padding: 0 }}>
      <Row>
        <Col xs={2}>
          <Sidebar />
        </Col>
        <Col xs={10}>
          <div style={{ padding: "20px" }}>
            <h1>Welcome to the network Page!</h1>
            {userData && (
              <Card>
                <Card.Body>
                  <Card.Title>{userData.name}</Card.Title>
                  <Card.Text>
                    <strong>Email:</strong> {userData.email}
                    <br />
                    <strong>first_name:</strong> {userData.first_name}
                    <br />
                    <strong>last_name:</strong> {userData.last_name}
                    <br />
                    <strong>Location:</strong> {userData.location}
                    <br />
                    <strong>birthdate:</strong> {userData.birthdate}
                    <br />
                    <strong>occupation:</strong> {userData.occupation}
                    <br />
                    <strong>status:</strong> {userData.status}
                  </Card.Text>
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