import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button, Spinner, Modal } from "react-bootstrap";

const Main = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [postLikes, setPostLikes] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchFromDate, setSearchFromDate] = useState("");
  const [searchToDate, setSearchToDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch("http://localhost:5050/post/");
      if (response.ok) {
        const data = await response.json();
        const postsWithTimestamp = data.result.map((post) => ({
          ...post,
          timestamp: new Date(post.time_stamp),
        }));
        setPosts(postsWithTimestamp);
        postsWithTimestamp.forEach((post) => {
          fetchComments(post._id);
          fetchUser(post.user_id);
          setPostLikes((prevLikes) => ({ ...prevLikes, [post._id]: post.likes }));
        });
        setIsLoading(false);
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

    const fetchUser = async (userId) => {
      const response = await fetch(`http://localhost:5050/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUsers((prevUsers) => ({ ...prevUsers, [userId]: data }));
      } else {
        console.error(`Failed to fetch user with ID ${userId}. Please try again.`);
      }
    };

    fetchPosts();
  }, [userId]);

  async function handleDelete(postId) {
    setPostToDelete(postId);
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  };

  async function handleDeleteConfirmed() {
    closeModal();
    const response = await fetch(`http://localhost:5050/post/${postToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postToDelete));
      setPostToDelete(null);
      window.alert("Post successfully deleted!");
    } else {
      console.error("Failed to delete the post. Please try again.");
    }
  }

  const handleSearch = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const fromDate = new Date(searchFromDate);
    fromDate.setUTCHours(0, 0, 0, 0); // Set time to 00:00:00 in UTC
    const toDate = new Date(searchToDate);
    toDate.setUTCHours(23, 59, 59, 999); // Set time to 23:59:59.999 in UTC

    const filteredPosts = posts.filter((post) => {
      const postDate = new Date(post.timestamp);
      return postDate >= fromDate && postDate <= toDate;
    });

    setCurrentPage(1);
    setPosts(filteredPosts);
    setIsLoading(false);
  };

  const paginate = async (pageNumber) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCurrentPage(pageNumber);
    setIsLoading(false);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Container fluid style={{ backgroundColor: "#8D88EA", height: "100vh", padding: 0 }}>
      <Row className="justify-content-center">
        <Col md={6} className="p-4" style={{ backgroundColor: "#bbb", maxHeight: "100vh", overflowY: "auto" }}>
          <h2>Activity Feed</h2>
          <div className="mb-3">
            <label htmlFor="fromDate">From:</label>
            <input
              type="date"
              id="fromDate"
              value={searchFromDate}
              onChange={(e) => setSearchFromDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="toDate">To:</label>
            <input
              type="date"
              id="toDate"
              value={searchToDate}
              onChange={(e) => setSearchToDate(e.target.value)}
            />
          </div>
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
          {isLoading ? (
            <div className="text-center" style={{ backgroundColor: "#bbb", maxHeight: "100vh", overflowY: "auto" }}>
              <Spinner animation="border" />
              <h3>Loading...</h3>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center">No posts found.</div>
          ) : (
            currentPosts.map((post) => (
              <Card key={post._id} className="mb-3">
                <Card.Header>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: "grey",
                          color: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "10px",
                        }}
                      >
                        {users[post.user_id] ? `${users[post.user_id].first_name[0]}${users[post.user_id].last_name[0]}` : "??"
                        }
                      </div>
                      <span style={{ fontWeight: "bold" }}>
                        {users[post.user_id]
                          ? `${users[post.user_id].first_name} ${users[post.user_id].last_name}`
                          : "Fetching user..."}
                      </span>
                    </div>
                    <span>{post.timestamp.toISOString().split("T")[0]}</span>
                  </div>
                </Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>{post.content}</p>
                    <footer className="blockquote-footer">
                      {comments[post._id] &&
                        comments[post._id].map((comment, i, arr) => (
                          <React.Fragment key={comment._id}>
                            <cite>{comment.content}</cite>
                            {i < arr.length - 1 && ", "}
                          </React.Fragment>
                        ))}
                    </footer>
                  </blockquote>
                </Card.Body>
                <Card.Footer>
                  <Button variant="outline-primary" disabled>
                    Like {postLikes[post._id]}
                  </Button>
                  <Button variant="outline-danger" className="ml-2" onClick={() => handleDelete(post._id)}>
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            ))
          )}
          {!isLoading && posts.length > 0 && (
            <nav>
              <ul className="pagination">
                {Array(Math.ceil(posts.length / postsPerPage))
                  .fill()
                  .map((_, i) => (
                    <li key={i} className="page-item">
                      <a onClick={() => paginate(i + 1)} className="page-link">
                        {i + 1}
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
          )}
        </Col>
      </Row>
      {/* Modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmed}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Main;