import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import Sidebar from './sidebar';

const Main = ({ userId }) => {
  const [newPostContent, setNewPostContent] = useState("");
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [postLikes, setPostLikes] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5050/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.log("Error fetching the user details");
        }
      } catch (error) {
        console.log("Error fetching the user details:", error);
      }
    };
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:5050/post/");
      if (response.ok) {
        const data = await response.json();
        setPosts(data.result);
        data.result.forEach((post) => {
          fetchComments(post._id);
          setPostLikes((prevLikes) => ({ ...prevLikes, [post._id]: post.likes }));
        });
      } else {
        console.log("Failed to fetch posts. Please try again.");
      }
    };
    const fetchComments = async (postId) => {
      const response = await fetch(`http://localhost:5050/comment/${postId}`);
      if (response.ok) {
        const data = await response.json();
        setComments((prevComments) => ({ ...prevComments, [postId]: data.result }));
      } else {
        console.log("Failed to fetch comments. Please try again.");
      }
    };
    fetchUser();
    fetchPosts();
  }, [userId]);
  const getInitials = (name) => {
    let initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }
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
  async function handleLike(postId) {
    const response = await fetch(`http://localhost:5050/post/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: postLikes[postId] + 1,
      }),
    });
    if (response.ok) {
      setPostLikes((prevLikes) => ({ ...prevLikes, [postId]: prevLikes[postId] + 1 }));
    }
  }
  return (
    <Container fluid style={{ backgroundColor: "#8D88EA", height: "100vh", padding: 0 }}>
      <Sidebar />
      <Row className="justify-content-end">
        <Col md={7} style={{ marginTop: '2%', marginLeft: '6%',marginRight: '6%', height: '50vh', width: '40%' }}>
          <div style={{ padding: "20px" }}>
            <h1>Welcome to the Home Page!</h1>
            <Row>
              <Col>
                <Card style={{ width: '100%' }}>
                  <Card.Body>
                    <Row>
                      <Col xs={8}>
                        <div style={{
                          backgroundColor: 'black',
                          color: 'white',
                          width: '60px',
                          height: '60px',
                          fontSize: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {getInitials(`${user.first_name} ${user.last_name}`)}
                        </div>
                      </Col>
                      <Col xs={5}>
                        <h3>{`${user.first_name} ${user.last_name}`}</h3>
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
            </Row>
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
        </Col>
        <Col md={4} className="p-4" style={{ backgroundColor: "#bbb", maxHeight: "100vh", overflowY: "auto" }}>
          <h2>Activity Feed</h2>
          {posts.map((post) => (
            <Card key={post._id} className="mb-3">
              <Card.Body>
                <Card.Title>
                  {user.first_name} {user.last_name}
                </Card.Title>
                <Row>
                  <Col md={10}>
                    <Card.Text>{post.content}</Card.Text>
                    <hr />
                    <h5>Comments</h5>
                    {comments[post._id] &&
                      comments[post._id].map((comment) => (
                        <Card.Text key={comment._id}>
                          {comment.content}
                        </Card.Text>
                      ))}
                  </Col>
                  <Col md={2} className="d-flex align-items-start justify-content-center">
                    <Button variant="outline-primary" onClick={() => handleLike(post._id)}>
                      Like {postLikes[post._id]}
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
export default Main;