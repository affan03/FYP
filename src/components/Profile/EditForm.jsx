import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";

const EditForm = ({ initialData, onSubmit }) => {
  const [firstName, setFirstName] = useState(initialData.firstName);
  const [lastName, setLastName] = useState(initialData.lastName);
  const [age, setAge] = useState(initialData.age);
  const [gender, setGender] = useState(initialData.gender);
  const [errors, setErrors] = useState({});

  const genders = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    let formErrors = {};

    if (!firstName) formErrors.firstName = "First Name is required";
    if (!lastName) formErrors.lastName = "Last Name is required";
    if (!age) formErrors.age = "Age is required";
    if (!gender) formErrors.gender = "Gender is required";

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const formData = { firstName, lastName, age, gender };
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input Fields */}
      <TextField
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        error={!!errors.firstName}
        helperText={errors.firstName}
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        error={!!errors.lastName}
        helperText={errors.lastName}
      />
      <TextField
        label="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        error={!!errors.age}
        helperText={errors.age}
      />
      <TextField
        label="Gender"
        select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        error={!!errors.gender}
        helperText={errors.gender}
      >
        {genders.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditForm;
