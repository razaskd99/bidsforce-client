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

const NewOpportunity = (props) => {
  const [customerList, setCustomerList] = useState(
    props.companyRecords.filter((record) => record.company_type === "Customer")
  );
  const [endUserList, setEndUserList] = useState(
    props.companyRecords.filter((record) => record.company_type === "End User")
  );
  const [endUserID, setEndUserID] = useState(0);
  const [customerID, setCustomerID] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [endUserName, setEndUserName] = useState("");
  const [
    opportunityCommittedForSalesBudget,
    setOpportunityCommittedForSalesBudget,
  ] = useState(true);
  const [opportunityNumber, setOpportunityNumber] = useState(
    generateUniqueSixDigitNumber()
  );

  const {
    isOpen,
    handleClose,
    handleChangeValues,
    //formData,
    // companyList,
    //customerList,
    // createOpportunityRequest,
    //updateOpportunityRequest,
  } = props;

  const handleChangeCompany = (e) => {
    if (e.target.name == "m6_customer_id") {
      const company = props.companyRecords.find(
        (company) => company.company_id === e.target.value
      );
      setCustomerName(company.company_name);
      setCustomerID(company.company_id);
    }
    if (e.target.name == "m6_enduser_id") {
      const company = props.companyRecords.find(
        (company) => company.company_id === e.target.value
      );
      setEndUserName(company.company_name);
      setEndUserID(company.company_id);
    }
  };

  const [currentDate] = useState(() => {
    // Get the current date in YYYY-MM-DD format
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Opportunity Details</DialogTitle>
      <DialogContent>
        <form id="modalform6">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} className="mt-2">
              <FormControl variant="outlined" className="w-full">
                <InputLabel id="customer-label">Choose Customer *</InputLabel>
                <Select
                  labelId="customer-label"
                  id="m6_customer_id"
                  name="m6_customer_id"
                  onChange={handleChangeCompany}
                  label="Choose Customer *"
                >
                  <MenuItem value={""}>Choose Customer *</MenuItem>
                  {customerList &&
                    customerList.map((item, i) => (
                      <MenuItem key={i} value={item.company_id}>
                        {item.company_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} className="mt-2">
              <FormControl variant="outlined" className="w-full">
                <InputLabel id="enduser-label">Choose End User *</InputLabel>
                <Select
                  labelId="enduser-label"
                  id="m6_enduser_id"
                  name="m6_enduser_id"
                  onChange={handleChangeCompany}
                  label="Choose End User *"
                >
                  <MenuItem value={""}>Choose End User *</MenuItem>
                  {endUserList &&
                    endUserList.map((item, i) => (
                      <MenuItem key={i} value={item.company_id}>
                        {item.company_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_opportunity_name"
                name="m6_opportunity_name"
                label="Opportunity Name *"
                variant="outlined"
                // value={formData.m6_title}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 100 }}                
              />
            </Grid>
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_type"
                name="m6_type"
                label="Type"
                variant="outlined"
                // value={formData.m6_type}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 50 }}  
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_opportunity_value"
                name="m6_opportunity_value"
                label="Opportunity Value"
                variant="outlined"
                type="number"
                onChange={handleChangeValues}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_opportunity_number"
                name="m6_opportunity_number"
                label="Opportunity Number"
                variant="outlined"
                value={opportunityNumber}
                disabled={true}
                onChange={handleChangeValues}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_region"
                name="m6_region"
                label="Region"
                variant="outlined"
                // value={formData.m6_region}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 100 }}  
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_opportunity_industry"
                name="m6_opportunity_industry"
                label="Opportunity Industry"
                variant="outlined"
                // value={formData.m6_industry_code}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 25 }}  
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_opportunity_business_line"
                name="m6_opportunity_business_line"
                label="Opportunity Business Line"
                variant="outlined"
                // value={formData.m6_business_unit}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 100 }}  
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_project_type"
                name="m6_project_type"
                label="Project Type"
                variant="outlined"
                // value={formData.m6_project_type}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 100 }}  
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_opportunity_sales_stage"
                name="m6_opportunity_sales_stage"
                label="Opportunity Sales Stage"
                variant="outlined"
                // value={formData.m6_stage}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 150 }}  
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_status"
                name="m6_status"
                label="Status"
                variant="outlined"
                // value={formData.m6_status}
                onChange={handleChangeValues}
                inputProps={{ maxLength: 25 }}  
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_expected_award_date"
                name="m6_expected_award_date"
                label="Expected Award Date"
                type="date"
                variant="outlined"
                defaultValue={currentDate}
                // value={formData.m6_expected_award_date}
                onChange={handleChangeValues}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_expected_rfx_date"
                name="m6_expected_rfx_date"
                label="Expected RFx Date"
                type="date"
                defaultValue={currentDate}
                variant="outlined"
                // value={formData.m6_expected_rfx_date}
                onChange={handleChangeValues}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_close_date"
                name="m6_close_date"
                label="Close Date"
                type="date"
                defaultValue={currentDate}
                variant="outlined"
                // value={formData.m6_close_date}
                // onChange={handleChangeValues}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_end_user_project"
                name="m6_end_user_project"
                label="End User Project"
                variant="outlined"
                inputProps={{ maxLength: 100 }}  
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_opportunity_currency"
                name="m6_opportunity_currency"
                label="Opportunity Currency"
                variant="outlined"
                inputProps={{ maxLength: 15 }}  
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_sales_persuit_progress"
                name="m6_sales_persuit_progress"
                label="Sales Pursuit Progress"
                variant="outlined"
                inputProps={{ maxLength: 100 }}  
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_opportunity_owner"
                name="m6_opportunity_owner"
                label="Opportunity Owner"
                variant="outlined"
                inputProps={{ maxLength: 100 }}  
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="m6_bidding_unit"
                name="m6_bidding_unit"
                label="Bidding Unit"
                variant="outlined"
                inputProps={{ maxLength: 25 }}  
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
        <Button
          onClick={(e) => {
            createOpportunityRequest(
              e,
              customerID,
              endUserID,
              customerName,
              endUserName,
              opportunityCommittedForSalesBudget
            );
            //handleClose();
          }}
          variant="outlined"
          color="primary"
        >
          Submit
        </Button>
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
