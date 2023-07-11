<<<<<<< HEAD
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Sidebar from './sidebar';

const Main = () => {
  const [inputValue, setInputValue] = useState(""); // State to hold the input value

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update the input value
  };
console.log("1");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("2");
    try {
      const response = await fetch("http://localhost:5050/comment/", { // Assuming you have a route or endpoint at "/comment" for handling the comment submission
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: inputValue }), // Align the field name with the server-side schema
      });
      console.log(response);
      console.log("3");
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

=======
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Sidebar from './sidebar'; 

const Main = () => {
  const [posts, setPosts] = useState([]); // Initialize state to hold your posts

  // Define your function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5050/post");
      console.log(response.ok)
      if(response.ok){
        const data = await response.json();
        setPosts(data); // Update your state with the fetched data
      }else{
        throw new Error('Error while fetching posts');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Use useEffect to call your fetchData function when the component mounts
  useEffect(() => {
    fetchData();
  }, []); 

>>>>>>> 1b65f8aef2e447d9f9e7da08a08953c20a660274
  return (
    <Container fluid style={{ backgroundColor: "#8D88EA", height: "100vh", padding: 0 }}>
      <Sidebar /> {/* Here we're including the Sidebar */}
      <div style={{ marginLeft: "15%", padding: "20px" }}>
<<<<<<< HEAD
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
=======
        <h1>Welcome to the Blog Page!</h1>
        {/* Map over your posts and display them */}
        {posts.map((post, index) => (
          <div key={index}>
            <p>{post.content}</p>
          </div>
        ))}
>>>>>>> 1b65f8aef2e447d9f9e7da08a08953c20a660274
      </div>
    </Container>
  );
}

export default Main;
