import React, { useState } from "react";
import axios from "axios";
import "./ResetPassword.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setSuccessMessage("");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:9000/auth/reset-password", { email });
      setSuccessMessage(response.data.message);
      setErrorMessage("");
    } catch (error) {
      console.error("Error sending reset email:", error.message);
      setErrorMessage("Failed to send reset email. Please try again.");
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <h2 className="reset-password-h2">Reset Password</h2>
      {successMessage && <p className="reset-password-success-message">{successMessage}</p>}
      {errorMessage && <p className="reset-password-error-message">{errorMessage}</p>}
      <form className="reset-password-form" onSubmit={handleResetPassword}>
        <input
          type="email"
          className="reset-password-inputs"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="reset-password-button" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
