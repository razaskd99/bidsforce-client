"use client";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { MdOutlineCloudUpload } from "react-icons/md";
import { formatDate } from "@/app/api/util/utility";

const fileTypes = ["JPG", "PNG", "GIF", "PDF", "DOCX"];

function DragDrop(props) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [upload, setUploaded] = useState(false);

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
        setUploaded(true);
        props.setDocumentsUploaded(true);
      } else {
        console.error("Failed to upload files");
      }
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  const handleChange = (files) => {
    if (files) {
      const file = files; // Get the first file
      console.log(file);
      // Format the single file
      const formattedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
      };

      // Create a new FormData object and append the single file
      const formData = new FormData();
      formData.append("file", file);

      const extractedFile = formData.get("file");

      //console.log(extractedFile);

      // Update the selectedFiles array with the single file
      setSelectedFiles(extractedFile);
    }
  };

  return (
    <div className="border border-dashed border-gray-300 w-[100%] flex items-center justify-center flex-col p-10 mt-7 text-[#778CA2] text-sm relative">
      {/* {<MdOutlineCloudUpload className="text-2xl " />
      <h6>DRAG FILES TO ATTACH</h6>} */}

      <FileUploader
        multiple={false}
        onDrop={handleChange}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />

      <ul className="list-none mt-4 w-full">
        {selectedFiles ? (
          <li className="mb-2 p-2 border rounded bg-gray-100">
            {selectedFiles?.name}
          </li>
        ) : (
          <li className="mb-2 p-2 border rounded bg-gray-100">
            No files selected
          </li>
        )}

        {/* {props?.storedDocuments?.length > 0
          ? props.storedDocuments.map((file, index) => (
              <li
                key={index}
                className="mb-2 p-2 border rounded bg-gray-100 flex justify-between"
              >
                <span className="text-black w-3/4 ">
                  {file?.docvalt_filename}
                </span>{" "}
                <span className="text-gray-400 w-1/4">{file.file_size}</span>{" "}
                <span className="text-gray-400 w-1/4">
                  {formatDate(file.created_date)}
                </span>
              </li>
            ))
          : ""} */}
      </ul>

      {<button onClick={(e) => uploadFiles(e)}> Upload</button>}
      {upload && (
        <div
          class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          Uploaded successfully!
        </div>
      )}
    </div>
  );
}

export default DragDrop;
