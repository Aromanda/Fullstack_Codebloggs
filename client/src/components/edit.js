import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Modal } from "react-bootstrap";

export default function Edit() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    region: "",
    rating: "",
    fee: "",
    sales: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:5050/record/${params.id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  function updateForm(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    setShowModal(true);
    setConfirmAction(() => confirmUpdate);
  }

  async function confirmUpdate() {
    const editedPerson = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      region: form.region,
      rating: form.rating,
      fee: form.fee,
    };

    try {
      const response = await fetch(`http://localhost:5050/record/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(editedPerson),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setShowModal(false);
        navigate("/admin/record");
        alert("Agent successfully edited!"); // Show the alert
      } else {
        throw new Error("Failed to edit agent.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="card" style={{ width: "40rem" }}>
        <div className="card-body">
          <h3 className="card-title" style={{ fontStyle: "italic", color: "red", fontSize: "30px" }}>
            Update Agents
          </h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={form.first_name}
                onChange={updateForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={form.last_name}
                onChange={updateForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={form.email}
                onChange={updateForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="region">Region:</label>
              <input
                type="text"
                className="form-control"
                id="region"
                name="region"
                value={form.region}
                onChange={updateForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <input
                type="text"
                className="form-control"
                id="rating"
                name="rating"
                value={form.rating}
                onChange={updateForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fee">Fee:</label>
              <input
                type="text"
                className="form-control"
                id="fee"
                name="fee"
                value={form.fee}
                onChange={updateForm}
              />
            </div>
            <Button className="btn btn-primary" type="submit" onClick={onSubmit}>
              Submit
            </Button>
          </form>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to continue?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No/Back
          </Button>
          <Button variant="primary" onClick={confirmAction}>
            Yes/Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
