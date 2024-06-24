
import {
  createRfxRecordAction, updateRfxRecordAction
} from "./actions/rfx";
//import { uploadFiles } from "@/components/FileInput";

import {
  showMainLoader102,
  hideMainLoader102,
} from "../util/utility";

import { showModalError, showModalSuccess } from "./utility";
import { uploadImagesOnBlob } from "../util/vercelFileHandler";
import {createRfxPrereqAction, updateRfxPrereqAction, deleteRfxPrereqRecordAction } from "../rfx/actions/rfxPrereq"



// Create new rfx 
export const createRfxRequest = async (
  formData,
  opportunityID,
  selectedFilesMain,
  rfxID
) => {
    
  showMainLoader102();
  let valid = true;
  let message = "";
  const validationFields = [
    "rfx_number", 
    "rfx_title", 
    "rfx_type", 
    "bid_type", 
    "bid_validity", 
    "bid_submission_mode", 
    "submission_contents", 
    "issue_date", 
    "due_date", 
    "expected_award_date"
  ];
  
  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  if(!formData.issue_date || !formData.due_date) {
    valid = false;
    message = "Issued date or due date is not selected.";
  }

  if(!formData.submission_contents || formData.submission_contents.length === 0) {
    valid = false;
    message = "Content submission is not selected.";
  }
    
  let success = true;
  if (valid) {
    showMainLoader102();
    formData.rfx_id = rfxID;
    try{
      let contentSub = formData.submission_contents.join(',')
      formData.submission_contents = contentSub;  
    } catch {}

    let resp = await createRfxRecordAction(formData, opportunityID)
    if(resp.statusCode == 200) {
      window.location.href = '/rfx';
    } else {
      success = false;
      message = resp.error;
    }
  }
      
  if (!valid || !success) {
    showModalError(message);
    hideMainLoader102()
  }
  return;  
};


// update an rfx 
export const updateRfxRequest = async (
  formData,
  opportunityID,
  selectedFilesMain
) => {
    console.log(formData)
  showMainLoader102();
  let valid = true;
  let message = "";
  const validationFields = [
    "rfx_number", 
    "rfx_title", 
    "rfx_type", 
    "bid_type", 
    "bid_validity", 
    "bid_submission_mode", 
    "submission_contents", 
    "issue_date", 
    "due_date", 
    "expected_award_date"
  ];
  
  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  if(!formData.issue_date || !formData.due_date) {
    valid = false;
    message = "Issued date or due date is not selected.";
  }

  if(!formData.submission_contents || formData.submission_contents.length === 0) {
    valid = false;
    message = "Content submission is not selected.";
  }
    
  let success = true;
  if (valid) {
    showMainLoader102();
    try{
      let contentSub = formData.submission_contents.join(',')
      formData.submission_contents = contentSub;
    } catch {}

    let resp = await updateRfxRecordAction(formData, opportunityID)
    if(resp.statusCode == 200) {
      window.location.href = '/rfx';
    } else {
      success = false;
      message = resp.error;
    }
  }
      
  if (!valid || !success) {
    showModalError(message);
    hideMainLoader102()
  }
  return;  
};


///////////////////////// Rfx Prerequisite methods

// Client request to create new Rfx Prerequisite
export const createRfxPrereqRequest = async (
  e,
  table_name,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const formData = {
    title: document.getElementById("m4_title")
      ? document.getElementById("m4_title").value
      : "",
    is_active: true,
    alias: document.getElementById("m4_alias")
      ? document.getElementById("m4_alias").value
      : "",
  };

  let valid = true;
  let message = "";
  const validationFields = ["title", "is_active"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  const isactive = document.getElementById("m4_is_active");
  formData.is_active =
    isactive.options[isactive.selectedIndex].value === "Active" ? true : false;

  if (valid && formData.selectedIndex == 0) {
    valid = false;
    message = "Please select the status.";
  }

  let success = true;
  if (valid) {
    showMainLoader102();
    let res = await createRfxPrereqAction(
      formData,
      table_name,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res.statusCode === 201) {
      // document.getElementById("modalform4").reset();
      // showModalSuccess("New details added successfully.");
      window.location.reload();
    } else {
      valid = false;
      message = res.error;
    }
  }

  if (!valid || !success) {
    showModalError(message);
    hideMainLoader102();
  }
};

// Client request to update Rfx Prerequisite
export const updateRfxPrereqRequest = async (
  e,
  table_name,
  id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const formData = {
    title: document.getElementById("m4_title")
      ? document.getElementById("m4_title").value
      : "",
    is_active: true,
    alias: document.getElementById("m4_alias")
      ? document.getElementById("m4_alias").value
      : "",
  };

  let valid = true;
  let message = "";
  const validationFields = ["title", "is_active"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  const isactive = document.getElementById("m4_is_active");
  formData.is_active =
    isactive.options[isactive.selectedIndex].value == "Active" ? true : false;

  if (valid && formData.selectedIndex == 0) {
    valid = false;
    message = "Please select the status.";
  }

  let success = true;
  if (valid) {
    let res = await updateRfxPrereqAction(
      formData,
      table_name,
      id,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res.statusCode === 200) {
      showMainLoader102();
      document.getElementById("modalform4").reset();
      // showModalSuccess("Updated details successfully.");
      window.location.reload();
    } else {
      valid = false;
      message = res.error;
    }
  }

  if (!valid || !success) {
    showModalError(message);
    hideMainLoader102();
  }
};

// Client request to delete
export const deleteRfxPrereqRequest = async (e, table_name, id) => {
  e.preventDefault();

  const userConfirmed = window.confirm(
    "Are you sure want to delete Rfx Prerequisite?"
  );

  if (userConfirmed) {
    let res = await deleteRfxPrereqRecordAction(table_name, id);

    if (res) {
      window.location.reload();
    } else {
      //showError("Server Error:", res.returnData.error)
      window.location.reload();
    }
  }
};



