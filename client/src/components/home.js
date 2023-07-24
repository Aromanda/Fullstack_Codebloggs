// Main.js

import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import Sidebar from './sidebar';
import '../css/main.css';
import { FaThumbsUp } from "react-icons/fa";

// Utility function for fetching posts from the API
async function fetchPosts() {
  try {
    const response = await fetch("http://localhost:5050/post/");
    if (response.ok) {
      const data = await response.json();
      return data.result;
    } else {
      console.log("Failed to fetch posts. Please try again.");
      return [];
    }
  } catch (error) {
    console.log("Error fetching posts:", error);
    return [];
  }
}

const Main = ({ userId }) => {
  const [newPostContent, setNewPostContent] = useState("");
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [commentAuthors, setCommentAuthors] = useState({});
  const [postLikes, setPostLikes] = useState({});
  const [postAuthors, setPostAuthors] = useState({});

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

    const fetchPostsData = async () => {
      const data = await fetchPosts();
      setPosts(data);
      data.forEach((post) => {
        fetchComments(post._id);
        fetchPostAuthor(post.user_id);
        setPostLikes((prevLikes) => ({ ...prevLikes, [post._id]: post.likes }));
      });
    };

    const fetchComments = async (postId) => {
      try {
        const response = await fetch(`http://localhost:5050/comment/${postId}`);
        if (response.ok) {
          const data = await response.json();
          setComments((prevComments) => ({ ...prevComments, [postId]: data.result }));
          data.result.forEach((comment) => fetchCommentAuthor(comment.user_id));
        } else {
          console.log("Failed to fetch comments. Please try again.");
        }
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };

    const fetchPostAuthor = async (postUserId) => {
      try {
        const response = await fetch(`http://localhost:5050/user/${postUserId}`);
        if (response.ok) {
          const data = await response.json();
          setPostAuthors((prevAuthors) => ({ ...prevAuthors, [postUserId]: `${data.first_name} ${data.last_name}` }));
        } else {
          console.log("Failed to fetch post author. Please try again.");
        }
      } catch (error) {
        console.log("Error fetching post author:", error);
      }
    };

    const fetchCommentAuthor = async (commentUserId) => {
      try {
        const response = await fetch(`http://localhost:5050/user/${commentUserId}`);
        if (response.ok) {
          const data = await response.json();
          setCommentAuthors((prevAuthors) => ({ ...prevAuthors, [commentUserId]: `${data.first_name} ${data.last_name}` }));
        } else {
          console.log("Failed to fetch comment author. Please try again.");
        }
      } catch (error) {
        console.log("Error fetching comment author:", error);
      }
    };

    fetchUser();
    fetchPostsData();

    const interval = setInterval(() => {
      fetchUser();
      fetchPostsData();
    }, 5000);

    return () => clearInterval(interval);
  }, [userId]);

  const getInitials = (name) => {
    let initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  };

  async function handleSubmitPost() {
    const timeStamp = new Date().toISOString();
    try {
      const response = await fetch("http://localhost:5050/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newPostContent, user_id: userId, time_stamp: timeStamp }),
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

  const userLikedPost = (postId) => {
    return postLikes[postId] > 0; // Assuming that a positive number of likes means the user has liked the post
  };

  return (
    <Container fluid style={{ backgroundColor: "#8D88EA", height: "100vh", padding: 0 }}>
      <Sidebar />
      <Row className="justify-content-end">
        {/* User Info Container */}
        <Col md={4} className="user-info-col">
          <div className="user-info-container">
            <Row>
              <Col xs={4}>
                <div className="user-avatar">
                  {getInitials(`${user.first_name} ${user.last_name}`)}
                </div>
              </Col>
              <Col xs={6} className="user-details">
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
                  <strong>Auth Level:</strong> {user.auth_level}
                  <br />
                  <strong>Status:</strong> {user.status}
                </Card.Text>
              </Col>
            </Row>
          </div>
        </Col>

        {/* Activity Feed Container */}
        <Col md={4} className="activity-feed-col">
          <br>
          </br>
          <Form onSubmit={e => { e.preventDefault(); handleSubmitPost(); }}>
            <Form.Group controlId="newPostContent">
              <Form.Control as="textarea" rows={3} value={newPostContent} onChange={e => setNewPostContent(e.target.value)} placeholder="What's on your mind?" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Post
            </Button>
          </Form>
          <hr />
          {posts.slice().reverse().map((post) => (
            <Card key={post._id} style={{ marginBottom: '1em' }}>
              <Card.Body>
                <Card.Title>
                  {postAuthors[post.user_id]} <small className="text-muted">{new Date(post.time_stamp).toLocaleDateString()}</small>
                </Card.Title>
                <Card.Text>
                  {post.content}
                </Card.Text>
                <Button variant={userLikedPost(post._id) ? "primary" : "light"} onClick={() => handleLike(post._id)}>
                  <FaThumbsUp /> {postLikes[post._id]}
                </Button>
                {comments[post._id] && comments[post._id].length > 0 && (
                  <div>
                    <h5>Comments</h5>
                    {comments[post._id].map((comment) => (
                      <Card.Text key={comment._id}>
                        {commentAuthors[comment.user_id]}: {comment.content}
                      </Card.Text>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Main;