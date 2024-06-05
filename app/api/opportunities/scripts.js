'use client'
import { showModalError, showModalSuccess } from "../admin-panel/utility";
import { hideMainLoader102, showMainLoader102 } from "../util/utility";
import { createOppPrereqAction, deleteAllOppPrereqRecordAction, deleteOppPrereqRecordAction, updateOppPrereqAction } from "./action/OpportunityPrereq";
import { createOpportunityAction, updateOpportunityAction } from "./action/opportunity";


// Client request to create opportunity
export const createOpportunityRequest = async (
  e,
  formData,
  opportunityNumber
) => {
  e.preventDefault();
  console.log(formData)
  let valid = true;
  let message = "";
  const validationFields = ["opp_title", "customer_id", "enduser_id", "enduser_project", "opp_value", "opp_currency",
    "opp_sale_stage", "opp_pursuit_progress", "opp_business_line", "opp_comm_sales_budget", "opp_industry", 
    "opp_owner_id", "region", "bidding_unit", "project_type", "opp_type"
  ];
  
  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  let success = true;
  if (valid) {
    showMainLoader102();
    formData.opp_number = opportunityNumber
    let res = await createOpportunityAction(formData, opportunityNumber);
    if (res.statusCode === 200) {
      //showModalSuccess("New opportunity details added successfully.");
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
  
  return;
  
};


// Client request to create opportunity
export const updateOpportunityRequest = async (
  e,
  formData,
  opportunity_id
) => {
  e.preventDefault();
  
  let valid = true;
  let message = "";
  const validationFields = ["opp_title", "customer_id", "enduser_id", "enduser_project", "opp_value", "opp_currency",
    "opp_sale_stage", "opp_pursuit_progress", "opp_business_line", "opp_comm_sales_budget", "opp_industry", 
    "opp_owner_id", "region", "bidding_unit", "project_type", "opp_type"
  ];
  
  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  let success = true;
  if (valid) {
    showMainLoader102();
    let res = await updateOpportunityAction(formData, opportunity_id);
    if (res.statusCode === 200) {
      //showModalSuccess("Opportunity details updated successfully.");
      window.location.reload();
    } else {
      valid = false;
      message = res.error;
    }
  }

  if (!valid || !success) {
    showModalError(message);
    hideMainLoader102()
  }
  return;
};



/////////////////////// start - opportunity pre-requisites



// Client request to create new Opp Prerequisite
export const createOppPrereqRequest = async (
    e,
    table_name
  ) => {
    e.preventDefault();
  
    const formData = {
      title: document.getElementById("m4_title")
        ? document.getElementById("m4_title").value
        : "",
      active: true,
    };
  
    let valid = true;
    let message = "";
    const validationFields = ["title"];
  
    validationFields.forEach((element) => {
      if (!formData[element]) {
        valid = false;
        message = "Please fill the required fields.";
      }
    });
  
    const isactive = document.getElementById("m4_active");
    formData.active =
      isactive.options[isactive.selectedIndex].value === "Active" ? true : false;
  
    if (valid && formData.selectedIndex == 0) {
      valid = false;
      message = "Please select the status.";
    }
  
    let success = true;
    if (valid) {
        showMainLoader102();
      let res = await createOppPrereqAction(
        formData,
        table_name
      );
      if (res.statusCode === 200) {
        //document.getElementById("modalform4").reset();
        //showModalSuccess("New details added successfully.");
        window.location.reload();
      } else {
        valid = false;
        message = res.error;
        //hideMainLoader102();
      }
    }
  
    if (!valid || !success) {
      showModalError(message);
      hideMainLoader102();
    }
    
  };
  
  // Client request to update Opp Prerequisite
  export const updateOppPrereqRequest = async (
    e,
    table_name,
    id
  ) => {
    e.preventDefault();
  
    const formData = {
      title: document.getElementById("m4_title")
        ? document.getElementById("m4_title").value
        : "",
      active: true,
    };
  
    let valid = true;
    let message = "";
    const validationFields = ["title"];
  
    validationFields.forEach((element) => {
      if (!formData[element]) {
        valid = false;
        message = "Please fill the required fields.";
      }
    });
  
    const isactive = document.getElementById("m4_active");
    formData.active =
      isactive.options[isactive.selectedIndex].value == "Active" ? true : false;
  
    if (valid && formData.selectedIndex == 0) {
      valid = false;
      message = "Please select the status.";
    }
  
    let success = true;
    if (valid) {
        showMainLoader102();
      let res = await updateOppPrereqAction(
        formData,
        table_name,
        id
      );
      if (res.statusCode === 200) {
        //document.getElementById("modalform4").reset();
        //showModalSuccess("Updated details successfully.");
        window.location.reload();
      } else {
        valid = false;
        message = res.error;
        //hideMainLoader102()
      }
    }
  
    if (!valid || !success) {
      showModalError(message);
      hideMainLoader102();
    }
    
  };
  
  // Client request to delete
  export const deleteOppPrereqRequest = async (e, table_name, id) => {
    e.preventDefault();
  
    const userConfirmed = window.confirm(
      "Are you sure want to delete Opportunity Prerequisite?"
    );
  
    if (userConfirmed) {
        showMainLoader102();
      let res = await deleteOppPrereqRecordAction(table_name, id);
  
      if (res) {
        window.location.reload();
      } else {
        //showError("Server Error:", res.returnData.error)
        window.location.reload();
        //hideMainLoader102();
      }
    }
    
  };


  // Client request to delete
  export const deleteAllOppPrereqRequest = async (e, table_name) => {
    e.preventDefault();
  
    const userConfirmed = window.confirm(
      "Are you sure want to delete All Opportunity Prerequisite?"
    );
  
    if (userConfirmed) {
      let res = await deleteAllOppPrereqRecordAction(table_name);
  
      if (res) {
        window.location.reload();
      } else {
        //showError("Server Error:", res.returnData.error)
        window.location.reload();
      }
    }
  };




  