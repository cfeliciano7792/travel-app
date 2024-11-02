// code reference: https://www.youtube.com/watch?v=8hU0I8rY4u4
import { useEffect, useState } from "react";

const Registration = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  // ensures that the successful registration message pops up after form is submitted
  const [submitted, setSubmitted] = useState(false);

  const handleFirstNameInputChange = (event) => {
    setValues({ ...values, firstName: event.target.value });
  };

  const handleLastNameInputChange = (event) => {
    setValues({ ...values, lastName: event.target.value });
  };

  const handleEmailInputChange = (event) => {
    setValues({ ...values, email: event.target.value });
  };

  // ensures that when the page refreshes, the data isn't lost
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <h1>Registration Form</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        {submitted ? (
          <div className="successful-reg">Registration Completed!</div>
        ) : null}
        <input
          onChange={handleFirstNameInputChange}
          value={values.firstName}
          className="form-field"
          placeholder="First Name"
          name="firstName"
          required
        />
        <input
          onChange={handleLastNameInputChange}
          value={values.lastName}
          className="form-field"
          placeholder="Last Name"
          name="lastName"
          required
        />
        <input
          onChange={handleEmailInputChange}
          value={values.email}
          className="form-field"
          placeholder="Email"
          name="Email"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Registration;
