import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Registration from "./Components/Registration";


function App() {
  const [count, setCount] = useState(0);
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
      </Routes>
    
    </BrowserRouter>
  );
}
export default App;
