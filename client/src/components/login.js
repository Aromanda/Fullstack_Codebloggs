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
      const response = await fetch("http://localhost:5050/session/session/", {
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

      console.log(data); // This should now include the userId
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('token', data.data.token); // Sets the user_id in sessionStorage
      toast.success("Logged in successfully!");
  
      setTimeout(() => {
        navigate("/home");
      }, 5000); 
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black' }}>
      <Card style={{ width: '40rem', padding: '40px', backgroundColor: '#8D88EA' }}>
        <Card.Title style={{ color: 'black', textAlign: 'center', fontSize: '30px' }}>Login</Card.Title>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                style={{ fontStyle: 'italic', fontWeight: 'bold', textAlign: 'center' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                style={{ fontStyle: 'italic', fontWeight: 'bold', textAlign: 'center' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ width: '100%', fontSize: '20px' }}>
              Submit
            </Button>

            <Button variant="link" onClick={() => navigate("/create")} style={{ display: 'block', textAlign: 'center', marginTop: '10px', color: 'red', fontSize: '20px' }}>
              Not a member? Register now
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <ToastContainer style={{ zIndex: 9999 }} />
    </div>
  );
}
