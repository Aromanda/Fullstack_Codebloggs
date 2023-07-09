import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/session/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.status === 400) {
        toast.error("Invalid email or password");
        throw new Error("Invalid email or password");
      }

      const data = await response.json();

      console.log(data);
      sessionStorage.setItem('email', email);
      toast.success("Logged in successfully!");

      setTimeout(() => {
        navigate("/main");
      }, 5000); 
    } catch (error) {
      console.error(error);
      toast.error(error.message);

      setTimeout(() => {
        navigate("/error");
      }, 5000); 
    }
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '40rem', padding: '40px' }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontStyle: 'italic', color: 'red', fontSize: '20px' }}>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted" style={{ fontStyle: 'italic', fontSize: '16px' }}>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ fontStyle: 'italic', color: '#0a65a0', fontSize: '20px' }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <ToastContainer style={{ zIndex: 9999 }} />
    </div>
  );
}
