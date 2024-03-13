import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { MdOutlineCloudUpload } from "react-icons/md";




const fileTypes = ["JPG", "PNG", "GIF", "PDF", "DOCX"];

function DragDrop() {

	const [selectedFiles, setSelectedFiles] = useState([]);

	const uploadFiles = async (event) => {
		event.preventDefault();

		try {


			const formData = new FormData();

			selectedFiles.forEach((file, index) => {
				// Append each property of the file object individually
				formData.append(`files[${index}][name]`, file.name);
				formData.append(`files[${index}][size]`, file.size);
				formData.append(`files[${index}][type]`, file.type);
			  });
									  
			console.log('formDataformDataformData', formData)
			for (let value of formData.values()) {
				console.log(value);
			}
		
			// Make a POST request to your FastAPI route

			/*
			const response = await fetch("http://your-fastapi-url/upload", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				console.log("Files uploaded successfully");
			} else {
				console.error("Failed to upload files");
			}
			*/
		} catch (error) {
			console.error("Error uploading files", error);
		}
	};




	const handleChange = files => {
		const filesList = Array.from(files);


		const formattedFiles = filesList.map((file) => ({
			name: file.name,
			size: file.size,
			type: file.type,
		}));

		// Update the selectedFiles array
		setSelectedFiles(formattedFiles);




	};


	console.log(selectedFiles)

	return (
		<div className="border border-dashed border-gray-300 w-[490px] flex items-center justify-center flex-col p-10 mt-7 text-[#778CA2] text-sm relative">
			<MdOutlineCloudUpload className="text-2xl " />
			<h6>DRAG FILES TO ATTACH</h6>

			<FileUploader multiple={true} onDrop={handleChange} handleChange={handleChange} name="file" types={fileTypes} />





			<ul className="list-none mt-4 w-full">
				{selectedFiles.length > 0 ? (
					selectedFiles.map((file, index) => (
						<li key={index} className="mb-2 p-2 border rounded bg-gray-100">
							{file?.name}
						</li>
					))
				) : (
					<li className="mb-2 p-2 border rounded bg-gray-100">No files selected</li>
				)}
			</ul>

			<button onClick={(e) => uploadFiles(e)}> upload</button>




		</div>

	);
}

export default DragDrop;
