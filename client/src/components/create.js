import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    birthday: "",
    email: "",
    password: "",
    status: "",
    location: "",
    occupation: "",
    auth_level: "basic"
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const updateForm = (e) => {
    const { name, value } = e.target;
    if(name === "auth_level"){
      setForm((prevForm) => ({
        ...prevForm,
        [name]: e.target.checked ? "admin" : "basic",
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value.slice(0, 30),
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCreateModal(true);
  };
  const confirmCreate = async () => {
    const newPerson = { ...form };
    console.log(newPerson)
    try {
      const response = await fetch("http://localhost:5050/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      });
    console.log(response.ok)
      if (response.ok) {
        setForm({
          first_name: "",
          last_name: "",
          birthday: "",
          email: "",
          password: "",
          status: "",
          location: "",
          occupation: "",
          auth_level: "basic"
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
            {/* hidden input field added here */}
            <input
              type="checkbox"
              id="admin_auth"
              name="auth_level"
              style={{display: 'none'}}
              onChange={updateForm}
            />
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <div className="border p-2" style={{ borderRadius: '5px' }}>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      className="form-control"
                      placeholder="First Name*"
                      style={{ fontStyle: "italic", fontWeight: "bold" }}
                      value={form.first_name}
                      onChange={updateForm}
                      maxLength={30}
                      required
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
                      placeholder="Email*"
                      style={{ fontStyle: "italic", fontWeight: "bold" }}
                      value={form.email}
                      onChange={updateForm}
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      title="Please enter a valid email address"
                      required
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
                      placeholder="Password*"
                      style={{ fontStyle: "italic", fontWeight: "bold" }}
                      value={form.password}
                      onChange={updateForm}
                      required={true}
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
                      placeholder="Location*"
                      style={{ fontStyle: "italic", fontWeight: "bold" }}
                      value={form.location}
                      onChange={updateForm}
                      maxLength={20}
                      required
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
                      placeholder="Last Name*"
                      style={{ fontStyle: "italic", fontWeight: "bold" }}
                      value={form.last_name}
                      onChange={updateForm}
                      maxLength={20}
                      required
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
                      placeholder="Birthdate*"
                      style={{ fontStyle: "italic", fontWeight: "bold" }}
                      value={form.birthdate}
                      onChange={updateForm}
                      required
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
                      style={{ fontStyle: "italic", fontWeight: "bold" }}
                      value={form.occupation}
                      onChange={updateForm}
                      maxLength={20}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="border p-2" style={{ borderRadius: '5px' }}>
                    <input
                      type="status"
                      id="status"
                      name="status"
                      className="form-control"
                      placeholder="Status*"
                      style={{ fontStyle: "italic", fontWeight: "bold" }}
                      value={form.status}
                      onChange={updateForm}
                      title=""
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-dark btn-block">
              Submit
            </button>
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