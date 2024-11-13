// code reference: https://www.youtube.com/watch?v=8hU0I8rY4u4
import { useEffect, useState } from "react";

const Experience = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    lastName: "",
  });
  // ensures that the successful registration message pops up after form is submitted
  const [submitted, setSubmitted] = useState(false);

  const handletitleInputChange = (event) => {
    setValues({ ...values, title: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setValues({ ...values, description: event.target.value });
  };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
      };

  // ensures that when the page refreshes, the data isn't lost
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <h1>Create Experience Form</h1>
      <form className="experience-form" onSubmit={handleSubmit}>
        {submitted ? (
          <div className="experience-form">Experience Added!</div>
        ) : null}
        <input
          onChange={handletitleInputChange}
          value={values.title}
          className="form-field"
          placeholder="Title"
          name="title"
          required
        />
        <textarea
          onChange={handleDescriptionChange}
          value={values.description}
          className="form-field"
          placeholder="Experience Description"
          name="description"
        //   rows="4"
          required
        />

        <p>
        Upload a Photo
        </p>
        <input
          type="file"
          onChange={handleFileChange}
          className="form-field"
          name="file"
          accept="image/*"
          required
        />
        <button type="submit">Add Experience</button>
      </form>
    </div>
  );
};

export default Experience;
