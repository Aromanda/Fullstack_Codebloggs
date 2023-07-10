import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const [agentName, setAgentName] = useState("");
  const location = useLocation();

  useEffect(() => {
    async function fetchAgentData() {
      const response = await fetch("http://localhost:5050/record/");
      if (response.ok) {
        const records = await response.json();
        // Assuming the email stored in session storage is unique and can be used to identify the agent
        const email = sessionStorage.getItem("email");
        const agent = records.find((record) => record.email === email);
        if (agent) {
          const { first_name, last_name } = agent;
          setAgentName(`${first_name} ${last_name}`);
        }
      }
    }
    fetchAgentData();
  }, []);

  const isLoginPage = location.pathname === "/";
  const isCreatePage = location.pathname === "/create";
  const isMainPage = location.pathname === "/main";
  const isBloggsPage = location.pathname === "/bloggs";
  const isNetworkPage = location.pathname === "/network";

  let logoStyle = {
    width: "30%", // Default logo width
  };

  if (isLoginPage || isCreatePage ) {
    logoStyle.width = "50%"; 
  } else if (isMainPage || isBloggsPage || isNetworkPage) {
    logoStyle.width = "20%"; 
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
        <div>
          <NavLink className="navbar-brand" to="/">
            <img style={logoStyle} src="/images/codebloggs/codebloggs logo2.png" alt="Logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Show the agent name */}
        <div>
          <span className="navbar-text" style={{ fontSize: "22px", color: "#8D88EA", fontStyle: "italic" }}>
            Welcome, {agentName}
          </span>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {/* Removed the code block for the "Create an agent" button */}
          </ul>
        </div>
      </nav>
    </div>
  );
}