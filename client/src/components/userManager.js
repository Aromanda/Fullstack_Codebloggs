import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import ReactModal from "react-modal";

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
  const [firstNameSearch, setFirstNameSearch] = useState("");
  const [lastNameSearch, setLastNameSearch] = useState("");
  const [sortKey, setSortKey] = useState("first_name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // State variable to track loading status
  const [currentUsers, setCurrentUsers] = useState([]);

  const usersPerPage = 10;
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    async function getUsers() {
      try {
        // Simulate a delay of 1.5 seconds before fetching the data
        setTimeout(async () => {
          const response = await fetch(`http://localhost:5050/user/`);
          if (!response.ok) {
            throw new Error(`An error occurred: ${response.statusText}`);
          }
          const Users = await response.json();
          setUsers(Users);
          setLoading(false); // Set loading to false when data is fetched
          getCurrentUsers(); // Update current users on initial render
        }, 1500); // Simulate 1.5 seconds delay
      } catch (error) {
        setLoading(false); // Set loading to false if there's an error
        window.alert(error.message);
      }
    }
    getUsers();
  }, []);

  async function deleteUser(_id) {
    await fetch(`http://localhost:5050/user/${_id}`, {
      method: "DELETE",
    });
    const newUsers = Users.filter((el) => el._id !== _id);
    setUsers(newUsers);
    getCurrentUsers(); // Update current users after deletion
  }

  function openConfirmationModal(user) {
    setSelectedUser(user);
    setShowConfirmationModal(true);
  }

  function closeConfirmationModal() {
    setSelectedUser(null);
    setShowConfirmationModal(false);
  }

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

  function sortUsers() {
    let sortedUsers = [...Users];
    sortedUsers.sort((a, b) => {
      const valA = a[sortKey].toLowerCase();
      const valB = b[sortKey].toLowerCase();
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sortedUsers;
  }

  function getCurrentUsers() {
    const sortedUsers = sortUsers();
    let filteredUsers = sortedUsers;
    if (firstNameSearch) {
      filteredUsers = filteredUsers.filter((user) =>
        user.first_name.toLowerCase().includes(firstNameSearch.toLowerCase())
      );
    }
    if (lastNameSearch) {
      filteredUsers = filteredUsers.filter((user) =>
        user.last_name.toLowerCase().includes(lastNameSearch.toLowerCase())
      );
    }

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    setCurrentUsers(currentUsers); // Update current users
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleSort(key) {
    setSortKey(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }

  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: "15%", padding: "20px" }}>
        <h3 style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px", fontWeight: "bold", color: "#8D88EA" }}>
          Users List
        </h3>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
              preserveAspectRatio="xMidYMid"
              style={{
                display: "inline-block",
                animation: "spin 1s infinite linear",
                width: "300px",
                height: "300px",
              }}
            >
              <circle
                cx="20"
                cy="20"
                fill="none"
                stroke="#8D88EA"
                strokeWidth="4"
                r="10"
                strokeDasharray="39.8 13.1"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  repeatCount="indefinite"
                  dur="1s"
                  values="0 20 20;360 20 20"
                  keyTimes="0;1"
                ></animateTransform>
              </circle>
            </svg>
          </div>
        ) : (
          <>
            <div className="search-container">
              <label htmlFor="firstNameSearch">Search by First Name:</label>
              <input
                type="text"
                id="firstNameSearch"
                value={firstNameSearch}
                onChange={(e) => setFirstNameSearch(e.target.value)}
                placeholder=""
              />
              <label htmlFor="lastNameSearch">Search by Last Name:</label>
              <input
                type="text"
                id="lastNameSearch"
                value={lastNameSearch}
                onChange={(e) => setLastNameSearch(e.target.value)}
                placeholder=""
              />
              <button
                onClick={() => {
                  setFirstNameSearch("");
                  setLastNameSearch("");
                }}
                style={{ background: "#8D88EA", color: "white" }}
              >
                Clear
              </button>
            </div>
            <table className="table table-striped" style={{ marginTop: "40px" }}>
              <thead className="thead-dark">
                <tr>
                  <th onClick={() => handleSort("first_name")} style={{ color: "#8D88EA" }}>
                    First Name
                    {sortKey === "first_name" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </th>
                  <th onClick={() => handleSort("last_name")} style={{ color: "#8D88EA" }}>
                    Last Name
                    {sortKey === "last_name" && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>{userList()}</tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {Array.from({ length: Math.ceil(Users.length / usersPerPage) }).map((_, index) => (
                <button key={index + 1} onClick={() => handlePageChange(index + 1)} style={{ background: "#8D88EA", color: "white" }}>
                  {index + 1}
                </button>
              ))}
            </div>

            {/* Render the delete confirmation modal */}
            <ReactModal
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
            </ReactModal>
          </>
        )}
      </div>
    </div>
  );
}
