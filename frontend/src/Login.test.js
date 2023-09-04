import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";

describe("Login Component", () => {
  it("should render without errors", () => {
    const { getByPlaceholderText, getByRole } = render(
      <Router>
        <Login />
      </Router>
    );

    expect(getByPlaceholderText("Username")).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();

    const loginButton = getByRole("button", { name: "Login" });
    expect(loginButton).toBeInTheDocument();
  });
});
