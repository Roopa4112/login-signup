import React, { useState } from "react";
import './LoginSignup.css';

import user_icon from '../assets/111.png';
import email_icon from '../assets/222.png';
import password_icon from '../assets/333.png';

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");

  // State for inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // State for error handling
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });

  // Basic validation function
  const validateForm = () => {
    let isValid = true;
    let tempErrors = { email: "", password: "", username: "" };

    // Email validation
    if (!email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      tempErrors.password = "Password should be at least 6 characters";
      isValid = false;
    }

    // Username validation (only for Sign Up)
    if (action === "Sign Up" && !username) {
      tempErrors.username = "Username is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission (for Login or Sign Up)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (action === "Sign Up") {
        // Handle Sign Up Logic
        console.log("Signing up with:", { username, email, password });
      } else {
        // Handle Login Logic
        console.log("Logging in with:", { email, password });
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit} className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <img src={user_icon} alt="User Icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="Email Icon" />
          <input
            type="email"
            placeholder="Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="input">
          <img src={password_icon} alt="Password Icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="submit-container">
          <div
            className={action === "Sign Up" ? "submit" : "submit gray"}
            onClick={handleSubmit}
          >
            {action === "Sign Up" ? "Sign Up" : "Login"}
          </div>
        </div>
      </form>
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
