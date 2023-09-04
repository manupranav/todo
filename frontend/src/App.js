import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage"; // Import the correct path to your HomePage component
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/task" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        {/* Define more routes here */}
      </Routes>
    </Router>
  );
};

export default App;
