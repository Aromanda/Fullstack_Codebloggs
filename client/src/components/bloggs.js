import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Badge } from "react-bootstrap";
import Sidebar from './sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
const Main = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [comments, setComments] = useState({});
  const [users, setUsers] = useState({});
    const handleSubmit = async (e, postId) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5050/comment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: e.target.elements.comment.value,
          user_id: userId,
          post_id: postId, // Pass the correct post ID here
        }),
      });
      if (response.ok) {
        fetchComments(postId);
        e.target.reset(); // Reset the comment input field
      } else {
        console.error("Failed to submit comment. Please try again.");
      }
    };
  const fetchPosts = async () => {
    const response = await fetch("http://localhost:5050/post/");
    if (response.ok) {
      const data = await response.json();
      setPosts(data.result);
      data.result.forEach((post) => {
        fetchUser(post.user_id);
        fetchComments(post._id);
      });
    } else {
      console.error("Failed to fetch posts. Please try again.");
    }
  };
  const fetchUser = async (userId) => {
    const response = await fetch(`http://localhost:5050/user/${userId}`);
    if (response.ok) {
      const data = await response.json();
      setUsers((prevUsers) => ({ ...prevUsers, [userId]: data }));
    } else {
      console.error(`Failed to fetch user with ID ${userId}. Please try again.`);
    }
  };
  const fetchComments = async (postId) => {
    const response = await fetch(`http://localhost:5050/comment/${postId}`);
    if (response.ok) {
      const data = await response.json();
      setComments((prevComments) => ({ ...prevComments, [postId]: data.result }));
    } else {
      console.error("Failed to fetch comments. Please try again.");
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <Container fluid style={{ backgroundColor: "#8D88EA", height: "100vh", padding: 0 }}>
      <Sidebar />
      <div style={{ marginLeft: "15%", padding: "20px" }}>
        <h1>The Bloggs !</h1>
        {posts.map((post) => (
          <div key={post._id}>
            <br />
            <Card>
              {/* Post content */}
              <Card.Body>
                <Card.Text className="text-center" style={{ fontSize: "30px" }}>
                  {post.content}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {users[post.user_id]
                      ? <Badge pill style={{ backgroundColor: 'black', color: 'white', width: '60px', height: '60px', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {`${users[post.user_id].first_name.charAt(0)}${users[post.user_id].last_name.charAt(0)}`}
                      </Badge>
                      : 'Fetching user...'
                    }
                  </div>
                  <Button variant="primary">
                    <FontAwesomeIcon icon={faThumbsUp} /> {post.likes}
                  </Button>
                </div>
              </Card.Body>
              {/* Comment section */}
              <Card.Footer>
                <Form onSubmit={(e) => handleSubmit(e, post._id)}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Enter your comment"
                      name="comment"
                    />
                  </Form.Group>
                  <Button type="submit">Post Comment</Button>
                </Form>
                {comments[post._id] &&
                  comments[post._id].map((comment) => (
                    <Card.Text key={comment._id} className="text-center">
                      {comment.content}
                    </Card.Text>
                  ))}
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};
export default Main;
