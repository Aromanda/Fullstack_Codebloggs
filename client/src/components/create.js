import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const Create = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    region: "",
    rating: "",
    fee: "",
    sales: 0,
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
          region: "",
          rating: "",
          fee: "",
          sales: 0,
        });
        setShowCreateModal(false);
        navigate("/admin/record");
        alert("Agent successfully created!"); // Show the alert
      } else {
        throw new Error("Failed to create agent.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const handleClose = () => {
    setShowCreateModal(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card" style={{ width: "40rem" }}>
        <div className="card-body">
          <h3 className="card-title" style={{ fontStyle: "italic", color: "red" }}>
            Create New Agent
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="form-control"
                value={form.first_name}
                onChange={updateForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="form-control"
                value={form.last_name}
                onChange={updateForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={updateForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="region">Region:</label>
              <input
                type="text"
                id="region"
                name="region"
                className="form-control"
                value={form.region}
                onChange={updateForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <input
                type="text"
                id="rating"
                name="rating"
                className="form-control"
                value={form.rating}
                onChange={updateForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fee">Fee:</label>
              <input
                type="text"
                id="fee"
                name="fee"
                className="form-control"
                value={form.fee}
                onChange={updateForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="sales">Sales:</label>
              <input
                type="number"
                id="sales"
                name="sales"
                className="form-control"
                value={form.sales}
                onChange={updateForm}
              />
            </div>
            <br />
            <div className="form-group">
              <Button variant="primary" type="submit">
                Create Agent
              </Button>
            </div>
          </form>
          <Modal show={showCreateModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Action</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to create this agent?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                No/Back
              </Button>
              <Button variant="primary" onClick={confirmCreate}>
                Yes/Confirm
              </Button>
            </Modal.Footer>
          </Modal>
          <br />
          <button
            onClick={() => {
              navigate("/admin/record");
            }}
            className="btn btn-secondary"
          >
            Go back to list of agents
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
