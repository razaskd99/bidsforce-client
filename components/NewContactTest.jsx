'use client'
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, MenuItem, Button, Alert, } from '@mui/material';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BsCloudUpload } from "react-icons/bs";
import { getAllAccountRecordsAction } from '@/app/api/rfx/actions/account';
import { getAllDesignationRecordsAction, getAllTeamRecordsAction } from '@/app/api/rfx/actions/rfx';
import { createPrimaryContactsRequest, updatePrimaryContactsRequest } from '@/app/api/contacts/scripts';
import { getPrimaryContactsByIDAction } from '@/app/api/contacts/actions/contacts';
import { countriesListJSON } from './data/country';

const NewContactTest = ({ isOpen, handleClose, contactsData, modalType, id}) => {
  //const { isOpen, handleClose, contactsData, modalType, id} = props;
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileData, setFileData] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [designationList, setDesignationList] = useState([])
  const [companyList, setCompanyList] = useState([])
  const [teamList, setTeamList] = useState([])
  const [selectedId, setSelectedId] = useState(null); 
  const [isEdit, setIsEdit] = useState(modalType && modalType == 'edit' ? true : false)
  const [formData, setFormData] = useState({
      account_id: contactsData && contactsData.account_id ? contactsData.account_id : '', 
      designation_id: contactsData && contactsData.designation_id ? contactsData.designation_id : '', 
      team_id: contactsData && contactsData.team_id ? contactsData.team_id : '', 
      first_name: contactsData && contactsData.first_name ? contactsData.first_name : '', 
      last_name: contactsData && contactsData.last_name ? contactsData.last_name : '', 
      manager: contactsData && contactsData.manager ? contactsData.manager : '', 
      function_group: contactsData && contactsData.function_group ? contactsData.function_group : '', 
      contact_number: contactsData && contactsData.contact_number ? contactsData.contact_number : '', 
      time_zone: contactsData && contactsData.time_zone ? contactsData.time_zone : '', 
      email: contactsData && contactsData.email ? contactsData.email : '', 
      working_hours: contactsData && contactsData.working_hours ? contactsData.working_hours : '', 
      work_location: contactsData && contactsData.work_location ? contactsData.work_location : '', 
      profile_image: contactsData && contactsData.profile_image ? contactsData.profile_image : '/avatar.png'
  });
 

  
  useEffect(() => {    
    getPrimaryContactsByIDAction(selectedId)
      .then((resp) => {
        console.log(resp.returnData)
        setFormData(resp.returnData);
      })
      .catch((err) => []);
  }, []); 


  useEffect(() => {    
    getAllAccountRecordsAction()
      .then((resp) => {
        setCompanyList(resp.returnData);
      })
      .catch((err) => []);
  }, []);

  useEffect(() => {
    getAllDesignationRecordsAction(0, 1000)
      .then((resp) => {
        setDesignationList(resp.returnData.data);
      })
      .catch((err) => []);
  }, []);

  useEffect(() => {
    getAllTeamRecordsAction()
      .then((resp) => {
        setTeamList(resp.returnData);
      })
      .catch((err) => []);
  }, []);

  
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
      <DialogTitle className='flex items-center justify-between'> 
        <span>{isEdit ? 'Edit Contact' : 'Add Contact'} </span> 
        <IoMdCloseCircleOutline className='text-[#778CA2] cursor-pointer' onClick={handleClose} />
      </DialogTitle>{console.log(formData)}
      <DialogContent className='bg-[#F2F4F6]'> 
        <Grid container spacing={2} className='mt-2'>
          {/* Input */}
          <Grid item xs={12}>
            {selectedImage ? (
             <span className="block m-auto w-20 h-20 rounded-full overflow-hidden">
                <img src={isEdit && contactsData.profile_image ? contactsData.profile_image : URL.createObjectURL(selectedImage)} alt="Preview" className="w-full h-full object-cover" />
              </span>) : (
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
              defaultValue={formData.first_name}
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
              defaultValue={formData.last_name}
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
              value={formData.designation_id}
              onChange={handleChange}
              className='bg-white'
            >
              <MenuItem value="">Select Designation *</MenuItem>
              {designationList && designationList.map(option => (                
                <MenuItem 
                    key={option.designation_id} 
                    value={option.designation_id}  
                    selected={option.designation_id === formData.designation_id ? true : false}   
                  >
                  {option.title} 
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
              <TextField
              select
              fullWidth
              name="account_id"
              label="Account Name *"
              defaultValue={formData.account_id}
              onChange={handleChange}
              className='bg-white'
            >
              <MenuItem value="">Select Account *</MenuItem>
              {companyList && companyList?.map(option => (
                <MenuItem 
                  key={option.account_id} 
                  value={option.account_id}
                  selected={option.account_id === formData.account_id ? true : false}   
                >
                  {option.account_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Row 3 */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="manager"
              label="Manager *"
              defaultValue={formData.manager}
              onChange={handleChange}
              className='bg-white'
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              name="function_group"
              label="Function Group *"
              defaultValue={formData.function_group}
              onChange={handleChange}
              className='bg-white'
            >
              <MenuItem value="">Select Functional Group *</MenuItem>
              {functionalGroupOptions.map(option => (
                <MenuItem 
                  key={option.name} 
                  value={option.name}
                  selected={option.name === formData.name ? true : false}   
                >
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
              defaultValue={formData.contact_number}
              className='bg-white'
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              name="team_id"
              label="Team *"
              defaultValue={formData.team_id}
              onChange={handleChange}
              className='bg-white'
            >
              <MenuItem value="">Select Team *</MenuItem>
              {teamList.map(option => (
                <MenuItem 
                  key={option.team_id} 
                  value={option.team_id}
                  selected={option.team_id === formData.team_id ? true : false}   
                >
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
              defaultValue={formData.time_zone}
              onChange={handleChange}
              className='bg-white'
            >
              <MenuItem value="">Select Time Zone *</MenuItem>
              {timeZoneOptions.map(option => (
                <MenuItem 
                  key={option.id} 
                  value={option.name}
                  selected={option.time_zone == formData.time_zone ? true : false}
                >
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
              defaultValue={formData.email}
              className='bg-white'
            />
          </Grid>

          {/* Row 6 */}
          <Grid item xs={6}>
          <TextField
              fullWidth
              name="working_hours"
              label="Working Hours *"
              onChange={handleChange}
              defaultValue={formData.working_hours}
              className='bg-white'
            />
          </Grid>
          <Grid item xs={6}>
          <TextField
              fullWidth
              select
              name="work_location"
              label="Work Location *"
              onChange={handleChange}
              defaultValue={formData.work_location}
              className='bg-white'
            >
              {/*countriesListJSON.map((item)=>( 
                    <MenuItem
                      value={item.name}
                      selected={formData.country == item.name ? true : false}
                    >
                      {item.name}
                    </MenuItem>
              ))*/}
                  </TextField>

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
      {isEdit
      ?
        <button 
          onClick={(e)=>updatePrimaryContactsRequest(
            e,
            contactsData.primary_contacts_id,
            formData,
            selectedFile,
            fileData
          )}
          className='bg-[#26BADA]  
          text-white rounded-md px-4 py-2 min-w-[120px] uppercase'
        >Edit</button>
      :
        <button 
          onClick={(e)=>createPrimaryContactsRequest(
            e,
            formData,
            selectedFile,
            fileData
          )}
          className='bg-[#26BADA]  
          text-white rounded-md px-4 py-2 min-w-[120px] uppercase'
        >Add</button>}
       <button className='bg-[#E8ECEF]  text-[#778CA2] rounded-md px-4 py-2 min-w-[120px] uppercase' onClick={handleClose}>Cancel</button>
      </DialogActions>      
    </Dialog >
  );
};

export default NewContactTest;
