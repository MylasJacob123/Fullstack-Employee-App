import React, { useState } from "react";
import "./SignIn.css"; 
import axios from "axios";
import { toast } from "react-toastify";

function SignIn({ onSignIn }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const signIn = async () => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });
      toast.success("Login successful! 🎉");
      console.log(response);
      onSignIn();
    } catch (error) {
      console.error("Error in logging in", error);
      toast.error("Failed login. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    signIn();
  };

  return (
    <div className="sign-in-container">
      <h2>Login</h2>
      {success && <p className="sign-in-success-message">{success}</p>}
      {error && <p className="sign-in-error-message">{error}</p>}
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <input
          className="sign-in-inputs"
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          className="sign-in-inputs"
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="sign-in-button">Login</button>
      </form>
    </div>
  );
};

export default SignIn;
