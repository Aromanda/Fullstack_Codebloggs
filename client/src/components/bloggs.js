import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Sidebar from './sidebar';

const Main = () => {
  const [inputValue, setInputValue] = useState(""); // State to hold the input value

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update the input value
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/comment/", { // Assuming you have a route or endpoint at "/comment" for handling the comment submission
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: inputValue }), // Align the field name with the server-side schema
      });
      console.log(response);
      if (response.ok) {
        console.log("Comment submitted successfully!");
        setInputValue(""); // Clear the input field
      } else {
        console.log("Failed to submit comment. Please try again.");
      }
    } catch (error) {
      console.log("Error submitting comment:", error);
    }
  };

  return (
    <Container fluid style={{ backgroundColor: "#8D88EA", height: "100vh", padding: 0 }}>
      <Sidebar /> {/* Here we're including the Sidebar */}
      <div style={{ marginLeft: "15%", padding: "20px" }}>
        <h1>Welcome to the Bloggs Page!</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter your text"
              value={inputValue}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </Container>
  );
}

export default Main;
