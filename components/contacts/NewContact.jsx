'use client'
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, MenuItem, Button, Alert, } from '@mui/material';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BsCloudUpload } from "react-icons/bs";
import { createPrimaryContactsRequest } from '@/app/api/rfx/scripts';

const NewContact = (props) => {
  const { isOpen, handleClose, handleChangeValues, designationRecords, companyRecords, teamRecords, handleCancel, } = props;
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileData, setFileData] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [designationList, setDesignationList] = useState(designationRecords)
  const [companyList, setCompanyList] = useState(companyRecords)
  const [teamList, setTeamList] = useState(teamRecords)
  const [formData, setFormData] = useState({
      company_id: '', 
      designation_id: '', 
      team_id: '', 
      first_name: '', 
      last_name: '', 
      manager: '', 
      function_group: '', 
      contact_number: '', 
      time_zone: '', 
      email: '', 
      working_hours: '', 
      work_location: '', 
      profile_image: ''
  });
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
 
    // Create a new FormData object and append the single file
    const formData = new FormData();
    formData.append("file", file);
    setFileData(formData)

    const extractedFile = formData.get("file");
    // Update the selectedFiles array with the single file
    setSelectedFile(extractedFile); 
  };
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  const functionalGroupOptions = [
    { id: 1, name: "Sales" },
    { id: 2, name: "Marketing" },
    { id: 3, name: "Finance" },
  ];

  const teamOptions = [
    { id: 1, name: "Team A" },
    { id: 2, name: "Team B" },
    { id: 3, name: "Team C" },
  ];
  const timeZoneOptions = [
    { id: 'UTC', name: 'UTC (Coordinated Universal Time)' },
    { id: 'GMT', name: 'GMT (Greenwich Mean Time)' },
    { id: 'EST', name: 'EST (Eastern Standard Time)' },
    { id: 'CST', name: 'CST (Central Standard Time)' },
    { id: 'MST', name: 'MST (Mountain Standard Time)' },
    { id: 'PST', name: 'PST (Pacific Standard Time)' },
    { id: 'CET', name: 'CET (Central European Time)' },
    { id: 'EET', name: 'EET (Eastern European Time)' },
    { id: 'JST', name: 'JST (Japan Standard Time)' },
    { id: 'AEDT', name: 'AEDT (Australian Eastern Daylight Time)' },
    { id: 'NZDT', name: 'NZDT (New Zealand Daylight Time)' },
  ];

  const workingHoursOptions = [
    { id: 1, name: "8 hours" },
    { id: 2, name: "6 hours" },
    { id: 3, name: "4 hours" },
  ];

  const workLocationOptions = [
    { id: 1, name: "Office A" },
    { id: 2, name: "Office B" },
    { id: 3, name: "Office C" },
  ];

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle className='flex items-center justify-between'><span>Add new user </span> <IoMdCloseCircleOutline className='text-[#778CA2] cursor-pointer' onClick={handleClose} /></DialogTitle>
      <DialogContent className='bg-[#F2F4F6]'>
        <Grid container spacing={2} className='mt-2'>
          {/* Input */}
          <Grid item xs={12}>
            {selectedImage ?
             <span className="block m-auto w-20 h-20 rounded-full overflow-hidden">
              <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="w-full h-full object-cover" />
            </span> : (
              <label htmlFor="img" className="relative cursor-pointer border-2 border-dashed border-gray-300 flex items-center justify-center text-lg text-gray-700 rounded-lg p-6 text-center">
                <input type="file" name="img" id="img" className="hidden" onChange={handleImageChange} />
                <span className="w-12 h-12 bg-center bg-cover rounded-full">
                  <BsCloudUpload className='text-2xl' />
                </span>
                <span >UPLOAD IMAGE</span>
              </label>
            )}
          </Grid>

          {/* Row 1 */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="first_name"
              label="First Name *"
              onChange={handleChange}
              className='bg-white'
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="last_name"
              label="Last Name *"
              onChange={handleChange}
              className='bg-white'
            />
          </Grid>

          {/* Row 2 */}
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              name="designation_id"
              label="Designation Name *"
              onChange={handleChange}
              className='bg-white'
            >
              <MenuItem value="">Select Designation *</MenuItem>
              {designationList.map(option => (
                <MenuItem key={option.designation_id} value={option.designation_id}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            {/*<TextField
              fullWidth
              id="company"
              name="company"
              label="Company"
              onChange={handleChangeValues}
              className='bg-white'
              />*/}
              <TextField
              select
              fullWidth
              name="company_id"
              label="Company Name *"
              onChange={handleChange}
              className='bg-white'
            >
              <MenuItem value="">Select Company *</MenuItem>
              {companyList.map(option => (
                <MenuItem key={option.company_id} value={option.company_id}>
                  {option.company_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Row 3 */}
          {/* <Grid item xs={6}>
            <TextField
              fullWidth
              id="m5_manager"
              name="m5_manager"
              label="Manager"
              onChange={handleChangeValues}
              className='bg-white'
            />
          </Grid>*/}
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              name="function_group"
              label="Functional Group *"
              onChange={handleChange}
              className='bg-white'
            >
              <MenuItem value="">Select Functional Group *</MenuItem>
              {functionalGroupOptions.map(option => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Row 4 */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="contact_number"
              label="Contact Number"
              onChange={handleChange}
              className='bg-white'
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              name="team_id"
              label="Team *"
              onChange={handleChange}
              className='bg-white'
            >
              <MenuItem value="">Select Team *</MenuItem>
              {teamList.map(option => (
                <MenuItem key={option.team_id} value={option.team_id}>
                  {option.team_title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* Row 5 */}
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              name="time_zone"
              label="Time Zone *"
              onChange={handleChange}
              className='bg-white'
            >
              <MenuItem value="">Select Time Zone *</MenuItem>
              {timeZoneOptions.map(option => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email *"
              onChange={handleChange}
              className='bg-white'
            />
          </Grid>

          {/* Row 6 */}
          <Grid item xs={6}>
          <TextField
              fullWidth
              name="working_hours"
              label="Working Hours"
              onChange={handleChange}
              className='bg-white'
            />
          </Grid>
          <Grid item xs={6}>

          <TextField
              fullWidth
              name="work_location"
              label="Work Location"
              onChange={handleChange}
              className='bg-white'
            />

          </Grid>
        </Grid>
      </DialogContent>
      <DialogContent>
        <Alert 
          severity="error" 
          id="modalErrorMessageAlert" 
          class="bg-red-100 border border-red-200 text-md text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
          style={{ display: 'none' }}>
          Invalid Operation.
        </Alert>
        <Alert 
          severity="success" 
          id="modalSuccessMessageAlert" 
          class="bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
          style={{ display: 'none' }}>
          Operation successful.
        </Alert>
      </DialogContent>
      <DialogActions className='flex items-center justify-between mt-3 px-6'>
      <button 
        onClick={(e)=>createPrimaryContactsRequest(
          e,
          formData,
          selectedFile,
          fileData
        )}
        className='bg-[#26BADA]  
        text-white rounded-md px-4 py-2 min-w-[120px] uppercase'
      >Add</button>
       <button className='bg-[#E8ECEF]  text-[#778CA2] rounded-md px-4 py-2 min-w-[120px] uppercase'>Cancel</button>
      </DialogActions>      
    </Dialog >
  );
};

export default NewContact;
