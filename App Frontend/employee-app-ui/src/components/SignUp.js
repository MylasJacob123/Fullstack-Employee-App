import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { toast } from "react-toastify";

function SignUp({ onSignIn }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createAccount = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/createAccount",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }
      );
      toast.success("Account created successfully! 🎉");
      console.log(response);
      onSignIn();  
    } catch (error) {
      console.error("Error creating account", error);
      toast.error("Failed to create account. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    createAccount();
  };

  return (
    <div className="sign-up-container">
      <h2>Create Account</h2>
      {success && <p className="sign-up-success-message">{success}</p>}
      {error && <p className="sign-up-error-message">{error}</p>}
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <input
          className="sign-up-inputs"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          className="sign-up-inputs"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          className="sign-up-inputs"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="sign-up-inputs"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="sign-up-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUp;
