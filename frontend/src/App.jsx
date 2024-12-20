
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./Components/Navbar";
import MainNavbar from "./Components/MainNavbar";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Home from "./Pages/Home";
import ViewExperience from "./Pages/ViewExperience"

import MyTrips from "./Pages/MyTrips";
import Experiences from "./Pages/Experiences";
import ViewTrip from "./Pages/ViewTrip";
import Footer from "./Components/Footer";


import Cookies from "js-cookie"




function App() {
  const [count, setCount] = useState(0);

  const setCookie = async (user_id) => {
    Cookies.set('user_id', user_id)
    console.log(Cookies.get())
  }


  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login setCookie={setCookie} />} />
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path="/login" element={<Login setCookie={setCookie} />} /> */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/mytrips" element={<MyTrips />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/experiences/:id" element={<ViewExperience />} />
        <Route path="/mytrips/:id" element={<ViewTrip />} />
      </Routes>
      <Footer/>
    </BrowserRouter>

  );
}
export default App;
