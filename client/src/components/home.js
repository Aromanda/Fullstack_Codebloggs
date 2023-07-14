import React from "react";
import { Container } from "react-bootstrap";
import Sidebar from './sidebar'; 

const Main = (props) => {
  const {userId, postId} = props
    console.log(`This is the user ID: `+userId + postId);
  return (
    <Container fluid style={{ backgroundColor: "#8D88EA", height: "100vh", padding: 0 }}>
      <Sidebar /> {/* here we're including the Sidebar */}
      <div style={{ marginLeft: "15%", padding: "20px" }}>
        <h1>Welcome to the home Page!</h1>
      </div>
    </Container>
  );
}

export default Main;