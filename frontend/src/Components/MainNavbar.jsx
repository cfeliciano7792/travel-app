import React from "react";
import { Link } from "react-router-dom";
const MainNavbar = () => {
  return (
    <nav className="navbar">
      <h1>Travel Planner</h1>
      <div className="links">
        <ul>
          <li>
            <Link to="/home">Home</Link>
            <Link to="/mytrips">My Trips</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default MainNavbar;