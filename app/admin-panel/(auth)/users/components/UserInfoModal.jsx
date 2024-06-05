"use client";

import React, { useEffect, useState } from "react";

import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, MenuItem, Button, Alert, } from '@mui/material';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { countriesStatesCitiesListJSON } from "@/components/data/countries_states_cities";
import { Edit } from "lucide-react";
import { BsCloudUpload } from "react-icons/bs";
import SearchingListInput from "@/components/forms/SearchingListInput";
import { getAllUsersAction } from "@/app/api/users/action/user";
import { getAllFunctionalGroupAction } from "@/app/api/contacts/actions/functionalGroup";
import moment from 'moment-timezone';
import { citiesListJSON } from "@/components/data/city";
import { trim } from "jquery";
import { generatePassword } from "@/app/api/util/utility";
import { createUserRequest, updaateUserRequest } from "@/app/api/users/script";
import { countriesWithNoStatesJSON } from "@/components/data/countryNoStates";



export default function UserInfoModal(props) {
  const { handleClose, isOpen } = props

  const [selectedFile, setSelectedFile] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [keyChange, setKeyChange] = useState("");
  const [fileData, setFileData] = useState(null);
  const [isFormDataChanged, setIsFormDataChanged] = useState(false)
  const [isEdit, setIsEdit] = useState(props.modalType && props.modalType == 'edit' ? true : false)
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState(`@${props.tenantDetails.fullDomainURL}`);
  const [passwd, setPasswd] = useState(generatePassword());
  const [cityList, setCityList] = useState([]);
  const [stateList, setStateList] = useState([]);
    

  
  const [formData, setFormData] = useState({
    company_name: props?.modalData?.company_name ? props?.modalData?.company_name : props.tenantDetails.domainName,
    user_name: props?.modalData?.user_name ? props?.modalData?.user_name : '',
    email: props?.modalData?.email ? props?.modalData?.email : '',
    user_role: props?.modalData?.user_role ? props?.modalData?.user_role : '',
    active: props?.modalData?.active != undefined ? props?.modalData?.active : true,
    profile_image: props?.modalData?.profile_image ? props?.modalData?.profile_image : '',
    first_name: props?.modalData?.first_name ? props?.modalData?.first_name : '',
    last_name: props?.modalData?.last_name ? props?.modalData?.last_name : '',
    contact_number: props?.modalData?.contact_number ? props?.modalData?.contact_number : '',
    job_title: props?.modalData?.job_title ? props?.modalData?.job_title : '',
    manager: props?.modalData?.manager ? props?.modalData?.manager : '',
    functional_group: props?.modalData?.functional_group ? props?.modalData?.functional_group : '',
    work_location: props?.modalData?.work_location ? props?.modalData?.work_location : '',
    state: props?.modalData?.state ? props?.modalData?.state : '',
    city: props?.modalData?.city ? props?.modalData?.city : '',
    time_zone: props?.modalData?.time_zone ? props?.modalData?.time_zone : '',
    work_hours_start: props?.modalData?.work_hours_start ? props?.modalData?.work_hours_start : '',
    work_hours_end: props?.modalData?.work_hours_end ? props?.modalData?.work_hours_end : '',
    password: props?.modalData?.password ? props?.modalData?.password : passwd,
    cpassword: props?.modalData?.password ? props?.modalData?.password : '',
  });
  const [usersList, setUsersList] = useState([]);
  const [functionalList, setFunctionalList] = useState([]);


  useEffect(() => {
    getAllUsersAction("")
      .then((resp) => {
        const list = resp.data;
        setUsersList(
          list.map((rec, index) => ({
            id: rec.user_id,
            name: rec.first_name + ' ' + rec.last_name
          }))
        );
      })
      .catch((err) => { });
  }, []);



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
      .catch((err) => { });
  }, []);


  const handleUsersSelect = (user) => {
    if (!isFormDataChanged) {
      setFormData({ ...props.modalData, manager: user.name });
    } else {
      setFormData({ ...formData, manager: user.name });
    }
    setIsFormDataChanged(true);
    setUserName(user.name)
  };


  const handleChange = (e) => {
    if (!isFormDataChanged) {
      setFormData({ ...props.modalData, [e.target.name]: e.target.value, company_name: props.tenantDetails.domainName, password: passwd, cpassword: passwd });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value});
    }
    setIsFormDataChanged(true);
  }


  const handleChangeEmail = (e) => {
    let email = e.target.value;
    const username =  email.split('@')[0].replace(/\s+/g, '');
    const new_email = `${username}@${props.tenantDetails.fullDomainURL}`; 
    setUserEmail(new_email);

    if (!isFormDataChanged) {
      setFormData({ ...props.modalData, email: email, user_name: new_email });
    } else {
      setFormData({ ...formData, email: email, user_name: new_email });
    }
    setIsFormDataChanged(true);
  }

  const email = `${userEmail}@${props.tenantDetails.fullDomainURL}`;


  const handleChangePhone = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedInput = input
      .replace(/(\d{3})(\d{0,3})(\d{0,4})/, '$1-$2-$3') // Format the input as 111-111-1111
      .substring(0, 12); // Limit to 12 characters (including hyphens)

    if (!isFormDataChanged) {
      setFormData({ ...props.modalData, contact_number: formattedInput });
    } else {
      setFormData({ ...formData, contact_number: formattedInput });
    }
    setIsFormDataChanged(true);
  };


  const handleTimeZoneChange = (e) => {
    // Calculate working hours based on the selected time zone
    const { start, end } = getWorkingHoursInTimeZone(e.target.value);

    if (!isFormDataChanged) {
      setFormData({ ...props.modalData, time_zone: e.target.value, work_hours_start: start + ' - ' + end });
    } else {
      setFormData({ ...formData, time_zone: e.target.value, work_hours_start: start + ' - ' + end });
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

  const handleHoursChange = (e) => {

    if (!isFormDataChanged) {
      setFormData({ ...props.modalData, work_hours_start: e.target.value, });
    } else {
      setFormData({ ...formData, work_hours_start: e.target.value, });
    }
    setIsFormDataChanged(true);
  };

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


  /*const handleChangeCountry = (e) => {
    if (!isFormDataChanged) {
      setFormData({ ...props.modalData, work_location: e.target.value, });
      setCityList(citiesListJSON[e.target.value]);
    } else {
      setFormData({ ...formData, work_location: e.target.value, });
      setCityList(citiesListJSON[e.target.value]);
    }    
    setIsFormDataChanged(true);
  };*/


  let states = []
  let cities = [] 
  try{
    if(props?.modalData?.work_location){
      states = countriesStatesCitiesListJSON.filter((item) => item.name === props?.modalData?.work_location)[0].states;      
    }
    if(props?.modalData?.state){
      cities = states.filter((item) => item.name === props?.modalData?.state)[0].cities;
    } else {
      cities = states
      states = []
    }
  } catch {}
  

  const handleChangeValues = (e)=>{
    if(isEdit && !isFormDataChanged) {
      setFormData({...modalData, [e.target.name]: e.target.value});
    } else {
      setFormData({...formData, [e.target.name]: e.target.value});
    }

    // set state , city lists
    try{
      if(e.target.name === 'city'){
        let country = ''
        if(isEdit && !isFormDataChanged) country = modalData.work_location
        else country = formData.work_location
        let states = countriesStatesCitiesListJSON.filter((item) => item.name === country)[0].states;
        if(states.length && countriesWithNoStatesJSON.includes(country)) {      
          setStateList([]);
          setCityList(states)
        } else {
          let state = ''
          if(isEdit && !isFormDataChanged) state = modalData.state
          else state = formData.state
          let cities = states.filter((item) => item.name === state)[0].cities;        
          setCityList(cities);
          setStateList(states)
        }  
      }       
    } catch {}
    setIsFormDataChanged(true); 
  };

  const handleChangeCountry = (e) => {  
      if(isEdit && !isFormDataChanged){
        setFormData({...props.modalData, work_location: e.target.value, state: '', city: ''});
      } else {
        setFormData({...formData, work_location: e.target.value, state: '', city: ''});
      }  

      let states = countriesStatesCitiesListJSON.filter((item) => item.name === e.target.value)[0].states;
      if(states.length && countriesWithNoStatesJSON.includes(e.target.value)) {      
        setStateList([]);
        setCityList(states)
      } else {
        setCityList([]);
        setStateList(states)
      }      
      setIsFormDataChanged(true);
  };

  const handleChangeState = (e) => {
    if(isEdit && !isFormDataChanged){
      setFormData({...props.modalData, state: e.target.value, city: ''});
    } else {
      setFormData({...formData, state: e.target.value, city: ''});
    }

    let states = []
    if(isEdit && !isFormDataChanged) {
      states = countriesStatesCitiesListJSON.filter((item) => item.name === props.modalData.work_location)[0].states; 
    } else {
      states = countriesStatesCitiesListJSON.filter((item) => item.name === formData.work_location)[0].states;
    }
    setStateList(states);
    
    let cities = []
    if(isEdit && !isFormDataChanged) {
      cities = states.filter((item) => item.name === e.target.value)[0].cities;      
    } else {
      cities = states.filter((item) => item.name === e.target.value)[0].cities;  
    }
    setCityList(cities)    
    setIsFormDataChanged(true);
  };

  const userRole = [
    { id: 1, name: "User" },
    { id: 2, name: "Administrator" },
  ];






  return (

    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md" >
      <DialogTitle className='flex items-center justify-between'>
        <span>{isEdit ? 'EDIT USER' : 'ADD USER'}</span>
        <IoMdCloseCircleOutline className='text-[#778CA2] cursor-pointer' onClick={handleClose} />
      </DialogTitle>
      <DialogContent className='bg-[#F2F4F6]' id="dialogContainer">
        <Grid container spacing={2} className='mt-2'>
          <Grid item xs={12} className="mb-2">
            {selectedImage ? (
              <label htmlFor="img" className="relative cursor-pointer border-2 border-dashed border-gray-300 flex items-center justify-center text-lg text-gray-700 rounded-lg p-6 text-center">
                <input type="file" name="img" id="img" className="hidden" onChange={handleImageChange} />
                <span className="block m-auto w-20 h-20 rounded-full overflow-hidden">
                  <img src={URL.createObjectURL(selectedImage)} alt="Preview" width={85} height={85} className="rounded-full object-contain" />
                </span>
                <Edit />
              </label>) : (
              !isFormDataChanged && isEdit && props.modalData?.profile_image
                ?
                <label htmlFor="img" className="relative cursor-pointer border-2 border-dashed border-gray-300 flex items-center justify-center text-lg text-gray-700 rounded-lg p-6 text-center">
                  <input type="file" name="img" id="img" className="hidden" onChange={handleImageChange} />
                  <span className="block m-auto overflow-hidden">
                    <img src={props.modalData?.profile_image ? props.modalData?.profile_image : '/avatar.png'} alt="Preview" width={85} height={85} className=" rounded-full object-cover" />
                  </span>
                  <Edit />
                </label>
                :
                formData.profile_image
                  ?
                  <label htmlFor="img" className="relative cursor-pointer border-2 border-dashed border-gray-300 flex items-center justify-center text-lg text-gray-700 rounded-lg p-6 text-center">
                    <input type="file" name="img" id="img" className="hidden" onChange={handleImageChange} />
                    <span className="block m-auto w-20 h-20 rounded-full overflow-hidden">
                      <img src={formData.profile_image} alt="Preview" width={85} height={85} className="rounded-full object-cover" />
                    </span>
                    <Edit />
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

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="first_name"
              label="First Name *"
              onChange={handleChange}
              defaultValue={props?.modalData?.first_name ? props?.modalData?.first_name : formData.first_name}
              className='bg-white'
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="last_name"
              label="Last Name *"
              onChange={handleChange}
              defaultValue={props?.modalData?.last_name ? props?.modalData?.last_name : formData.last_name}
              className='bg-white'
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="job_title"
              label="Job Title *"
              defaultValue={props?.modalData?.job_title ? props?.modalData?.job_title : formData.job_title}
              onChange={handleChange}
              className='bg-white'
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="company_name"
              label="Company Name"
              value={props?.modalData?.domain_url ? props?.modalData?.domain_url : props?.tenantDetails?.domainName}
              disabled={true}
            />
          </Grid>


          <Grid item xs={6}>
            <SearchingListInput
              allSearchList={usersList}
              onListSelect={handleUsersSelect}
              placeHolder={"Search manager... "}
              selectedValue={props?.modalData?.manager ? props?.modalData?.manager : formData.manager}
              className='bg-white'
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              name="functional_group"
              label="Functional Group *"
              defaultValue={props?.modalData?.functional_group ? props?.modalData?.functional_group : formData.functional_group}
              onChange={handleChange}
              className='bg-white'
            >
              <MenuItem value="">Select Functional Group *</MenuItem>
              {functionalList.map(option => (
                <MenuItem
                  key={option.name}
                  value={option.name}
                >
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              //disabled={isEdit ? true : false}
              value={!isFormDataChanged && props?.modalData?.email ? props?.modalData?.email : userEmail }
              onChange={handleChangeEmail}
              className='bg-white'
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="user_name"
              label="User Name *"
              disabled={true}
              onChange={handleChange}
              value={!isFormDataChanged && props?.modalData?.user_name ? props?.modalData?.user_name : userEmail}

            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="contact_number"
              label="Contact Number *"
              onChange={handleChangePhone}
              defaultValue={props?.modalData?.contact_number ? props?.modalData?.contact_number : formData.contact_number}
              className='bg-white'
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
                fullWidth
                select
                name="work_location"
                label="Select Country *"
                variant="outlined"
                onChange={handleChangeCountry}
                defaultValue={props?.modalData?.work_location ? props?.modalData?.work_location :formData.work_location} 
                className='bg-white'
              >                  
                {countriesStatesCitiesListJSON.map((item)=>( 
                  <MenuItem
                    value={item.name}
                    selected={props?.modalData?.work_location ? (props?.modalData.work_location == item.name ? true : false) : (formData.work_location == item.name ? true : false)}
                  >
                    {item.name}
                  </MenuItem>
                ))}                
              </TextField>                               
          </Grid>
          {states.length || stateList.length 
          ?<Grid item xs={6} md={6}>
            <TextField
                fullWidth
                select
                name="stage"
                label="Select State *"
                variant="outlined"
                onChange={handleChangeState}
                defaultValue={props?.modalData?.state ? props?.modalData?.state : formData.state}
                className='bg-white'
              >                 
                
                {isEdit && !isFormDataChanged
                ?
                states && states.map((item) => (
                  <MenuItem
                    key={item.name}
                    value={item.name}
                    selected={props?.modalData?.state ? (props?.modalData.state == item.name ? true : false) : false}
                  >
                    {item.name}
                  </MenuItem>
                ))
                :
                stateList && stateList.map((item) => (
                  <MenuItem
                    key={item.name}
                    value={item.name}
                    selected={props?.modalData?.state ? (props?.modalData.state == item.name ? true : false) : false}
                  >
                    {item.name}
                  </MenuItem>
                ))}                  
              </TextField>             
          </Grid>
          :''}
          <Grid item xs={6} md={6}>
            <TextField
                fullWidth
                select
                name="city"
                label="Select City *"
                variant="outlined"
                onChange={handleChangeValues}
                defaultValue={props?.modalData?.city ? props?.modalData?.city : formData.city}
                className='bg-white'
              >                  
                {isEdit && !isFormDataChanged
                ?
                cities && cities.map((item) => (
                  <MenuItem
                    key={item.name}
                    value={item.name}
                  >
                    {item.name}
                  </MenuItem>
                ))
                :
                cityList && cityList.map((item) => (
                  <MenuItem
                    key={item.name}
                    value={item.name}
                  >
                    {item.name}
                  </MenuItem>
                ))}                  
              </TextField>             
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              name="user_role"
              label="User Role *"
              onChange={handleChange}
              defaultValue={props?.modalData?.user_role ? props?.modalData?.user_role : formData.user_role}
              className='bg-white'
            >
              <MenuItem value="">Select User Role *</MenuItem>
              {userRole.map(option => (
                <MenuItem
                  key={option.name}
                  value={option.name}
                >
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              name="active"
              label="Active *"
              onChange={handleChange}
              defaultValue={props?.modalData?.email
                ? (props?.modalData?.active)
                : (formData.active)}
              className='bg-white'
            >
              <MenuItem value="">Select Active Status *</MenuItem>
              <MenuItem key={'Active'} value={true}  >Active</MenuItem>
              <MenuItem key={'In Active'} value={false} >In Active</MenuItem>

            </TextField>
          </Grid>

          {/* <Grid item xs={6}></Grid>  */}

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              name="time_zone"
              label="Time Zone *"
              defaultValue={props?.modalData?.time_zone ? props?.modalData?.time_zone : formData.time_zone}
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

          <Grid item xs={6}>
            <TextField
              name="work_hours_start"
              label="Work Hours *"
              onChange={handleHoursChange}
              defaultValue={props?.modalData?.work_hours_start ? props?.modalData?.work_hours_start : formData.work_hours_start}
              className='bg-white w-full'
              type="text"
            />
            {/* <TextField
              name="work_hours_end"
              label="Work Hours End *"
              onChange={handleChange}
              defaultValue={props?.modalData?.work_hours_end ? props?.modalData?.work_hours_end : formData.work_hours_end}
              className='bg-white w-50'
              type="time"
            />
            <TextField
              fullWidth
              label="Work Hours *"
              defaultValue={props?.modalData?.work_hours_start && props?.modalData?.work_hours_end ? props?.modalData?.work_hours_start + ' - '+ props?.modalData?.work_hours_end : formData?.work_hours_start +' - '+formData?.work_hours_end }
              className='bg-white w-full'
              type="text" 
              onChange={handleHoursChange}             
            />             */}
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="password"
              label="Password *"
              onChange={handleChange}
              defaultValue={isEdit ? '**************' : formData.password}
              className='bg-white'
              type="text"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="cpassword"
              label="Confirm Password *"
              onChange={handleChange}
              defaultValue={isEdit ? '**************' : formData.cpassword}
              className='bg-white'
              type="text"
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
      </DialogContent >
      <DialogActions className='flex items-center justify-between py-3 px-6'>
        
        {isEdit
          ?
          <button
            onClick={(e) =>
              updaateUserRequest(
                e,
                handleClose,
                !isFormDataChanged && isEdit ? props?.modalData : formData,
                props?.modalData?.user_id,
                props.apiBackendURL,
                props.accessToken,
                props.tenantID,
                selectedFile,
                fileData
              )
            }
            type="button"
            className='bg-[#26BADA]  
            text-white rounded-md px-4 py-2 min-w-[120px] uppercase'
          >
            SAVE
          </button>
          :
          <button
            onClick={(e) =>
              createUserRequest(
                e,
                handleClose,
                formData,
                props.apiBackendURL,
                props.accessToken,
                props.tenantID,
                selectedFile,
                fileData
              )
            }
            type="button"
            className="bg-[#26BADA]  
            text-white rounded-md px-4 py-2 min-w-[120px] uppercase"
          >
            ADD
          </button>}

          <button
            onClick={handleClose}
            className='bg-[#E8ECEF]  text-[#778CA2] rounded-md px-4 py-2 min-w-[120px] uppercase'
            >
            Cancel
          </button>
      </DialogActions>
    </Dialog >
  );
}
