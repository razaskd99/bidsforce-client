'use client'
import React,{useState, useEffect} from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Grid,
    Alert,
  } from "@mui/material";
import { BsCloudUpload } from "react-icons/bs";
import Multiselect from 'multiselect-react-dropdown';

import SearchingListInput from "../forms/SearchingListInput";
import { Edit } from "lucide-react";
import { createAccountRequest, updateAccountRequest } from "@/app/api/accounts/script";
import { IoCloseCircle } from "react-icons/io5";
import { Close } from "@mui/icons-material";
import { countriesStatesCitiesListJSON } from "../data/countries_states_cities";
import { countriesWithNoStatesJSON } from "../data/countryNoStates";



export default function NewAccounts({
  isOpen,
  handleClose,
  modalData,
  modalType,
  allAccountsTypeRecord,
  contactsRecords,
  accountTypeEntries
}) {
  
    const [accountTypeID, setAccountTypeID] =useState('');
    const [accountTypeName, setAccountTypeName] =useState('');
    const [accountOwnerID, setAccountOwnerID] =useState('');
    const [accountOwnerName, setAccountOwnerName] =useState('');
    const [cityList, setCityList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileData, setFileData] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEdit, setIsEdit] = useState(modalType && modalType == 'edit' ? true : false);
    const [isFormDataChanged, setIsFormDataChanged] = useState(false);
    const [selectedAccountTypeList, setSelectedAccountTypeList] = useState([]);    
    const [accountTypeList, setAccountTypeList] = useState(
      allAccountsTypeRecord?.map((rec, index) => ({
        id: rec.account_type_id,
        name: rec.type_name    
      }))
    );
    const [contactList, setContactList] = useState(
      contactsRecords?.map((rec, index) => ({
        id: rec.user_id,
        name: rec.first_name + ' ' + rec.last_name    
      }))
    );    
    
   

    const [formData, setFormData] = useState({
      account_name: modalData && modalData.account_name ? modalData.account_name : "",
      account_type_id: modalData && modalData.account_type_id ? modalData.account_type_id : accountTypeID,
      account_owner_id: modalData && modalData.account_owner_id ? modalData.account_owner_id : accountOwnerID,
      street: modalData && modalData.street ? modalData.street : "",
      city: modalData && modalData.city ? modalData.city : "",
      postal_code: modalData && modalData.postal_code ? modalData.postal_code : "",
      country: modalData && modalData.country ? modalData.country : "",
      owner_name: modalData && modalData.owner_name ? modalData.owner_name : "",
      type_name: modalData && modalData.type_name ? modalData.type_name : "",
      account_image: modalData && modalData.account_image ? modalData.account_image : "",
      data: "",
      state: modalData && modalData.state ? modalData.state : "",
    });
   

    let states = []
    let cities = [] 
    try{
      if(modalData?.country){
        states = countriesStatesCitiesListJSON.filter((item) => item.name === modalData?.country)[0].states;      
      }
      if(modalData?.state){
        cities = states.filter((item) => item.name === modalData?.state)[0].cities;
      } else {
        cities = states
        states = []
      }
    } catch {}
    

  const handleChangeValues = (e)=>{
    if(isEdit && !isFormDataChanged) {
      setFormData({...modalData, [e.target.name]: e.target.value});
      setSelectedAccountTypeList(accountTypeEntries);      
    } else {
      setFormData({...formData, [e.target.name]: e.target.value});
    }

    // set state , city lists
    try{
      if(e.target.name === 'city'){
        let country = ''
        if(isEdit && !isFormDataChanged) country = modalData.country
        else country = formData.country
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
        setFormData({...modalData, country: e.target.value, state: '', city: ''});
      } else {
        setFormData({...formData, country: e.target.value, state: '', city: ''});
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
      setFormData({...modalData, state: e.target.value, city: ''});
    } else {
      setFormData({...formData, state: e.target.value, city: ''});
    }

    let states = []
    if(isEdit && !isFormDataChanged) {
      states = countriesStatesCitiesListJSON.filter((item) => item.name === modalData.country)[0].states; 
      setSelectedAccountTypeList(accountTypeEntries);      
    } else {
      states = countriesStatesCitiesListJSON.filter((item) => item.name === formData.country)[0].states;
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


  const handleAccountOwnerSelect = (account) => {
    if(isEdit && !isFormDataChanged) {
      setFormData({...modalData, account_owner_id: account.id, owner_name: account.name});
    } else {
      setFormData({...formData, account_owner_id: account.id, owner_name: account.name});
    }
    setAccountOwnerID(account.id)
    setAccountOwnerName(account.name)
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
  };


  const handleChangeMultiSelect = data => {
    if(isEdit && !isFormDataChanged) {
      setFormData({...modalData});
    } else {
      setFormData({...formData});
    }
    setSelectedAccountTypeList(data);   
    setIsFormDataChanged(true);
  };


  
 
  return (    
    <>
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>        <span>{isEdit ? 'Edit Account' : 'Add Account'} </span>  
      </DialogTitle>
      <DialogContent>
        <form id="modalform1">
          <Grid container spacing={2} style={{ marginTop: 3 }}> 
          
          {/* Input */}
          <Grid item xs={12}>
            {selectedImage ? (
                <label htmlFor="img" className="relative cursor-pointer border-2 border-dashed border-gray-300 flex items-center justify-center text-lg text-gray-700 rounded-lg p-6 text-center">
                <input type="file" name="img" id="img" className="hidden" onChange={handleImageChange} />
                <span className="block m-auto w-20 h-20 rounded-full overflow-hidden">
                <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="w-full h-full object-cover" />
                </span>
                <Edit/>
              </label>)  : (
                !isFormDataChanged && isEdit
               ?               
                <label htmlFor="img" className="relative cursor-pointer border-2 border-dashed border-gray-300 flex items-center justify-center text-lg text-gray-700 rounded-lg p-6 text-center">
                  <input type="file" name="img" id="img" className="hidden" onChange={handleImageChange} />
                  <span className="block m-auto w-20 h-20 rounded-full overflow-hidden">
                    <img src={modalData?.account_image ? modalData?.account_image : '/avatar.png'} alt="Preview" className="w-full h-full object-cover" />
                  </span>
                  <Edit/>
                </label>                
             
               :
               formData.account_image
               ?
               <label htmlFor="img" className="relative cursor-pointer border-2 border-dashed border-gray-300 flex items-center justify-center text-lg text-gray-700 rounded-lg p-6 text-center">
                  <input type="file" name="img" id="img" className="hidden" onChange={handleImageChange} />
                  <span className="block m-auto w-20 h-20 rounded-full overflow-hidden">
                    <img src={formData.account_image} alt="Preview" className="w-full h-full object-cover" />
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
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                name="account_name"
                label="Account Name *"
                variant="outlined"
                onChange={handleChangeValues}
                inputProps={{ maxLength: 100 }}
                defaultValue={modalData?.account_name ? modalData?.account_name :formData.account_name} 
              />
            </Grid>
            {/* <Grid item xs={12} md={12}>
              <SearchingListInput 
                  allSearchList = {accountTypeList}
                  onListSelect={handleAccountTypeSelect}
                  placeHolder="Search account type... *"
                  selectedValue={modalData?.type_name ? modalData?.type_name :formData.type_name}
                /> 
            </Grid> */}
            <Grid item xs={12} md={12}>
                <Multiselect
                  options={accountTypeList} // Options to display in the dropdown
                  selectedValues={isEdit && !isFormDataChanged && accountTypeEntries.length ? accountTypeEntries : selectedAccountTypeList} // Preselected value to persist in dropdown
                  onSelect={handleChangeMultiSelect} // Function will trigger on select event
                  onRemove={handleChangeMultiSelect} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                  showArrow={true}
                  keepSearchTerm={true}
                  placeholder="Select account type *"
                  className="profileMultiSelect"
                  customCloseIcon={<Close/>}
                  style={{
                    chips: {
                      color: '#ffffff', // text-white
                      borderRadius: '0.375rem', // rounded-md
                      padding: '0.25rem 0.5rem', // px-2 py-1
                      margin: '0.25rem', // m-
                      fontSize:'text-md',
                    },
                    searchBox: { 
                      display: 'felx',
                      alignItems: 'center',
                      border: 'border-gray-300',
                      borderRadius: 'rounded-md',
                      padding: 'px-4 py-4',
                      width: 'w-full',
                      height: '56px',
                      background: 'bg-white',
                      font:'text-md'
                    },
                    multiselectContainer: {},
                  }}
                />
            </Grid>            
            <Grid item xs={12} md={12}>
              <SearchingListInput 
                  allSearchList = {contactList}
                  onListSelect={handleAccountOwnerSelect}
                  placeHolder={"Search account owner... *"}
                  selectedValue={modalData?.owner_name ? modalData?.owner_name :formData.owner_name}
                /> 
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                name="street"
                label="Street *"
                variant="outlined"
                onChange={handleChangeValues}
                inputProps={{ maxLength: 100 }}  
                defaultValue={modalData?.street ? modalData?.street :formData.street}
              />
            </Grid>            
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                name="postal_code"
                label="Postal Code *"
                variant="outlined"
                onChange={handleChangeValues}
                inputProps={{ maxLength: 100 }} 
                defaultValue={modalData?.postal_code ? modalData?.postal_code :formData.postal_code} 
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                  fullWidth
                  select
                  name="country"
                  label="Select Country *"
                  variant="outlined"
                  onChange={handleChangeCountry}
                  defaultValue={modalData?.country ? modalData?.country :formData.country} 
                >                  
                  {countriesStatesCitiesListJSON.map((item)=>( 
                    <MenuItem
                      value={item.name}
                      selected={modalData?.country ? (modalData.country == item.name ? true : false) : (formData.country == item.name ? true : false)}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                  
                </TextField>   
                             
            </Grid>
            {states.length || stateList.length 
            ?<Grid item xs={12} md={12}>
              <TextField
                  fullWidth
                  select
                  name="stage"
                  label="Select State *"
                  variant="outlined"
                  onChange={handleChangeState}
                  defaultValue={modalData?.state ? modalData?.state : formData.state}
                >                 
                  
                  {isEdit && !isFormDataChanged
                  ?
                  states && states.map((item) => (
                    <MenuItem
                      key={item.name}
                      value={item.name}
                      selected={modalData?.state ? (modalData.state == item.name ? true : false) : false}
                    >
                      {item.name}
                    </MenuItem>
                  ))
                  :
                  stateList && stateList.map((item) => (
                    <MenuItem
                      key={item.name}
                      value={item.name}
                      selected={modalData?.state ? (modalData.state == item.name ? true : false) : false}
                    >
                      {item.name}
                    </MenuItem>
                  ))}                  
                </TextField>             
            </Grid>
            :''}
            <Grid item xs={12} md={12}>
              <TextField
                  fullWidth
                  select
                  name="city"
                  label="Select City *"
                  variant="outlined"
                  onChange={handleChangeValues}
                  defaultValue={modalData?.city ? modalData?.city : formData.city}
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
            
          </Grid>
        </form>
      </DialogContent>
      <DialogContent>
        <Alert
          severity="error"
          id="modalErrorMessageAlert"
          class="bg-red-100 border border-red-200 text-md text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
          style={{ display: "none" }}
        >
          Invalid Operation.
        </Alert>
        <Alert
          severity="success"
          id="modalSuccessMessageAlert"
          class="bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
          style={{ display: "none" }}
        >
          Operation successful.
        </Alert>
      </DialogContent>
      <div className='flex justify-center items-center gap-3 py-3'>
      {isEdit
      ?
        <button 
        onClick={(e) => {
          updateAccountRequest(
            e,
            handleClose,
            modalData?.account_id, 
            isEdit && !isFormDataChanged ? modalData : formData,
            selectedFile, 
            fileData,
            selectedAccountTypeList
          )}}
          className='bg-[#26BADA]  
          text-white rounded-md px-4 py-2 min-w-[120px] uppercase hover:bg-[#51C8E1]'
        >SAVE</button>
      :
        <button 
        onClick={(e) => { createAccountRequest(
          e,
          handleClose,
          formData,
          selectedFile,
          fileData,
          selectedAccountTypeList
        )}}
          className='bg-[#26BADA]  
          text-white rounded-md px-4 py-2 min-w-[120px] uppercase hover:bg-[#51C8E1]'
        >ADD</button>}
       <button 
        className='bg-[#E8ECEF]  text-[#778CA2] rounded-md px-4 py-2 min-w-[120px] uppercase hover:bg-[#eceff2]' 
        onClick={handleClose}
       >Cancel</button>
      
      </div>
    </Dialog>

          

    </>

  );
};
