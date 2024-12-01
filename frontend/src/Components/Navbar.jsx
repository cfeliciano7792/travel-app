import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Cookies from "js-cookie"


const Navbar = () => {

  const navigate = useNavigate();

  const handleSignOut = (event) => {
    event.preventDefault();
    Cookies.remove('user_id'); // Remove the 'user_id' cookie
    console.log('User signed out, cookie removed.');
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      <h1>Travel Planner</h1>
      <div className="links">
        <ul>
          <li>
            {/* <Link to="/home">Home</Link> */}
            {/* <Link to="/login">Login</Link>
            <Link to="/registration">Register</Link> */}

            <Link to="/mytrips">My Trips</Link>

            <Link to="/experiences">Experiences</Link>

            <Link onClick={handleSignOut}>Sign Out</Link>

          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
