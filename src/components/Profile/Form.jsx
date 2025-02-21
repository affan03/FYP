import React, { useState, useRef } from "react";
import cover from "../../images/pexels-photo-8384499.webp";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import scan from "../../images/scan.svg";
import scan2 from "../../images/scan2.svg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import UploadPic from "./UploadPic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fileInputRef = useRef();

  const navigate = useNavigate(); 

  const genders = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result); // Set the selected image
        setIsModalOpen(false); // Close modal
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formErrors = {};

    if (!firstName) formErrors.firstName = "First Name is required";
    if (!lastName) formErrors.lastName = "Last Name is required";
    if (!age) formErrors.age = "Age is required";
    if (!gender) formErrors.gender = "Gender is required";

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.post(
          `${backendUrl}/api/user/profile/update/`,
          {
            first_name: firstName,
            last_name: lastName,
            age: age,
            gender: gender,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Navigate to the ModalPage component
        navigate("/modal-page");
      } catch (error) {
        console.error("Error updating profile:", error.response ? error.response.data : error.message);
      }
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBack = () => {
    setSelectedImage(null); // Reset selected image
    setIsModalOpen(true); // Reopen the previous modal
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  return (
    <div className="flex justify-center rounded-3xl absolute top-20">
      <div className="grid grid-cols-2 w-2/3 h-[640px] rounded-lg bg-none">
        <div>
          <img src={cover} alt="" className="h-[640px] rounded-xl" />
        </div>
        <div className="mt-20 mr-10">
          <h1 className="text-3xl font-bold">
            Before we get started, please fill out this information!
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-12">
              <TextField
                id="first-name"
                label="First Name"
                variant="standard"
                fullWidth
                sx={{ mb: 4 }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                id="last-name"
                label="Last Name"
                variant="standard"
                fullWidth
                sx={{ mb: 4 }}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
              <TextField
                id="age"
                label="Age"
                type="number"
                InputLabelProps={{ shrink: true }}
                variant="standard"
                fullWidth
                sx={{ mb: 4 }}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                error={!!errors.age}
                helperText={errors.age}
              />
              <TextField
                id="gender"
                select
                label="Gender"
                variant="standard"
                fullWidth
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                error={!!errors.gender}
                helperText={errors.gender || "Please select your gender"}
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <button
                type="submit"
                className="rounded-lg px-4 py-3 bg-blue-800 text-white mt-14 float-right"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-3/4 h-[84vh] rounded-lg p-8 flex flex-col mt-12">
            <div className="absolute bg-blue-800 h-[85vh] rounded-lg w-1/4 bottom-7 right-44">
              <ul className="list-disc list-inside text-white font-extralight mt-60 ml-4 text-lg px-4">
                <li>
                  Take the photo about 4 inches away from the problem area.
                </li>
                <li>Center your symptom in the photo.</li>
                <li>Make sure there is good lighting.</li>
                <li>Ensure your photo isn't blurry.</li>
              </ul>
            </div>
            <div className="w-full flex justify-end">
              <button
                className="text-red-500 z-50"
                onClick={closeModal}
              >
                ✖
              </button>
            </div>
            <div className="flex justify-start">
              <div className="">
                <h1 className="text-4xl font-bold ml-48 bottom-12">
                  How to take a photo
                </h1>
              </div>
              <div className="grid grid-cols-2 gap-16 absolute right-96 bottom-32 mx-80">
                <img src={scan} alt="" className="w-52" />
                <CheckCircleIcon
                  className="w-44 h-44 absolute text-black right-48 -top-6"
                  sx={{ fontSize: 60 }}
                />

                <img src={scan2} alt="" className="w-52" />
                <CancelIcon
                  className="w-44 h-44 absolute text-black -left-12 -top-6"
                  sx={{ fontSize: 60 }}
                />
              </div>
            </div>
            <div>
              <button
                className="mt-96 ml-64 relative px-10 py-3 bg-blue-800 text-white rounded-full top-12"
                onClick={handleClick}
              >
                Snap a photo
              </button>
            </div>
           
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
      )} */}

      {/* Pass the selected image to UploadPic component */}
       {/* {selectedImage && <UploadPic imageSrc={selectedImage} onBack={handleBack} />} */}
    </div>
  );
};

export default Form;
