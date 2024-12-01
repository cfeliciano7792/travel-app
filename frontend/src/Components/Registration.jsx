// code reference: https://www.youtube.com/watch?v=8hU0I8rY4u4
import { useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";

const Registration = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  // ensures that the successful registration message pops up after form is submitted
  const [submitted, setSubmitted] = useState(false);

  const handleUserNameInputChange = (event) => {
    setValues({ ...values, username: event.target.value });
  };

  const handlePasswordInputChange = (event) => {
    setValues({ ...values, password: event.target.value });
  };

  const handleEmailInputChange = (event) => {
    setValues({ ...values, email: event.target.value });
  };

  let navigate = useNavigate()

  const userData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values)
  }

  // ensures that when the page refreshes, the data isn't lost
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/api/signup', userData)
    .then(response => response.json())
    .then(data => {
      console.log("Signup successful:", data);
      navigate(`/mytrips`); 
  })
    .catch(error => console.error(error));
  };

  return (
    <div className="form-container">
      <h1>Registration Form</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        {submitted ? (
          <div className="successful-reg">Registration Completed!</div>
        ) : null}
        <input
          onChange={handleUserNameInputChange}
          value={values.firstName}
          className="form-field"
          placeholder="Username"
          name="firstName"
          required
        />
        <input
          onChange={handlePasswordInputChange}
          value={values.lastName}
          className="form-field"
          placeholder="Password"
          name="password"
          required
        />
        <input
          onChange={handleEmailInputChange}
          type='email'
          value={values.email}
          className="form-field"
          placeholder="traveler@example.com"
          name="Email"
          required
        />
        <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
        <p>Back to <Link className="text-blue-500 underline" to="/login">login.</Link> </p>
      </form>
    </div>
  );
};

export default Registration;
