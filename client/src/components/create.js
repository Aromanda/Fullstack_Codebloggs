import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const Create = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birthdate: "",
    password: "",
    occupation: "",
    location: "",
  });

  const [showCreateModal, setShowCreateModal] = useState(false);

  const updateForm = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCreateModal(true);
  };

  const confirmCreate = async () => {
    const newPerson = { ...form };

    try {
      const response = await fetch("http://localhost:5050/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      });

      if (response.ok) {
        setForm({
          first_name: "",
          last_name: "",
          email: "",
          birthdate: "",
          password: "",
          occupation: "",
          location: "",
        });
        setShowCreateModal(false);
        navigate("/");
        alert("Registration was successful!");
      } else {
        throw new Error("Failed to register.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    setShowCreateModal(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh", backgroundColor: "#000000" }}>
      <div className="card" style={{ width: "40rem", backgroundColor: "#8D88EA" }}>
        <div className="card-body">
          <h3 className="card-title text-center" style={{ fontStyle: "italic", color: "black" }}>
            Registration
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <div className="border p-2" style={{ borderRadius: '5px' }}>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      className="form-control"
                      placeholder="First Name"
                      value={form.first_name}
                      onChange={updateForm}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="border p-2" style={{ borderRadius: '5px' }}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={form.email}
                      onChange={updateForm}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="border p-2" style={{ borderRadius: '5px' }}>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={form.password}
                      onChange={updateForm}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="border p-2" style={{ borderRadius: '5px' }}>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="form-control"
                      placeholder="Location"
                      value={form.location}
                      onChange={updateForm}
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <div className="border p-2" style={{ borderRadius: '5px' }}>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      className="form-control"
                      placeholder="Last Name"
                      value={form.last_name}
                      onChange={updateForm}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="border p-2" style={{ borderRadius: '5px' }}>
                    <input
                      type="date"
                      id="birthdate"
                      name="birthdate"
                      className="form-control"
                      placeholder="Birthdate"
                      value={form.birthdate}
                      onChange={updateForm}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="border p-2" style={{ borderRadius: '5px' }}>
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      className="form-control"
                      placeholder="Occupation"
                      value={form.occupation}
                      onChange={updateForm}
                    />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="form-group d-flex justify-content-center">
            <Button variant="primary" type="submit" style={{ fontSize: "20px", padding: "10px 80px" }}>
              Register
            </Button>
          </div>
        </form>
        <Modal show={showCreateModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Action</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to register?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No/Back
            </Button>
            <Button variant="primary" onClick={confirmCreate}>
              Yes/Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  </div>
);
};

export default Create;
