import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig() || {};
const axios = require("axios");

import {
  createNewRfxAction,
  createOpportunityAction,
  updateRfxAction,
} from "./actions/rfx";
//import { uploadFiles } from "@/components/FileInput";

import {
  showErrorMessageAlertMain,
  successMessageAlertMain,
  isValidDate,
  uploadFiles,
  showMainLoader102,
  hideMainLoader102,
  isValidEmail,
} from "../util/utility";
import { getToken } from "../util/script";
import { createCustomerAction } from "./actions/customer";
import { createPrimaryContactsAction } from "./actions/primaryContacts";
import { showModalError, showModalSuccess } from "./utility";
import { uploadImagesOnBlob } from "../util/vercelFileHandler";

// get all rfx records from db
export const getAllRfxRecords = async (apiBackendURL, tokens, tenantID) => {
  let username = "";
  let password = "";
  if (serverRuntimeConfig) {
    username = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.user;
    password = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.pass;
  }

  try {
    const url = `${apiBackendURL}rfx/rfx/${tenantID}`;

    const response = await axios.get(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      maxRedirects: 5, // assuming you want a similar behavior to 'redirect: follow'
    });

    if (!response.status === 200) {
      return {
        statusCode: "400",
        rfxData: [],
        error: response.statusText || "Request failed for Rfxs",
      };
    }

    return {
      statusCode: 200,
      rfxData: response.data,
    };
  } catch (error) {
    return {
      statusCode: "400",
      rfxData: [],
      error: error.message || "Request failed for Rfxs",
    };
  }
};

// Create new / update rfx record from db
export const createUpdateRfxRequest = async (
  rfxData,
  isRevision,
  rfx_id,
  tenantID,
  apiBackendURL,
  selectedFilesMain,
  router
) => {
    
  showMainLoader102();
  if (!document?.getElementById("rfx_title").value) {
    hideMainLoader102();
    showErrorMessageAlertMain("Please provide the Rfx title.")
    return;
  }

  const rfxtype = document.getElementById("rfx_type");
  let rfx_type = rfxtype.options[rfxtype.selectedIndex].value ?? 0;

  const bidvalidity = document.getElementById("bid_validity");
  let bid_validity = bidvalidity.options[bidvalidity.selectedIndex].value ?? 0;

  const submissionmode = document.getElementById("submission_mode");
  let rfx_submission_mode = submissionmode.options[submissionmode.selectedIndex].value ?? 0;

  const rfxstage = document.getElementById("rfx_stage");
  let rfx_stage = rfxstage.options[rfxstage.selectedIndex].value ?? 0;

  if (
    rfx_type == 0 ||
    bid_validity == 0 ||
    rfx_submission_mode == 0 ||
    rfx_stage == 0
  ) {
    hideMainLoader102()
    showErrorMessageAlertMain("Select option from provided dropdown.")
    return;
  }
  
  if (
    !isValidDate(rfxData.due_date) ||
    !isValidDate(rfxData.tech_clarification_deadline) ||
    !isValidDate(rfxData.com_clarification_deadline)
  ) {
    hideMainLoader102()
    showErrorMessageAlertMain("Select the provided date options.")
    return;
  }

  if (
    rfxData.visit_worksite === true &&
    rfxData.visit_worksite_instructions === ""
  ) {
    hideMainLoader102()
    showErrorMessageAlertMain("Provide details for visit worksite.")
    return;
  }

  if (
    rfxData.under_existing_agreement === true &&
    rfxData.agreement_ref_num === ""
  ) {
    showErrorMessageAlertMain("Provide details for under existing agreement.");
    return;
  }
  
  const uniqueContacts = Array.from(
    new Set(rfxData.key_contacts.map((obj) => obj.primary_contacts_id))
  ).map((primary_contacts_id) => {
    return rfxData.key_contacts.find((obj) => obj.primary_contacts_id === primary_contacts_id);
  });
  rfxData.key_contacts = uniqueContacts;
    
  let response = {};
  if (isRevision === "yes") {
    response = await updateRfxAction(rfxData, rfx_id);
    if (response.statusCode == 200 && selectedFilesMain.length > 0) {
      //uploadFiles(selectedFilesMain, apiBackendURL, tenantID, rfx_id, "rfx");
    }
    successMessageAlertMain("Rfx information updated successfully.");
    window.location = "/rfx";
  } else {
    response = await createNewRfxAction(rfxData)
    if(response.statusCode != 200) {
      showErrorMessageAlertMain(response.error)
      hideMainLoader102()
      return
    }
    if (response.statusCode == 200 && selectedFilesMain.length > 0) {
      /*uploadFiles(
        selectedFilesMain,
        apiBackendURL,
        tenantID,
        response.returnData.rfx_id,
        "rfx"
      );*/
    }
    
    successMessageAlertMain("New Rfx information added successfully.");
    router.push("/rfx");
    hideMainLoader102();
  }
};

// Client request to create opportunity
export const createOpportunityRequest = async (
  e,
  customerID,
  endUserID,
  customerName,
  endUserName,
  opportunityCommittedForSalesBudget
) => {
  e.preventDefault();

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
    let res = await createOpportunityAction(formData);
    if (res.statusCode === 200) {
      showModalSuccess("New opportunity details added successfully.");
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
};



///////////////////////// Company methods



// Client request to create company
export const createCompanyRequest = async (
  e,
  formData
) => {
  e.preventDefault();
    
  let valid = true;
  let message = "";
  const validationFields = ["company_id", "customer_name", "email"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  if (valid && !isValidEmail(formData.email)) {
    valid = false;
    message = "Invalid email address.";
  }

  let success = true;
  if (valid) {
    let res = await createCustomerAction(formData);
    if (res.statusCode === 200) {
      showModalSuccess("New details added successfully.");
      window.location.reload();
    } else {
      valid = false;
      message = res.error;
    }
  }

  if (!valid || !success) {
    showModalError(message);
  }
};


// Client request to update company
export const updateCompanyRequest = async (
  e,
  company_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const formData = {
    company_name: document.getElementById("m1_company_name")
      ? document.getElementById("m1_company_name").value
      : "",
    phone: document.getElementById("m1_phone")
      ? document.getElementById("m1_phone").value
      : "",
    email: document.getElementById("m1_email")
      ? document.getElementById("m1_email").value
      : "",
    address: document.getElementById("m1_address")
      ? document.getElementById("m1_address").value
      : "",
    industry: document.getElementById("m1_industry")
      ? document.getElementById("m1_industry").value
      : "",
    website: document.getElementById("m1_website")
      ? document.getElementById("m1_website").value
      : "",
    company_logo: document.getElementById("m1_company_logo")
      ? document.getElementById("m1_company_logo").value
      : "",
    company_type: document.getElementById("m1_company_type")
      ? document.getElementById("m1_company_type").value
      : "",
  };

  let valid = true;
  let message = "";
  const validationFields = ["company_name", "phone", "email", "industry", "company_type"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  if (valid && !isValidEmail(formData.email)) {
    valid = false;
    message = "Invalid email address.";
  }

  let success = true;
  if (valid) {
    let res = await updateCompanyAction(
      formData,
      company_id,
      apiBackendURL,
      tokens,
      tenantID
    );

    if (res.statusCode === 200) {
      document.getElementById("modalform1").reset();
      showModalSuccess("Details updated successfully.");
      window.location.reload();
    } else {
      valid = false;
      message = res.error;
    }
  }

  if (!valid || !success) {
    showModalError(message)
  }
};



// Client request to create Primary Contacts
export const createPrimaryContactsRequest = async (e, myData, selectedFile, fileData) => {
  e.preventDefault();

  const formData = {
      "company_id": myData.company_id,
      "designation_id": myData.designation_id,
      "team_id": myData.team_id,
      "first_name": myData.first_name,
      "last_name": myData.last_name,
      "manager": myData.manager,
      "function_group": myData.function_group,
      "contact_number": myData.contact_number,
      "time_zone": myData.time_zone,
      "email": myData.email,
      "working_hours": myData.working_hours,
      "work_location": myData.work_location,
      "profile_image": "",        
      "manager": ""
  };
 
  let valid = true;
  let message = "";
  const validationFields = [
    "company_id",
    "designation_id",
    "team_id",
    "first_name",
    "last_name",
    "email",
    "function_group",
    "time_zone",
  ];

  validationFields.forEach((element) => {
    if (formData[element] == "") {
      valid = false;
      message = "Fill all the required fields to add contact details.";
    }
  });
  
  if (valid && !isValidEmail(formData.email)) {
    valid = false;
    message = "Email is not in the valid format." ;
  }
  
  let success = true;
  if (valid) {
    showMainLoader102();
    // upload file
    if (selectedFile && selectedFile.name) {
      if (process.env.IS_LOCAL === "local") {
        // upload file on local or AWS
        /*let resp = await uploadSingleFile(
          selectedFile,
          apiBackendURL,
          tenantID,
          folderName
        );
        formData.user_profile_photo = "tenant-" + tenantID + "/" + folderName + selectedFile.name;        
        */
       // upload file on blob
       const uploaded = await uploadImagesOnBlob(fileData);
       formData.profile_image = uploaded[0].url; 
       console.log("Running on local/aws");      
      } else {
        // upload file on blob
        const uploaded = await uploadImagesOnBlob(fileData);
        formData.profile_image = uploaded[0].url;
        console.log("Running on Vercel or different environment");
      }
    }
    
    // create user
    let res = await createPrimaryContactsAction(formData);
    if (res.statusCode === 200) {
      showModalSuccess("Contact details added successfully.")
      window.location = "/contacts";
    } else {
      valid = false;
      message = res.error;
    }
  } else {
  }

  if (!valid || !success) {
    showModalError(message);
  }
  hideMainLoader102();
};