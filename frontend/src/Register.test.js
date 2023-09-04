import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "./components/Register";

describe("Register Component", () => {
  it("should render without errors", () => {
    const { getByPlaceholderText, getByRole } = render(
      <Router>
        <Register />
      </Router>
    );

    expect(getByPlaceholderText("Username")).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();

    const registerButton = getByRole("button", { name: "Register" });
    expect(registerButton).toBeInTheDocument();
  });
});
