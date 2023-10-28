"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "./auth";
import GoogleButton from "react-google-button";
import { Alert } from "react-bootstrap";

import "../../styles/login.css";

const Login = () => {
  const [error, setError] = useState("");
  const { googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/customers-data");
    } catch (error) {
      // setError(error);
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Data Portal Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
