import React, { useState } from "react";
import Form from "./Form";
import EditForm from "./EditForm";

const ProfilePage = () => {
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (data) => {
    setFormData(data);
    setIsEditing(true);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    setIsEditing(false);
    // Handle form submission logic here
  };

  return (
    <div>
      {isEditing ? (
        <EditForm initialData={formData} onSubmit={handleFormSubmit} />
      ) : (
        <Form onSubmit={handleFormSubmit} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default ProfilePage;
