import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Modal from "react-modal";

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
          navigate("/userList");
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

  // ...

  // Cette méthode mettra à jour l'enregistrement de l'utilisateur dans la base de données
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
      navigate("/userList"); // Rediriger vers la liste des utilisateurs après la mise à jour
    } catch (error) {
      console.error(error);
    }
  }

  // ...

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      {/* ... */}
      <form onSubmit={onSubmit}>
        {/* ... */}
        <div className="form-group">
          <input type="submit" value="Update Agent" className="btn btn-primary" />
        </div>
      </form>
      {/* ... */}
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
        {/* ... */}
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
        {/* ... */}
      </Modal>
    </div>
  );
}
