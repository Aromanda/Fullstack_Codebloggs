import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts before the redirection
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card" style={{ width: "40rem" }}>
        <div className="card-body">
          <h3 className="card-title" style={{ fontStyle: 'italic', color: 'red', fontSize: '30px' }}>Error</h3>
          <p className="card-text" style={{ fontSize: '20px' }}>Oops! Something went wrong.You will be redirect too login page in 5 seconds</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;