import { MdOutlineCloudUpload } from "react-icons/md";
import { useState } from 'react';
import { Button } from '@mui/material';

const FileUpload = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = () => {
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle dropped files here if needed
  };

  const handleFileInput = (e) => {
    // Handle file input changes here if needed
  };

  return (
    <div
      className={`border-dashed border-2 p-4 text-center flex flex-col items-center ${
        isDragOver ? 'border-blue-500' : 'border-gray-300'
        
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <MdOutlineCloudUpload size={40} className="text-[#778CA2] mb-2" />
      <p className="mb-2 text-[#98A9BC] uppercase">Drag files to attach</p>
      <span className="text-gray-500 mb-2">OR</span>
      <p className="mb-2 text-[#98A9BC] uppercase">Choose from DocVault</p>
      <input
        type="file"
        className="hidden"
        onChange={handleFileInput}
        accept="application/pdf,image/*"
      />
     
    </div>
  );
};

export default FileUpload;
