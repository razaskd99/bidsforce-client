'use client'
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, MenuItem, Button, Alert, } from '@mui/material';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BsCloudUpload } from "react-icons/bs";
import { countriesListJSON } from "../data/country";
import { Edit } from 'lucide-react';
import moment from 'moment-timezone';
import { getAllFunctionalGroupAction } from '@/app/api/contacts/actions/functionalGroup';
import { updateUserDetailLimited } from '@/app/api/users/script';
import { citiesListJSON } from '../data/city';

const NewContact = ({ isOpen, handleClose, modalType, contactsData}) => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [fileData, setFileData] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEdit, setIsEdit] = useState(modalType && modalType == 'edit' ? true : false)
  const [isFormDataChanged, setIsFormDataChanged] = useState(false)
  const [functionalList, setFunctionalList] = useState([]);
  const [cityList, setCityList] = useState([]);
 
  const [formData, setFormData] = useState({
      job_title: contactsData?.job_title ? contactsData?.job_title : '', 
      // first_name: contactsData?.first_name ? contactsData?.first_name : '', 
      // last_name: contactsData?.last_name ? contactsData?.last_name : '', 
      // manager: contactsData?.manager ? contactsData?.manager : '', 
      //functional_group: contactsData?.functional_group ? contactsData?.functional_group : '', 
      contact_number: contactsData?.contact_number ? contactsData?.contact_number : '', 
      time_zone: contactsData?.time_zone ? contactsData?.time_zone : '', 
      // email: contactsData?.email ? contactsData?.email : '',      
      work_location: contactsData?.work_location ? contactsData?.work_location : '', 
      profile_image: contactsData?.profile_image ? contactsData?.profile_image : '/avatar.png',
      // working_hours: contactsData?.work_hours_start && contactsData?.work_hours_end ? contactsData?.work_hours_start + ' - '+ contactsData?.work_hours_end : '', 
      work_hours_start: contactsData?.work_hours_start ?  contactsData?.work_hours_start : '',
      work_hours_end: contactsData?.work_hours_end ?  contactsData?.work_hours_end : '',
      password: contactsData?.password ?  contactsData?.password : '',
      cpassword: '',
  });

  useEffect(() => {
    getAllFunctionalGroupAction()
      .then((resp) => {
        const list = resp.returnData;
        setFunctionalList(
          list.map((rec) => ({
            id: rec.id,
            name: rec.title   
          }))
        );
      })
      .catch((err) => {});    
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

    setIsFormDataChanged(true);
  };
  

  const handleChange = (e) => {
    if(!isFormDataChanged) {
      setFormData({...contactsData, [e.target.name]: e.target.value});
      //if(e.target.name == 'city') setCityList(citiesListJSON[contactsData.work_location]);
    } else {
      setFormData({...formData, [e.target.name]: e.target.value});
    }
    setIsFormDataChanged(true);
  }

  const handleTimeZoneChange = (e) => {
    
    // Calculate working hours based on the selected time zone
    const { start, end } = getWorkingHoursInTimeZone(e.target.value);

    if(!isFormDataChanged) {
      setFormData({...contactsData, time_zone: e.target.value, work_hours_start:  start +' - '+ end});
    } else {
      setFormData({...formData, time_zone: e.target.value, work_hours_start:  start +' - '+ end});
    }    
    setIsFormDataChanged(true);
    
  };

  const handleHoursChange = (e) => { 
    
    if(!isFormDataChanged) {
      setFormData({...contactsData, work_hours_start: e.target.value,});
    } else {
      setFormData({...formData,  work_hours_start: e.target.value,});
    }    
    setIsFormDataChanged(true);    
  };

  // Function to get working hours based on time zone, considering daylight saving time
  const getWorkingHoursInTimeZone = (timeZone) => {
    const now = moment().tz(timeZone);
    const isDST = now.isDST(); // Check if daylight saving time is active
    const startHour = isDST ? 10 : 9; // Adjust start hour if DST is active
    const endHour = isDST ? 18 : 17; // Adjust end hour if DST is active
    const startOfWorkingHours = now.clone().set({ hour: startHour, minute: 0, second: 0 });
    const endOfWorkingHours = now.clone().set({ hour: endHour, minute: 0, second: 0 });
    return { start: startOfWorkingHours.format('LT'), end: endOfWorkingHours.format('LT') };
  }; 


  const handleChangeCountry = (e) => {
    if (!isFormDataChanged) {
      setFormData({ ...contactsData, work_location: e.target.value, });
      setCityList(citiesListJSON[e.target.value]);
    } else {
      setFormData({ ...formData, work_location: e.target.value, });
      setCityList(citiesListJSON[e.target.value]);
    }    
    setIsFormDataChanged(true);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm" > 
      <DialogTitle className='flex items-center justify-between'> 
        <span>{isEdit ? 'Edit Contact' : 'Add Contact'} </span>  
        <IoMdCloseCircleOutline className='text-[#778CA2] cursor-pointer' onClick={handleClose} />
      </DialogTitle>
      <DialogContent className='bg-[#F2F4F6]' id="dialogContainer"> 
        <Grid container spacing={2} className='mt-2'>
          {/* Input */}
          <Grid item xs={12}>
          {selectedImage ? (
                <label htmlFor="img" className="relative cursor-pointer border-2 border-dashed border-gray-300 flex items-center justify-center text-lg text-gray-700 rounded-lg p-6 text-center">
                  <input type="file" name="img" id="img" className="hidden" onChange={handleImageChange} />
                  <span className="block m-auto w-20 h-20 rounded-full overflow-hidden">
                  <img src={URL.createObjectURL(selectedImage)} alt="Preview" width={85} height={85} className="rounded-full object-contain" />
                  </span>
                  <Edit/>
                </label>)  : (
                !isFormDataChanged && isEdit && contactsData?.profile_image
               ?               
                <label htmlFor="img" className="relative cursor-pointer border-2 border-dashed border-gray-300 flex items-center justify-center text-lg text-gray-700 rounded-lg p-6 text-center">
                  <input type="file" name="img" id="img" className="hidden" onChange={handleImageChange} />
                  <span className="block m-auto overflow-hidden">
                    <img src={contactsData?.profile_image ? contactsData?.profile_image : '/avatar.png'} alt="Preview" width={85} height={85} className=" rounded-full object-cover" />
                  </span>
                  <Edit/>
                </label>                             
               :
               formData.profile_image
               ?
                <label htmlFor="img" className="relative cursor-pointer border-2 border-dashed border-gray-300 flex items-center justify-center text-lg text-gray-700 rounded-lg p-6 text-center">
                  <input type="file" name="img" id="img" className="hidden" onChange={handleImageChange} />
                  <span className="block m-auto w-20 h-20 rounded-full overflow-hidden">
                    <img src={formData.profile_image} alt="Preview"  width={85} height={85} className="rounded-full object-cover" />
                  </span>
                  <Edit/>
                </label>
              :
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
              defaultValue={contactsData?.first_name ? contactsData?.first_name : formData.first_name}
              onChange={handleChange}
              className='bg-white'
              disabled={true}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="last_name"
              label="Last Name *"
              onChange={handleChange}
              defaultValue={contactsData?.last_name ? contactsData?.last_name : formData.last_name}
              className='bg-white'
              disabled={true}
            />
          </Grid>

          {/* Row 2 */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="job_title"
              label="Job Title *"
              defaultValue={contactsData?.job_title ? contactsData?.job_title : formData.job_title}
              onChange={handleChange}
              className='bg-white'
            />
          </Grid>

          {/* Row 3 */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="manager"
              label="Manager *"
              defaultValue={contactsData?.manager ? contactsData?.manager : formData.manager}
              onChange={handleChange}
              className='bg-white'
              disabled={true}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              name="functional_group"
              label="Functional Group *"
              defaultValue={contactsData?.functional_group ? contactsData?.functional_group : formData.functional_group}
              onChange={handleChange}
              className='bg-white'
              disabled={true}
            >
              <MenuItem value="">Select Functional Group *</MenuItem>
              {functionalList.map(option => (
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
              defaultValue={contactsData?.contact_number ? contactsData?.contact_number : formData.contact_number}
              className='bg-white'
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email *"
              onChange={handleChange}
              defaultValue={contactsData?.email ? contactsData?.email : formData.email}
              className='bg-white'
              disabled={true}
            />
          </Grid>
          {/* Row 5 */}
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              name="time_zone"
              label="Time Zone *"
              defaultValue={contactsData?.time_zone ? contactsData?.time_zone : formData.time_zone}
              onChange={handleTimeZoneChange}
              className='bg-white'
            >
              <MenuItem value="">Select Time Zone *</MenuItem>
              {moment.tz.names().map((option) => (
                <MenuItem 
                  key={option} 
                  value={option}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          

          {/* Row 6 */}
          <Grid item xs={6}>
          <TextField
              name="work_hours_start"
              label="Work Hours *"
              onChange={handleHoursChange}
              defaultValue={contactsData?.work_hours_start ? contactsData?.work_hours_start : formData.work_hours_start}
              className='bg-white w-full'
              type="text"
            />
          </Grid>
          {/*<Grid item xs={6}>
          <TextField
              fullWidth
              select
              name="work_location"
              label="Work Location *"
              onChange={handleChange}
              defaultValue={contactsData?.work_location ? contactsData?.work_location : formData.work_location}
              className='bg-white'
            >
              {countriesListJSON.map((item)=>( 
                    <MenuItem
                      value={item.name}
                      selected={formData.country == item.name ? true : false}
                    >
                      {item.name}
                    </MenuItem>
              ))}
            </TextField>
          </Grid>*/}
          <Grid item xs={6}>
            {/*<TextField
              fullWidth
              select
              name="city"
              label="City *"
              onChange={handleChange}
              defaultValue={contactsData?.city ? contactsData?.city : formData.city}
              className='bg-white'
            >
              {!isFormDataChanged
              ?
              citiesListJSON[contactsData?.work_location]?.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                >
                  {item}
                </MenuItem>
              ))
              :
              cityList.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                >
                  {item}
                </MenuItem>
              ))}
              </TextField>*/}
              <TextField
                fullWidth
                name="work_location"
                label="Country, City *"
                onChange={handleChange}
                defaultValue={contactsData?.work_location ? contactsData?.work_location : formData.work_location}
                className='bg-white'
              />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="password"
              label= "Password *"
              onChange={handleChange}
              defaultValue={isEdit ? '**************' : formData.password}
              className='bg-white'
              type="password"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="cpassword"
              label= "Confirm Password *"
              onChange={handleChange}
              defaultValue={isEdit ? '**************' : formData.cpassword}
              className='bg-white'
              type="password"
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
      {isEdit &&
      
        <button 
          onClick={(e)=>updateUserDetailLimited(
            e,
            handleClose,
            formData,
            contactsData?.user_id,
            selectedFile,
            fileData
          )}
          className='bg-[#26BADA]  
          text-white rounded-md px-4 py-2 min-w-[120px] uppercase'
        >SAVE</button>
      
      }
       <button className='bg-[#E8ECEF]  text-[#778CA2] rounded-md px-4 py-2 min-w-[120px] uppercase' onClick={handleClose}>Cancel</button>
      </DialogActions>      
    </Dialog >
  );
};

export default NewContact;
