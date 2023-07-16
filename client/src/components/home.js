import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Sidebar from './sidebar';
const Main = ({ userId, postID }) => {
  console.log(`Home Page: UserID: ` + userId + ', PostID: ' + postID);
  const [newPostContent, setNewPostContent] = useState("");
  async function handleSubmitPost() {
    console.log(newPostContent);
    try {
      const response = await fetch("http://localhost:5050/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newPostContent, user_id: userId }),
      });
      if (response.ok) {
        console.log("Post submitted successfully");
      } else {
        console.log("Error submitting the post");
      }
    } catch (error) {
      console.log("Error submitting the post:", error);
    }
    setNewPostContent("");
  }
  return (
    <Container fluid style={{ backgroundColor: "#8D88EA", height: "100vh", padding: 0 }}>
      <Sidebar />
      <div style={{ marginLeft: "15%", padding: "20px" }}>
        <h1>Welcome to the Home Page!</h1>
        <h2>UserID: {userId}</h2> {/* Display userId */}
        <h2>PostID: {postID}</h2> {/* Display postID */}
        <Form onSubmit={handleSubmitPost}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter your post"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Submit Post</Button>
        </Form>
      </div>
    </Container>
  );
}
export default Main;