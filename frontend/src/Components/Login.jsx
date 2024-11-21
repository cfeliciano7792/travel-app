// code reference: https://www.youtube.com/watch?v=4pcJBQljAaQ
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const Login = ({setCookie}) => {
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
        setCookie(data.user_id)
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
          className="text-white bg-emerald-500 hover:bg-emerald-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          // style={{ backgroundColor: "lightgreen", border: "1px lightgray" }}
        >
          Submit
        </button>
        <p>Ready to plan your next adventure? <Link className="text-blue-500 underline" to="/registration">Sign Up Here!</Link> </p>
      </form>
    </div>
  );
};

export default Login;
