import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Registration from "./Components/Registration";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Login />
        <Registration />
      </div>
    </div>
  );
}
export default App;
