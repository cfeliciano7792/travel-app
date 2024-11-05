// ORIGINAL FUNCTIONING VERSION
import React from "react";
import { Link } from "react-router-dom";


import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Travel Planner</h1>
      <div className="links">
      <ul>
        <li>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
        </li>
      </ul>
        <ul>
          <li>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/registration">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
