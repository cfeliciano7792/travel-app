// code reference: https://www.youtube.com/watch?v=4pcJBQljAaQ
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleUserNameInputChange = (event) => {
    setValues({ ...values, username: event.target.value });
  };

  const handlePasswordInputChange = (event) => {
    setValues({ ...values, password: event.target.value });
  };

  const navigate = useNavigate()

  const userData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/api/login', userData)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.ok) {
        navigate(`/home`)
      }
      
    })
    .catch((error) => {
      console.error("Error during login:", error.message);
      alert(error.message); // Display the error message to the user
    });
  }


  return (
    <div className="form-container">
      <h1>Login Form</h1>
      <form onSubmit={handleFormSubmit}>
        {/* <label htmlFor="Log in Account">Log in Account</label> */}{" "}
        <input
          value={values.username}
          placeholder="Username"
          onChange={handleUserNameInputChange}
          required
        />{" "}
        <input
          value={values.password}
          placeholder="Password"
          onChange={handlePasswordInputChange}
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
