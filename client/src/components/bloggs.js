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

  return (
    <Container fluid style={{ backgroundColor: "#8D88EA", height: "100vh", padding: 0 }}>
      <Sidebar /> {/* here we're including the Sidebar */}
      <div style={{ marginLeft: "15%", padding: "20px" }}>
        <h1>Welcome to the Blog Page!</h1>
        {/* Map over your posts and display them */}
        {posts.map((post, index) => (
          <div key={index}>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Main;
