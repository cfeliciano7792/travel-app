// code reference: https://www.youtube.com/watch?v=4pcJBQljAaQ
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleFormSubmit = (event) => {
    // alert(`password: ${password} - username: ${username}`);
    event.preventDefault();
    navigate('/home')
  };
  return (
    <div className="form-container">
      <h1>Login Form</h1>
      <form onSubmit={handleFormSubmit}>
        {/* <label htmlFor="Log in Account">Log in Account</label> */}{" "}
        <input
          value={username}
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
          required
        />{" "}
        <input
          value={password}
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button
          type="submit"
          // style={{ backgroundColor: "lightgreen", border: "1px lightgray" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
