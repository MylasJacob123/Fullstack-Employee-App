import React, { useState } from "react";
import axios from "axios";
import "./ResetPassword.css";
import { toast } from "react-toastify";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/auth/reset-password", { email });
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error sending reset email:", error.message);
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <h2 className="reset-password-h2">Reset Password</h2>
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
