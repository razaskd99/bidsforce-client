"use client";
import React, { useState, useEffect } from "react";

const fileTypes = ["JPG", "PNG", "GIF"];

function ProfilePicture(props) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const uploadFiles = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("files", selectedFiles);
      console.log(selectedFiles);

      // Make a POST request to your FastAPI route
      const response = await fetch(
        props.apiBackendURL + "uploads/upload/profile",
        {
          method: "POST",
          body: formData,
          headers: {
            accept: "application/json",
            tenantID: "1",
            folderName: "profile",
            // No need to set 'Content-Type' as it is automatically set for multipart/form-data
          },
        }
      );

      if (response.ok) {
        console.log("Files uploaded successfully");
        //setFileUploader(false);
        setUploaded(true);
        props.setDocumentsUploaded(true);
      } else {
        console.error("Failed to upload files");
      }
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    //setSelectedImage(URL.createObjectURL(file)); // Set selected image preview
    setImageName(file.name); // Set image file name

    // Create a new FormData object and append the single file
    const formData = new FormData();
    formData.append("file", file);

    const extractedFile = formData.get("file");

    // Update the selectedFiles array with the single file
    setSelectedFiles(extractedFile);
  };

  return (
    <div className="border border-dashed border-gray-300 w-[100%] flex items-center justify-center flex-col p-10 mt-7 text-[#778CA2] text-sm relative">
      {selectedImage ? (
        <div>
          <img
            src={selectedImage}
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      ) : (
        <div>
          <label for="user_profile_photo">
            <b>Choose Profile Picture</b>
          </label>
          <div>
            {" "}
            <input type="file" accept="image/*" onChange={handleChange} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePicture;
