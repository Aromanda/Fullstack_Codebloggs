import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Sidebar from "./sidebar";

const User = (props) => (
  <tr>
    <td>{props.user.first_name}</td>
    <td>{props.user.last_name}</td>
    <td>
      <Link className="btn btn-link" to={`/editManager/${props.user._id}`}>
        Edit
      </Link>{" "}
      |
      <button className="btn btn-link" onClick={() => props.deleteUser()}>
        Delete
      </button>
    </td>
  </tr>
);

export default function UserManager() {
  const [Users, setUsers] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // This method fetches the Users from the database.
  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`http://localhost:5050/user/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const Users = await response.json();
      setUsers(Users);
    }

    getUsers();

    return;
  }, [Users.length]);

  // This method will delete a user
  async function deleteUser(_id) {
    await fetch(`http://localhost:5050/user/${_id}`, {
      method: "DELETE",
    });

    const newUsers = Users.filter((el) => el._id !== _id);
    setUsers(newUsers);
  }

  // Fonction pour ouvrir le modal de confirmation
  function openConfirmationModal(user) {
    setSelectedUser(user);
    setShowConfirmationModal(true);
  }

  // Fonction pour fermer le modal de confirmation
  function closeConfirmationModal() {
    setSelectedUser(null);
    setShowConfirmationModal(false);
  }

  // This method will map out the Users on the table
  function userList() {
    return Users.map((user) => {
      return (
        <User
          user={user}
          deleteUser={() => openConfirmationModal(user)}
          key={user._id}
        />
      );
    });
  }

  // This following section will display the table with the Users of individuals.
  return (
    <div>
      <Sidebar /> {/* Intégrer le composant Sidebar ici */}
      <div style={{ marginLeft: "15%", padding: "20px" }}>
        <h3 style={{ textAlign: "center", marginTop: "40px", fontstyle: "bold", color: "blue" }}>
          Users List
        </h3>
        <div className="table-responsive">
          <table className="table table-striped" style={{ marginTop: "40px" }}>
            <thead className="thead-dark">
              <tr>
                <th style={{ color: "blue" }}>First Name</th>
                <th style={{ color: "red" }}>Last Name</th>
              </tr>
            </thead>
            <tbody>{userList()}</tbody>
          </table>
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
          <h2>Do you really want to continue?</h2>
          <div>
            <button
              style={{
                marginRight: "10px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                backgroundColor: "blue",
                cursor: "pointer",
              }}
              onClick={() => {
                deleteUser(selectedUser._id);
                closeConfirmationModal();
              }}
            >
              Yes/Confirm
            </button>
            <button
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                backgroundColor: "red",
                cursor: "pointer",
              }}
              onClick={closeConfirmationModal}
            >
              No/Return
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
