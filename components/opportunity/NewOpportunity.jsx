"use client";
import React from "react";

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
import { useState, useEffect, useRef } from "react";
import { generateOpportunityNumber, generateUniqueSixDigitNumber } from "@/app/api/util/utility";
import { getMaxOpportunityByID } from "@/app/api/opportunities/action/opportunity";
import { countriesListJSON } from "../data/country";
import { createOpportunityRequest, updateOpportunityRequest } from "@/app/api/opportunities/scripts";
import {currenciesJSON} from '@/components/data/currencies'
import SearchingListInput from "../forms/SearchingListInput"
import { showModalError } from "@/app/api/rfx/utility";

const NewOpportunity = (props) => {

  const {
    isOpen,
    handleClose,  
    modalType,
    modalData, 
    contactsRecords,
    oppSalesStagesList,
    salesPursuitProgressList,
    businessLineList,
    oppCommForSalesBudgetList,
    biddingUnitList,
    projectTypeList,
    opportunityTypeList
  } = props;
  
  const [isEdit, setIsEdit] = useState(modalType && modalType == 'edit' ? true : false);
  const [isFormDataChanged, setIsFormDataChanged] = useState(false);
  const [accountOwnerID, setAccountOwnerID] =useState('');
  const [accountOwnerName, setAccountOwnerName] =useState('');
  const [oppValue, setOppValue] = useState('');  
  const [currency, setCurrency] = useState('');
  const [shouldResetCurrency, setShouldResetCurrency] = useState(false);

  const [opportunityNumber, setOpportunityNumber] = useState(
    generateOpportunityNumber()
  );
  const [contactList, setContactList] = useState(
    contactsRecords?.map((rec, index) => ({
      id: rec.user_id,
      name: rec.first_name + ' ' + rec.last_name    
    }))
  ); 
  

  const accountList = props?.accountRecords?.map((item) => ({
    id: item.account_id,
    name: item.account_name,        
  }));  
  const [currentDate] = useState(() => {
    // Get the current date in YYYY-MM-DD format
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });


  const [formData, setFormData] = useState({
    opp_number: modalData && modalData.opp_number ? modalData.opp_number : opportunityNumber,
    opp_title: modalData && modalData.opp_title ? modalData.opp_title : "",
    customer_id: modalData && modalData.customer_id ? modalData.customer_id : ' ',
    enduser_id: modalData && modalData.enduser_id ? modalData.enduser_id : '',
    enduser_project: modalData && modalData.enduser_project ? modalData.enduser_project : "",
    opp_value: modalData && modalData.opp_value ? modalData.opp_value : "0.00",
    opp_currency: modalData && modalData.opp_currency ? modalData.opp_currency : "",
    opp_sale_stage: modalData && modalData.opp_sale_stage ? modalData.opp_sale_stage : "",
    opp_pursuit_progress: modalData && modalData.opp_pursuit_progress ? modalData.opp_pursuit_progress : "",
    opp_business_line: modalData && modalData.opp_business_line ? modalData.opp_business_line : "",
    opp_comm_sales_budget: modalData && modalData.opp_comm_sales_budget ? modalData.opp_comm_sales_budget : "",
    opp_industry: modalData && modalData.opp_industry ? modalData.opp_industry : "",
    opp_owner_id: modalData && modalData.opp_owner_id ? modalData.opp_owner_id : accountOwnerID,
    region: modalData && modalData.region ? modalData.region : "",
    bidding_unit: modalData && modalData.bidding_unit ? modalData.bidding_unit : "",
    project_type: modalData && modalData.project_type ? modalData.project_type : "",
    opp_type: modalData && modalData.opp_type ? modalData.opp_type : "",
    description: modalData && modalData.description ? modalData.description : "",
    status : modalData && modalData.status ? modalData.status : "",
    expected_award_date: modalData && modalData.expected_award_date ? modalData.expected_award_date : currentDate,
    expected_rfx_date: modalData && modalData.expected_rfx_date ? modalData.expected_rfx_date : currentDate,
    close_date: modalData && modalData.close_date ? modalData.close_date : currentDate,
    owner_name: modalData && modalData.owner_name ? modalData.owner_name : "",

  });


  useEffect(() => {
    getMaxOpportunityByID()
      .then((resp) => {
        const temp = generateOpportunityNumber(resp.returnData.opp_number)
        setOpportunityNumber(temp)
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (shouldResetCurrency) {
      setCurrency('0'); // Reset to default value
      setShouldResetCurrency(false);
    }
  }, [shouldResetCurrency]);


  const handleChangeValues = (e)=>{
    if(isEdit && !isFormDataChanged) {
        setFormData({...modalData, [e.target.name]: e.target.value, });   
        setOppValue(modalData.opp_value);   
        setCurrency(modalData.opp_currency);  
    } else {
      setFormData({...formData, [e.target.name]: e.target.value, });
    }
    
    if(e.target.name === 'opp_value') {
      //setFormData({...formData, opp_currency: '' });
      setOppValue(e.target.value);
      setShouldResetCurrency(true);
    }
    setIsFormDataChanged(true); 
  }

   

  const handleAccountOwnerSelect = (user) => {
    if(isEdit && !isFormDataChanged) {
      setFormData({...modalData, opp_owner_id: user.id, owner_name: user.name});
      setOppValue(modalData.opp_value);
      setCurrency(modalData.opp_currency);
    } else {
      setFormData({...formData, opp_owner_id: user.id, owner_name: user.name});
    }
    setAccountOwnerID(user.id)
    setAccountOwnerName(user.name)
    setIsFormDataChanged(true);
  };  
   
  const handleCustomerSelect = (account) => {
    if(isEdit && !isFormDataChanged) {
      setFormData({...modalData, customer_id: account.id});
      setOppValue(modalData.opp_value);   
      setCurrency(modalData.opp_currency);  
    } else {
      setFormData({...formData, customer_id: account.id});
    }
    //setCustomerID(account.id);
    setIsFormDataChanged(true);
  };
  
  const handleEndUserSelect = (account) => {
    if(isEdit && !isFormDataChanged) {
      setFormData({...modalData,  enduser_id: account.id});
      setOppValue(modalData.opp_value);   
      setCurrency(modalData.opp_currency);  
    } else {
      setFormData({...formData,  enduser_id: account.id});
    }
    //setEndUserID(account.id);
    setIsFormDataChanged(true);
  };
    

  const handleChangeCurrency = (selectedOption) => {
    setCurrency(selectedOption.target.value);
    const currency = currenciesJSON.filter(curr => curr.value === selectedOption.target.value)[0];
    let value = ''
    if(isEdit && !isFormDataChanged){
      value = modalData.opp_value.trim() 
    } else {
      value = oppValue.trim(); 
    }

    if(selectedOption.target.value === '0') return;

    // Regular expression to allow digits (0-9) with optional decimal point and fractional part
    value = value.replace(/[, .]/g, '');
    const validPattern = /^\d+(\.\d+)?$/;
    if (validPattern.test(value)) {
      console.log("Valid number detected.");
    } else {
      console.log("Invalid number detected.");
      showModalError("Please enter a valid number.");
      setFormData({...formData, opp_value: ''});
      setOppValue('')
      setIsFormDataChanged(true);
      return ''
    }
    const numericValue = value.replace(/[^\d.]/g, ''); // Keep only numbers and dots
    const formattedValue = formatAmount(numericValue, currency);
    console.log("Formated value: ", formattedValue);
    if(isEdit && !isFormDataChanged) {
      setFormData({...modalData, opp_value: formattedValue, opp_currency: currency.value});
    } else {
      setFormData({...formData, opp_value: formattedValue, opp_currency: currency.value});
    }
    setOppValue(formattedValue);
  };

  const formatAmount = (value, currency) => {
    if (!value) return '';
    if (!currency.locale | currency.locale == "") return '';

    const numberValue = parseFloat(value);
    if (isNaN(numberValue)) return value; // Return raw value if not a number
    return new Intl.NumberFormat(currency.locale, {
      style: 'decimal',
      notation: currency.notation,
      maximumFractionDigits: 2,
    }).format(numberValue);
  };

 

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEdit ? 'Edit Opportunity' : 'Add Opportunity'}</DialogTitle> 
      <DialogContent>
        <form id="modalform6">

          <Grid container spacing={2} style={{ marginTop: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="opp_number"
                label="Opportunity Number"
                variant="outlined"
                value={isEdit && !isFormDataChanged ? modalData?.opp_number : opportunityNumber}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="opp_title"
                label="Opportunity Name *"
                variant="outlined"
                defaultValue={isEdit && !isFormDataChanged ? modalData?.opp_title : formData.opp_title}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 100 }}                
              />
            </Grid>
            <Grid item xs={12} md={6} className="mt-2">
              <FormControl variant="outlined" className="w-full">
                <SearchingListInput 
                  allSearchList = {accountList}
                  onListSelect={handleCustomerSelect}
                  placeHolder="Search customer..."
                  selectedValue={isEdit ? modalData?.customer_name : formData.customer_name}
                /> 
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} className="mt-2">
              <FormControl variant="outlined" className="w-full">
                <SearchingListInput 
                  allSearchList = {accountList}
                  onListSelect={handleEndUserSelect}
                  placeHolder="Search end user..."
                  selectedValue={isEdit ? modalData?.enduser_name : ''}
                />
              </FormControl>
            </Grid>            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="enduser_project"
                label="End User Project"
                variant="outlined"
                defaultValue={isEdit && !isFormDataChanged ? modalData?.enduser_project : formData.enduser_project}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 100 }}  
              />
            </Grid>            
            
            <Grid item xs={12} md={6}></Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="opp_value"
                label="Opportunity Value"
                variant="outlined"
                value={isEdit && !isFormDataChanged ? modalData?.opp_value : oppValue}
                defaultValue={isEdit && !isFormDataChanged ? modalData?.opp_value : oppValue}
                onChange={handleChangeValues}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                name="opp_currency"
                label="Opportunity Currency *"
                variant="outlined"
                //defaultValue={isEdit && !isFormDataChanged ? modalData?.opp_currency : formData.opp_currency}
                value={isEdit && !isFormDataChanged ? modalData?.opp_currency : currency}
                onChange={handleChangeCurrency}
                inputProps={{ maxLength: 15 }}  
              >
                <MenuItem selected={true} value="0">Please select a currency</MenuItem>
                {currenciesJSON.map(option => (
                  <MenuItem 
                    key={option.value} 
                    value={option.value}
                    selected={modalData?.opp_currency ? (modalData?.opp_currency === option.value ? true : false) : (formData.opp_currency === option.value ? true : false)}  
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>            
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                name="opp_sale_stage"
                label="Opportunity Sales Stage"
                variant="outlined"
                defaultValue={isEdit && !isFormDataChanged ? modalData?.opp_sale_stage : formData.opp_sale_stage}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 150 }}  
              >
                <MenuItem value="">Select Opportunity Sales Stage *</MenuItem>
                {oppSalesStagesList && oppSalesStagesList?.map(option => (
                  <MenuItem 
                    key={option.title} 
                    value={option.title}
                    selected={modalData?.opp_sale_stage ? (modalData?.opp_sale_stage === option.title ? true : false) : (formData.opp_sale_stage === option.title ? true : false)}  
                  >
                    {option.title}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>                 
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                name="opp_pursuit_progress"
                label="Sales Pursuit Progress"
                variant="outlined"
                defaultValue={isEdit && !isFormDataChanged ? modalData?.opp_pursuit_progress : formData.opp_pursuit_progress}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 100 }}  
              >
              <MenuItem value="">Select Sales Pursuit Progress *</MenuItem>
              {salesPursuitProgressList && salesPursuitProgressList?.map(option => (
                <MenuItem 
                  key={option.title} 
                  value={option.title}
                  selected={modalData?.opp_pursuit_progress ? (modalData?.opp_pursuit_progress === option.title ? true : false) : (formData.opp_pursuit_progress === option.title ? true : false)}  
                >
                  {option.title}
                </MenuItem>
              ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                name="opp_business_line"
                label="Opportunity Business Line"
                variant="outlined"
                defaultValue={isEdit && !isFormDataChanged ? modalData?.opp_business_line : formData.opp_business_line}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 100 }}  
                >
                <MenuItem value="">Select Opportunity Business Line *</MenuItem>
                {businessLineList && businessLineList?.map(option => (
                  <MenuItem 
                    key={option.title} 
                    value={option.title}
                    selected={modalData?.opp_business_line ? (modalData?.opp_business_line === option.title ? true : false) : (formData.opp_business_line === option.title ? true : false)}  
                  >
                    {option.title}
                  </MenuItem>
                ))}
                </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                name="opp_comm_sales_budget"
                label="Opportunity Committed for Sales Budget"
                variant="outlined"
                onChange={handleChangeValues}
                defaultValue={isEdit && !isFormDataChanged ? modalData?.opp_comm_sales_budget : formData.opp_comm_sales_budget}
                >
                <MenuItem value="">Select Opportunity Committed for Sales Budget *</MenuItem>
                {oppCommForSalesBudgetList && oppCommForSalesBudgetList?.map(option => (
                  <MenuItem 
                    key={option.title} 
                    value={option.title}
                    selected={modalData?.opp_comm_sales_budget ? (modalData?.opp_comm_sales_budget === option.title ? true : false) : (formData.opp_comm_sales_budget === option.title ? true : false)}  
                  >
                    {option.title}
                  </MenuItem>
                ))}
                </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="opp_industry"
                label="Opportunity Industry"
                variant="outlined"
                defaultValue={isEdit && !isFormDataChanged ? modalData?.opp_industry : formData.opp_industry}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 25 }}  
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <TextField
                fullWidth
                name="opportunity_owner"
                label="Opportunity Owner"
                variant="outlined"
                defaultValue={isEdit ? modalData.opportunity_owner : ''}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 100 }}  
              /> */}
              <SearchingListInput 
                  allSearchList = {contactList}
                  onListSelect={handleAccountOwnerSelect}
                  placeHolder={"Opportunity Owner *"}
                  selectedValue={isEdit && !isFormDataChanged ? modalData?.owner_name : formData.owner_name}
                />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                name="region"
                label="Region"
                variant="outlined"
                defaultValue={isEdit && !isFormDataChanged ? modalData?.region : formData.region}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 100 }}  
                >
                <MenuItem value="">Select Region *</MenuItem>
                {countriesListJSON.map((item)=>( 
                    <MenuItem
                      value={item.name}
                      //selected={modalData?.country ? (modalData.country == item.name ? true : false) : (formData.country == item.name ? true : false)}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                name="bidding_unit"
                label="Bidding Unit"
                variant="outlined"
                defaultValue={isEdit && !isFormDataChanged ? modalData?.bidding_unit : formData.bidding_unit}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 25 }}  
                >
                <MenuItem value="">Select Bidding Unit *</MenuItem>
                {biddingUnitList && biddingUnitList?.map(option => (
                  <MenuItem 
                    key={option.title} 
                    value={option.title}
                    selected={modalData?.bidding_unit ? (modalData?.bidding_unit === option.title ? true : false) : (formData.bidding_unit === option.title ? true : false)}  
                  >
                    {option.title}
                  </MenuItem>
                ))}
                </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                name="project_type"
                label="Project Type"
                variant="outlined"
                defaultValue={isEdit && !isFormDataChanged ? modalData?.project_type : formData.project_type}
                onChange={handleChangeValues}
                >
                <MenuItem value="">Select Project Type *</MenuItem>
                {projectTypeList && projectTypeList?.map(option => (
                  <MenuItem 
                    key={option.title} 
                    value={option.title}
                    selected={modalData?.project_type ? (modalData?.project_type === option.title ? true : false) : (formData.project_type === option.title ? true : false)}  
                  >
                    {option.title}
                  </MenuItem>
                ))}
                </TextField>
            </Grid>
            
            
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                name="opp_type"
                label=" Opportunity Type"
                variant="outlined"
                defaultValue={modalData?.opp_type ? modalData?.opp_type : formData.opp_type}
                onChange={handleChangeValues}
                >
                <MenuItem value="">Select Opportunity Type *</MenuItem>
                {opportunityTypeList && opportunityTypeList?.map(option => (
                  <MenuItem 
                    key={option.title} 
                    value={option.title}
                    selected={modalData?.opp_type ? (modalData?.opp_type === option.title ? true : false) : (formData.opp_type === option.title ? true : false)}  
                  >
                    {option.title}
                  </MenuItem>
                ))} 
                </TextField> 
            </Grid>            
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="expected_award_date"
                label="Expected Award Date"
                type="date"
                variant="outlined"
                defaultValue={isEdit && !isFormDataChanged ? modalData?.expected_award_date : currentDate}
                onChange={handleChangeValues}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="expected_rfx_date"
                label="Expected RFx Date"
                type="date"
                variant="outlined"
                defaultValue={isEdit && !isFormDataChanged ? modalData?.expected_rfx_date : currentDate}
                onChange={handleChangeValues}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="close_date"
                label="Close Date"
                type="date"
                variant="outlined"
                defaultValue={isEdit && !isFormDataChanged ? modalData?.close_date : formData.close_date}
                onChange={handleChangeValues}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                variant="outlined"
                className="w-full"
                multiline  
                rows={2}   
                onChange={handleChangeValues}
                defaultValue={isEdit && !isFormDataChanged ? modalData?.description : formData.description}
              />
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
      <button onClick={handleClose} 
        className='border border-[#26BADA] border-solid	 bg-white text-[#26BADA] rounded-md px-4 py-2 min-w-[120px] uppercase hover:bg-[#26BADA] hover:text-white'
      >
        Cancel
      </button>
     
        {isEdit
         ?
          <button
            onClick={(e) => {
              updateOpportunityRequest(
                e,               
                isEdit && !isFormDataChanged ? modalData : formData,
                isEdit && !isFormDataChanged ? modalData.opportunity_id : formData.opportunity_id,
              );
            }}
            className='bg-[#26BADA] text-white rounded-md px-4 py-2 min-w-[120px] uppercase hover:bg-[#51C8E1]'
          >
            SAVE
          </button>
        :
          <button
            onClick={(e) => {
              createOpportunityRequest(
                e,               
                formData,
                opportunityNumber
              );
            }}
            className='bg-[#26BADA] text-white rounded-md px-4 py-2 min-w-[120px] uppercase hover:bg-[#51C8E1]'
          >
            ADD
        </button>}
        
        {/* {props.buttonType && props.buttonType === "new" ? (
          <Button onClick={(e) => createOpportunityRequest(e, props.apiBackendURL, props.tokens, props.tenantID, formData.m6_customer_name, formData.m6_end_user_name)} variant="contained" color="primary">Add Info</Button>
        ) : (
          <Button onClick={(e) => updateOpportunityRequest(e, props.modalData.opportunity_id, formData.m6_customer_name, formData.m6_end_user_name, props.apiBackendURL, props.tokens, props.tenantID)} variant="contained" color="primary">Update Info</Button>
        )} */}
      </div>
    </Dialog>
  );
};

export default NewOpportunity;
