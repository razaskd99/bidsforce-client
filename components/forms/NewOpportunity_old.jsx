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
import { useState, useEffect } from "react";
import { createOpportunityRequest } from "@/app/api/rfx/scripts";
import {
  getAllCompanyRecordsAction,
  getAllCustomerRecordsAction,
} from "@/app/api/rfx/actions/rfx";
import { generateUniqueSixDigitNumber } from "@/app/api/util/utility";
import SearchingListInput from "./SearchingListInput";
import { updateOpportunityAction } from "@/app/api/opportunities/action/opportunity";
import { showModalError, showModalSuccess } from "@/app/api/rfx/utility";

const NewOpportunity = (props) => {
  
  const [endUserID, setEndUserID] = useState(0);
  const [customerID, setCustomerID] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [endUserName, setEndUserName] = useState("");
  const [isEdit, setIsEdit] = useState(props?.oppRec ? true : false);
  const [
    opportunityCommittedForSalesBudget,
    setOpportunityCommittedForSalesBudget,
  ] = useState(true);
  const [opportunityNumber, setOpportunityNumber] = useState(
    generateUniqueSixDigitNumber()
  );
  const [accountList, setAccountList] = [
    props?.accountRecords?.map((item) => ({
        id: item.account_id,
        name: item.account_name,        
      })),
  ];

  const {
    isOpen,
    handleClose,
    handleChangeValues,   
  } = props;

    const [currentDate] = useState(() => {
    // Get the current date in YYYY-MM-DD format
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });


  useEffect(() => {
    getMaxOpportunityByID()
      .then((resp) => {
        const temp = generateOpportunityNumber(resp.returnData.crm_id)
        setOpportunityNumber(temp)
      })
      .catch((err) => {});
  }, []);
   
  const handleCustomerSelect = (account) => {
    setCustomerID(account.id)
    setCustomerName(account.name)
    console.log(account)    
  };
  
  const handleEndUserSelect = (account) => {
    setEndUserID(account.id)
    setEndUserName(account.name)
    console.log(account)
  };
    

  const handleUpdate = async()=> {
    const formData = {
      company_id: endUserID,
      customer_id: customerID,
      title: document.getElementById("m6_opportunity_name")
        ? document.getElementById("m6_opportunity_name").value
        : "",
      type: document.getElementById("m6_type")
        ? document.getElementById("m6_type").value
        : "",
      // probability: document.getElementById("m6_probability")
      //   ? document.getElementById("m6_probability").value
      //   : "",    
      total_value: document.getElementById("m6_opportunity_value").value
        ? document.getElementById("m6_opportunity_value").value
        : 0,
      crm_id: document.getElementById("m6_opportunity_number")
        ? document.getElementById("m6_opportunity_number").value
        : "",
      customer_name: customerName,
      end_user_name: endUserName,
  
      region: document.getElementById("m6_region").value
        ? document.getElementById("m6_region").value
        : "",
      industry_code: document.getElementById("m6_opportunity_industry").value
        ? document.getElementById("m6_opportunity_industry").value
        : "",
      business_unit: document.getElementById("m6_opportunity_business_line").value
        ? document.getElementById("m6_opportunity_business_line").value
        : "",
      project_type: document.getElementById("m6_project_type").value
        ? document.getElementById("m6_project_type").value
        : "",
      // delivery_duration: document.getElementById("m6_delivery_duration").value
      //   ? document.getElementById("m6_delivery_duration").value
      //   : "",
      stage: document.getElementById("m6_opportunity_sales_stage").value
        ? document.getElementById("m6_opportunity_sales_stage").value
        : "",
      status: document.getElementById("m6_status").value
        ? document.getElementById("m6_status").value
        : "",
      expected_award_date: document.getElementById("m6_expected_award_date").value
        ? document.getElementById("m6_expected_award_date").value
        : "",
      expected_rfx_date: document.getElementById("m6_expected_rfx_date").value
        ? document.getElementById("m6_expected_rfx_date").value
        : "",
      close_date: document.getElementById("m6_close_date").value
        ? document.getElementById("m6_close_date").value
        : "",
      // competition: document.getElementById("m6_competition").value
      //   ? document.getElementById("m6_competition").value
      //   : "",
      // gross_profit_percent: document.getElementById("m6_gross_profit_percent").value
      //   ? document.getElementById("m6_gross_profit_percent").value
      //   : 0,
      // gross_profit_value: document.getElementById("m6_gross_profit_value").value
      //   ? document.getElementById("m6_gross_profit_value").value
      //   : 0,
      description: document.getElementById("m6_description")
        ? document.getElementById("m6_description").value
        : "",
      forcasted: opportunityCommittedForSalesBudget,
      end_user_project: document.getElementById("m6_end_user_project").value
        ? document.getElementById("m6_end_user_project").value
        : "",
      opportunity_currency: document.getElementById("m6_opportunity_currency").value
        ? document.getElementById("m6_opportunity_currency").value
        : "",
      sales_persuit_progress: document.getElementById("m6_sales_persuit_progress").value
        ? document.getElementById("m6_sales_persuit_progress").value
        : "",
      opportunity_owner: document.getElementById("m6_opportunity_owner").value
        ? document.getElementById("m6_opportunity_owner").value
        : "",
      bidding_unit: document.getElementById("m6_bidding_unit").value
        ? document.getElementById("m6_bidding_unit").value
        : "",
    };
  
    console.log(formData)
    let valid = true;
    let message = "";
    const validationFields = ["company_id", "title"];
  
    validationFields.forEach((element) => {
      if (!formData[element]) {
        valid = false;
        message = "Please fill the required fields.";
      }
    });
  
    let success = true;
    if (valid) {
      let res = await updateOpportunityAction(formData, props.oppRec.opportunity_id);
      if (res.statusCode === 200) {
        showModalSuccess("Opportunity details updated successfully.");
        window.location.reload();
      } else {
        valid = false;
        message = res.error;
      }
    }
  
    if (!valid || !success) {
      showModalError(message);
    }
    return;
  }
  

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Opportunity Details</DialogTitle>
      <DialogContent>
        <form id="modalform6">

          <Grid container spacing={2} className="mt-1">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_opportunity_number"
                name="m6_opportunity_number"
                label="Opportunity Number"
                variant="outlined"
                value={isEdit ? props.oppRec.crm_id : opportunityNumber}
                disabled={true}
                onChange={ handleChangeValues}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_opportunity_name"
                name="m6_opportunity_name"
                label="Opportunity Name *"
                variant="outlined"
                defaultValue={isEdit ? props.oppRec.title : ''}
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
                /> 
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} className="mt-2">
              <FormControl variant="outlined" className="w-full">
                <SearchingListInput 
                  allSearchList = {accountList}
                  onListSelect={handleEndUserSelect}
                  placeHolder="Search end user..."
                />
              </FormControl>
            </Grid>            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_end_user_project"
                name="m6_end_user_project"
                label="End User Project"
                variant="outlined"
                defaultValue={isEdit ? props.oppRec.end_user_project : ''}
                inputProps={{ maxLength: 100 }}  
              />
            </Grid>            
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_opportunity_value"
                name="m6_opportunity_value"
                label="Opportunity Value"
                variant="outlined"
                type="number"
                defaultValue={isEdit ? props.oppRec.total_value : ''}
                onChange={handleChangeValues}
              />
            </Grid>            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_opportunity_currency"
                name="m6_opportunity_currency"
                label="Opportunity Currency"
                variant="outlined"
                defaultValue={isEdit ? props.oppRec.opportunity_currency : ''}
                inputProps={{ maxLength: 15 }}  
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_opportunity_sales_stage"
                name="m6_opportunity_sales_stage"
                label="Opportunity Sales Stage"
                variant="outlined"
                defaultValue={isEdit ? props.oppRec.stage : ''}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 150 }}  
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_sales_persuit_progress"
                name="m6_sales_persuit_progress"
                label="Sales Pursuit Progress"
                variant="outlined"
                defaultValue={isEdit ? props.oppRec.sales_persuit_progress : ''}
                inputProps={{ maxLength: 100 }}  
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_opportunity_business_line"
                name="m6_opportunity_business_line"
                label="Opportunity Business Line"
                variant="outlined"
                defaultValue={isEdit ? props.oppRec.business_unit : ''}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 100 }}  
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                id="m6_opportunity_committed_for_sales_budget"
                name="m6_opportunity_committed_for_sales_budget"
                label="Opportunity Committed for Sales Budget"
                variant="outlined"
                onChange={(e) =>
                  setOpportunityCommittedForSalesBudget(e.target.value)
                }
              >
                <MenuItem
                  value={true}
                  selected={opportunityCommittedForSalesBudget ? true : false}
                >
                  Yes
                </MenuItem>
                <MenuItem
                  value={false}
                  selected={!opportunityCommittedForSalesBudget ? true : false}
                >
                  No
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_opportunity_industry"
                name="m6_opportunity_industry"
                label="Opportunity Industry"
                variant="outlined"
                defaultValue={isEdit ? props.oppRec.industry_code : ''}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 25 }}  
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_opportunity_owner"
                name="m6_opportunity_owner"
                label="Opportunity Owner"
                variant="outlined"
                defaultValue={isEdit ? props.oppRec.opportunity_owner : ''}
                inputProps={{ maxLength: 100 }}  
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_region"
                name="m6_region"
                label="Region"
                variant="outlined"
                defaultValue={isEdit ? props.oppRec.region : ''}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 100 }}  
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_bidding_unit"
                name="m6_bidding_unit"
                label="Bidding Unit"
                variant="outlined"
                defaultValue={isEdit ? props.oppRec.bidding_unit : ''}
                inputProps={{ maxLength: 25 }}  
              />
            </Grid>


            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_project_type"
                name="m6_project_type"
                label="Project Type"
                variant="outlined"
                defaultValue={isEdit ? props.oppRec.project_type : ''}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 100 }}  
              />
            </Grid>
            
            <Grid item xs={12} md={6}></Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_type"
                name="m6_type"
                label="Type"
                variant="outlined"
                defaultValue={isEdit ? props.oppRec.type : ''}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 50 }}  
              />
            </Grid>            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_status"
                name="m6_status"
                label="Status"
                variant="outlined"
                defaultValue={isEdit ? props.oppRec.status : ''}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 25 }}  
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_expected_award_date"
                name="m6_expected_award_date"
                label="Expected Award Date"
                type="date"
                variant="outlined"
                defaultValue={isEdit ? props.oppRec.expected_award_date : currentDate}
                onChange={handleChangeValues}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_expected_rfx_date"
                name="m6_expected_rfx_date"
                label="Expected RFx Date"
                type="date"
                variant="outlined"
                defaultValue={isEdit ? props.oppRec.expected_rfx_date : currentDate}
                onChange={handleChangeValues}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="m6_close_date"
                name="m6_close_date"
                label="Close Date"
                type="date"
                variant="outlined"
                defaultValue={isEdit ? props.oppRec.close_date : currentDate}
                // onChange={handleChangeValues}
                InputLabelProps={{
                  shrink: true,
                }}
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
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Cancel
        </Button>
        {isEdit && props.oppRec
         ?
          <Button
            onClick={handleUpdate}
            variant="outlined"
            color="primary"
          >
            Update
          </Button>
        :
          <Button
            onClick={(e) => {
              createOpportunityRequest(
                e,
                customerID,
                endUserID,
                customerName,
                endUserName,
                opportunityCommittedForSalesBudget,
                opportunityNumber
              );
              //handleClose();
            }}
            variant="outlined"
            color="primary"
          >
            Submit
          </Button>}
        {/* {props.buttonType && props.buttonType === "new" ? (
          <Button onClick={(e) => createOpportunityRequest(e, props.apiBackendURL, props.tokens, props.tenantID, formData.m6_customer_name, formData.m6_end_user_name)} variant="contained" color="primary">Add Info</Button>
        ) : (
          <Button onClick={(e) => updateOpportunityRequest(e, props.modalData.opportunity_id, formData.m6_customer_name, formData.m6_end_user_name, props.apiBackendURL, props.tokens, props.tenantID)} variant="contained" color="primary">Update Info</Button>
        )} */}
      </DialogActions>
    </Dialog>
  );
};

export default NewOpportunity;
