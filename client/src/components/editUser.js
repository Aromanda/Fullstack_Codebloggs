import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Modal from "react-modal";
import Sidebar from "./sidebar"; // Make sure to provide the correct path to Sidebar.js

export default function Edit() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    // Autres champs à modifier
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:5050/user/${params.id}`
        );

        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const user = await response.json();
        if (!user) {
          window.alert(`User with id ${params.id} not found`);
          navigate("/userManager");
          return;
        }

        setForm(user);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [params.id, navigate]);

  // ...

  async function onSubmit(e) {
    e.preventDefault();
    openConfirmationModal();
  }

  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function openConfirmationModal() {
    setShowConfirmationModal(true);
  }

  function closeConfirmationModal() {
    setShowConfirmationModal(false);
  }

  async function updateUser(id) {
    try {
      await fetch(`http://localhost:5050/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      closeConfirmationModal();
      navigate("/userManager");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {/* Sidebar component */}
      <Sidebar authLevel="admin" />

      {/* Main content */}
      <div style={{ marginLeft: "15%", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div style={{ width: "400px", border: "1px solid #ccc", padding: "20px" }}>
          <h3 style={{ textAlign: "center", color: "red", marginBottom: "20px" }}>Update Agent</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="first_name">First Name: </label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                value={form.first_name}
                onChange={(e) => updateForm({ first_name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name: </label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                value={form.last_name}
                onChange={(e) => updateForm({ last_name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={form.email}
                onChange={(e) => updateForm({ email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Update User"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
        <Modal
          isOpen={showConfirmationModal}
          onRequestClose={closeConfirmationModal}
          contentLabel="Confirmation Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "400px",
              maxWidth: "90%",
              margin: "0 auto",
              marginBottom: "350px",
            },
          }}
        >
          <h2>Confirmer la mise à jour du user</h2>
          <div>
            <button
              onClick={() => {
                updateUser(params.id);
              }}
              style={{
                marginRight: "10px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                backgroundColor: "blue",
                cursor: "pointer",
              }}
            >
              Oui/Confirmer
            </button>
            <button
              onClick={closeConfirmationModal}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                backgroundColor: "red",
                cursor: "pointer",
              }}
            >
              Non/Retour
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
