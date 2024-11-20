import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Travel Planner</h1>
      <div className="links">
        <ul>
          <li>
            <Link to="/home">Home</Link>
            {/* <Link to="/login">Login</Link>
            <Link to="/registration">Register</Link> */}

            <Link to="/mytrips">My Trips</Link>

            <Link to="/experiences">Experiences</Link>

            <Link to="/login">Sign Out</Link>

          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
