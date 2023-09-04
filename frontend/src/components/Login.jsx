import React, { useState } from "react";
import { axios } from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://todo-suyj.onrender.com/auth/login",
        {
          username: username,
          password: password,
        }
      );

      console.log("Login successful:", response.data);
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userId", response.data.userId);
      // Redirect to the task page after successful login
      navigate("/task");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Login</h2>
      <h4>Please login with your registered password and username.</h4>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          placeholder="Password"
        />
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
