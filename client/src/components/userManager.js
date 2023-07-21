import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [firstNameSearch, setFirstNameSearch] = useState("");
  const [lastNameSearch, setLastNameSearch] = useState("");
  const [sortKey, setSortKey] = useState("first_name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10; 

  const [currentUsers, setCurrentUsers] = useState([]);

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
      // setCurrentPage(1); // Set the currentPage to 1 on initial render
      getCurrentUsers(); // Update current users on initial render
    }
    getUsers();
  }, [Users]);

  async function deleteUser(_id) {
    await fetch(`http://localhost:5050/user/${_id}`, {
      method: "DELETE",
    });
    const newUsers = Users.filter((el) => el._id !== _id);
    setUsers(newUsers);
    getCurrentUsers(); // Update current users after deletion
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

  useEffect(() => {
    getCurrentUsers(); // Update current users on initial render and when search, sort, or page changes
  }, [currentPage, firstNameSearch, lastNameSearch, sortKey, sortOrder]);

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
        <h3 style={{ textAlign: "center", marginTop: "40px", fontWeight: "bold", color: "blue" }}>
          Users List
        </h3>
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
          >
            Clear
          </button>
        </div>
        <table className="table table-striped" style={{ marginTop: "40px" }}>
          <thead className="thead-dark">
            <tr>
              <th onClick={() => handleSort("first_name")}>
                First Name
                {sortKey === "first_name" && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th onClick={() => handleSort("last_name")}>
                Last Name
                {sortKey === "last_name" && (
                  <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <User
                user={user}
                deleteUser={() => deleteUser(user._id)}
                key={user._id}
              />
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {Array.from({ length: Math.ceil(Users.length / usersPerPage) }).map((_, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
