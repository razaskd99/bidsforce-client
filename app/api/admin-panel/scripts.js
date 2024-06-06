import {
  isValidEmail,
  showError,
  showModalError,
  showModalSuccess,
} from "./utility";
import {
  getAllUserRecordsAction,
  getAllDesignationRecordsAction,
  getAllTeamRecordsAction,
  createUserAction,
  deleteUserRecordAction,
  updateUserRecordAction,
  createDesignationAction,
  createTeamAction,
  deleteDesignationRecordAction,
  updateDesignationAction,
  deleteTeamRecordAction,
  updateTeamAction,
  createCustomerAction,
  updateCustomerAction,
  getAllCustomerRecordsAction,
  deleteCustomerRecordAction,
} from "./actions/user";

import {
  createRfxPrereqAction,
  deleteRfxPrereqRecordAction,
  updateRfxPrereqAction,
} from "./actions/rfx";

import {
  createOpportunityAction,
  deleteOpportunityRecordAction,
  updateOpportunityRecordAction,
} from "./actions/opportunity";

import {
  createPhaseStageAction,
  updatePhaseStageRecordAction,
  deletePhaseStageRecordAction,
} from "./actions/phaseStages";
import { hideMainLoader102, showMainLoader102, uploadSingleFile } from "../util/utility";
import {
  createPersonaAction,
  deletePersonaRecordAction,
  updatePersonaRecordAction,
} from "./actions/persona";
import { createDocUploadAction } from "../rfx/actions/rfx";
import { uploadImagesOnBlob } from "../util/vercelFileHandler";
import { revalidatePath } from "next/cache";
import { Route } from "lucide-react";


// Client request to get all company
export const getAllUserRequest = async (
  apiBackendURL,
  accessToken,
  tenantID
) => {
  if (accessToken && tenantID) {
    let res = await getAllUserRecordsAction(
      apiBackendURL,
      accessToken,
      tenantID
    );
    if (res.statusCode === 200) {
      return res;
    }
  } else {
    return [];
  }
};

// Client request to get all designation
export const getAllDesignationRequest = async (
  apiBackendURL,
  tokens,
  tenantID
) => {
  let res = await getAllDesignationRecordsAction(
    apiBackendURL,
    tokens,
    tenantID
  );
  if (res.statusCode === 200) {
    return res;
  }
};


///////////////////////// Designation methods

// Client request to create designation
export const createDesignationRequest = async (
  e,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const formData = {
    title: document.getElementById("m2_title")
      ? document.getElementById("m2_title").value
      : "",
    type: document.getElementById("m2_type")
      ? document.getElementById("m2_type").value
      : "",
    description: document.getElementById("m2_description")
      ? document.getElementById("m2_description").value
      : "",
  };

  let valid = true;
  let message = "";
  const validationFields = ["title", "type"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  let success = true;
  if (valid) {
    let res = await createDesignationAction(
      formData,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res.statusCode === 200) {
      document.getElementById("modalform2").reset();
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

// Client request to update designation
export const updateDesignationRequest = async (
  e,
  designatin_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const formData = {
    title: document.getElementById("m2_title")
      ? document.getElementById("m2_title").value
      : "",
    type: document.getElementById("m2_type")
      ? document.getElementById("m2_type").value
      : "",
    description: document.getElementById("m2_description")
      ? document.getElementById("m2_description").value
      : "",
  };

  let valid = true;
  let message = "";
  const validationFields = ["title", "type"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  let success = true;
  if (valid) {
    let res = await updateDesignationAction(
      formData,
      designatin_id,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res.statusCode === 200) {
      document.getElementById("modalform2").reset();
      showModalSuccess("Details updated successfully.");
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

// Client request to delete
export const deleteDesignationRequest = async (
  e,
  designatin_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const userConfirmed = window.confirm(
    "Are you sure want to delete Designation?"
  );

  if (userConfirmed) {
    let res = await deleteDesignationRecordAction(
      designatin_id,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res) {
      window.location.reload();
    } else {
      //showError("Server Error:", res.returnData.error)
      window.location.reload();
    }
  }
};

///////////////////////// Team methods

// Client request to get all teams
export const getAllTeamRequest = async (
  apiBackendURL,
  accessToken,
  tenantID
) => {
  let res = await getAllTeamRecordsAction(apiBackendURL, accessToken, tenantID);
  if (res.statusCode === 200) {
    return res;
  }
};

// Client request to create team
export const createTeamRequest = async (e, apiBackendURL, tokens, tenantID) => {
  e.preventDefault();

  const formData = {
    team_title: document.getElementById("m3_team_title")
      ? document.getElementById("m3_team_title").value
      : "",
    team_role: document.getElementById("m3_team_role")
      ? document.getElementById("m3_team_role").value
      : "",
    role_level: document.getElementById("m3_role_level")
      ? document.getElementById("m3_role_level").value
      : "",
  };

  let valid = true;
  let message = "";
  const validationFields = ["team_title"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  const teamrole = document.getElementById("m3_team_role");
  formData.team_role = teamrole.options[teamrole.selectedIndex].value;

  const rolelevel = document.getElementById("m3_role_level");
  formData.role_level = rolelevel.options[rolelevel.selectedIndex].value;

  if (
    valid &&
    (teamrole.selectedIndex === 0 || rolelevel.selectedIndex === 0)
  ) {
    valid = false;
    message = "Please select role and role level.";
  }

  let success = true;
  if (valid) {
    let res = await createTeamAction(formData, apiBackendURL, tokens, tenantID);
    if (res.statusCode === 200) {
      document.getElementById("modalform3").reset();
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

// Client request to update team
export const updateTeamRequest = async (
  e,
  team_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const formData = {
    team_title: document.getElementById("m3_team_title")
      ? document.getElementById("m3_team_title").value
      : "",
    team_role: document.getElementById("m3_team_role")
      ? document.getElementById("m3_team_role").value
      : "",
    role_level: 0,
  };
  let valid = true;
  let message = "";
  const validationFields = ["team_title"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });
  const teamrole = document.getElementById("m3_team_role");
  formData.team_role = teamrole.options[teamrole.selectedIndex].value;

  const rolelevel = document.getElementById("m3_role_level");
  formData.role_level = parseInt(
    rolelevel.options[rolelevel.selectedIndex].value
  );
  if (
    valid &&
    (teamrole.selectedIndex === 0 || rolelevel.selectedIndex === 0)
  ) {
    valid = false;
    message = "Please select role and role level.";
  }

  let success = true;
  if (valid) {
    let res = await updateTeamAction(
      formData,
      team_id,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res) {
      document.getElementById("modalform3").reset();
      showModalSuccess("Details updated successfully.");
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

// Client request to delete
export const deleteTeamRequest = async (
  e,
  team_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const userConfirmed = window.confirm("Are you sure want to delete Team?");

  if (userConfirmed) {
    let res = await deleteTeamRecordAction(
      team_id,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res) {
      window.location.reload();
    } else {
      //showError("Server Error:", res.returnData.error)
      window.location.reload();
    }
  }
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
    let res = await createRfxPrereqAction(
      formData,
      table_name,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res.statusCode === 200) {
      document.getElementById("modalform4").reset();
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
      document.getElementById("modalform4").reset();
      showModalSuccess("Updated details successfully.");
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

////////////////////////////// customer methods

// Client request to get all customer
export const getAllCustomerRequest = async () => {
  let res = await getAllCustomerRecordsAction();
  if (res.statusCode === 200) {
    return res;
  }
};

// Client request to create customer
export const createCustomerRequest = async (
  e,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const formData = {
    company_id: "",
    designation_id: "",
    customer_name: document.getElementById("m5_customer_name")
      ? document.getElementById("m5_customer_name").value
      : "",
    email: document.getElementById("m5_email")
      ? document.getElementById("m5_email").value
      : "",
    phone: document.getElementById("m5_phone")
      ? document.getElementById("m5_phone").value
      : "",
    address: document.getElementById("m5_address")
      ? document.getElementById("m5_address").value
      : "",
  };

  const companyid = document.getElementById("m5_company_id");
  formData.company_id = companyid.options[companyid.selectedIndex].value;

  const designationid = document.getElementById("m5_designation_id");
  formData.designation_id =
    designationid.options[designationid.selectedIndex].value;

  let valid = true;
  let message = "";
  const validationFields = [
    "company_id",
    "designation_id",
    "customer_name",
    "email",
  ];

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
    let res = await createCustomerAction(
      formData,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res.statusCode === 200) {
      document.getElementById("modalform5").reset();
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

// Client request to delete
export const deleteCustomerRequest = async (
  e,
  customer_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const userConfirmed = window.confirm(
    "Are you sure want to delete Customer? This will delete customers's all data."
  );

  if (userConfirmed) {
    let res = await deleteCustomerRecordAction(
      customer_id,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res) {
      window.location.reload();
    } else {
      window.location.reload();
      //showError("Server Error:", res.returnData.error);
    }
  }
};

// Client request to update customer
export const updateCustomerRequest = async (
  e,
  customer_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  let formData = {
    company_id: "",
    designation_id: "",
    customer_name: document.getElementById("m5_customer_name")
      ? document.getElementById("m5_customer_name").value
      : "",
    email: document.getElementById("m5_email")
      ? document.getElementById("m5_email").value
      : "",
    phone: document.getElementById("m5_phone")
      ? document.getElementById("m5_phone").value
      : "",
    address: document.getElementById("m5_address")
      ? document.getElementById("m5_address").value
      : "",
  };
  
  const companyid = document.getElementById("m5_company_id");
  formData.company_id = companyid.options[companyid.selectedIndex].value;

  const designationid = document.getElementById("m5_designation_id");
  formData.designation_id =
    designationid.options[designationid.selectedIndex].value;

  let valid = true;
  let message = "";
  const validationFields = [
    "company_id",
    "designation_id",
    "customer_name",
    "email",
  ];

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
    let res = await updateCustomerAction(
      formData,
      customer_id,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res.statusCode === 200) {
      message = "Details updated successfully.";
      window.location.reload();
    } else {
      message = res.returnData.error;
      success = false;
    }
  } else {
  }

  if (!valid || !success) {
    showModalError(message);
  }
};

////////////////////////////// Opportunity methods

// Client request to get all customer
export const getAllOpportunityRequest = async () => {
  let res = await getAllCustomerRecordsAction();
  if (res.statusCode === 200) {
    return res;
  }
};

// Client request to create customer
export const createOpportunityRequest = async (
  e,
  apiBackendURL,
  tokens,
  tenantID,
  customer,
  endUser
) => {
  e.preventDefault();

  const formData = {
    company_id: "",
    customer_id: "",
    title: document.getElementById("m6_title")
      ? document.getElementById("m6_title").value
      : "",
    type: document.getElementById("m6_type")
      ? document.getElementById("m6_type").value
      : "",
    probability: document.getElementById("m6_probability")
      ? document.getElementById("m6_probability").value
      : "",
    total_value: document.getElementById("m6_total_value")
      ? document.getElementById("m6_total_value").value
      : "",
    total_value: document.getElementById("m6_total_value")
      ? document.getElementById("m6_total_value").value
      : "",
    crm_id: document.getElementById("m6_crm_id")
      ? document.getElementById("m6_crm_id").value
      : "",
    customer_name: customer,
    end_user_name: endUser,

    region: document.getElementById("m6_region")
      ? document.getElementById("m6_region").value
      : "",
    industry_code: document.getElementById("m6_industry_code")
      ? document.getElementById("m6_industry_code").value
      : "",
    business_unit: document.getElementById("m6_business_unit")
      ? document.getElementById("m6_business_unit").value
      : "",
    project_type: document.getElementById("m6_project_type")
      ? document.getElementById("m6_project_type").value
      : "",
    delivery_duration: document.getElementById("m6_delivery_duration")
      ? document.getElementById("m6_delivery_duration").value
      : "",
    stage: document.getElementById("m6_stage")
      ? document.getElementById("m6_stage").value
      : "",
    status: document.getElementById("m6_status")
      ? document.getElementById("m6_status").value
      : "",
    expected_award_date: document.getElementById("m6_expected_award_date")
      ? document.getElementById("m6_expected_award_date").value
      : "",
    expected_rfx_date: document.getElementById("m6_expected_rfx_date")
      ? document.getElementById("m6_expected_rfx_date").value
      : "",
    close_date: document.getElementById("m6_close_date")
      ? document.getElementById("m6_close_date").value
      : "",
    competition: document.getElementById("m6_competition")
      ? document.getElementById("m6_competition").value
      : "",
    gross_profit_percent: document.getElementById("m6_gross_profit_percent")
      ? document.getElementById("m6_gross_profit_percent").value
      : "",
    gross_profit_value: document.getElementById("m6_gross_profit_value")
      ? document.getElementById("m6_gross_profit_value").value
      : "",
    description: document.getElementById("m6_description")
      ? document.getElementById("m6_description").value
      : "",
    forcasted: true,
  };

  const companyid = document.getElementById("m6_company_id");
  formData.company_id = companyid.options[companyid.selectedIndex].value;

  const designationid = document.getElementById("m6_customer_id");
  formData.customer_id =
    designationid.options[designationid.selectedIndex].value;

  const forcasted = document.getElementById("m6_forcasted");
  formData.forcasted =
    forcasted.options[forcasted.selectedIndex].value == "yes" ? true : false;

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
    let res = await createOpportunityAction(
      formData,
      apiBackendURL,
      tokens,
      tenantID
    );
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
};

// Client request to delete
export const deleteOpportunityRequest = async (e, opportunity_id) => {
  e.preventDefault();

  const userConfirmed = window.confirm(
    "Do you sure want to delete Opportunity? This will delete all data."
  );

  if (userConfirmed) {
    let res = await deleteOpportunityRecordAction(opportunity_id);
    if (res) {
      window.location.reload();
    } else {
      window.location.reload();
      //showError("Server Error:", res.returnData.error);
    }
  }
};

// Client request to update customer
export const updateOpportunityRequest = async (
  e,
  opportunity_id,
  customer,
  endUser,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  let formData = {
    company_id: "",
    customer_id: "",
    title: document.getElementById("m6_title")
      ? document.getElementById("m6_title").value
      : "",
    type: document.getElementById("m6_type")
      ? document.getElementById("m6_type").value
      : "",
    probability: document.getElementById("m6_probability")
      ? document.getElementById("m6_probability").value
      : "",
    total_value: document.getElementById("m6_total_value")
      ? document.getElementById("m6_total_value").value
      : "",
    total_value: document.getElementById("m6_total_value")
      ? document.getElementById("m6_total_value").value
      : "",
    crm_id: document.getElementById("m6_crm_id")
      ? document.getElementById("m6_crm_id").value
      : "",
    customer_name: customer,
    end_user_name: endUser,

    region: document.getElementById("m6_region")
      ? document.getElementById("m6_region").value
      : "",
    industry_code: document.getElementById("m6_industry_code")
      ? document.getElementById("m6_industry_code").value
      : "",
    business_unit: document.getElementById("m6_business_unit")
      ? document.getElementById("m6_business_unit").value
      : "",
    project_type: document.getElementById("m6_project_type")
      ? document.getElementById("m6_project_type").value
      : "",
    delivery_duration: document.getElementById("m6_delivery_duration")
      ? document.getElementById("m6_delivery_duration").value
      : "",
    stage: document.getElementById("m6_stage")
      ? document.getElementById("m6_stage").value
      : "",
    status: document.getElementById("m6_status")
      ? document.getElementById("m6_status").value
      : "",
    expected_award_date: document.getElementById("m6_expected_award_date")
      ? document.getElementById("m6_expected_award_date").value
      : "",
    expected_rfx_date: document.getElementById("m6_expected_rfx_date")
      ? document.getElementById("m6_expected_rfx_date").value
      : "",
    close_date: document.getElementById("m6_close_date")
      ? document.getElementById("m6_close_date").value
      : "",
    competition: document.getElementById("m6_competition")
      ? document.getElementById("m6_competition").value
      : "",
    gross_profit_percent: document.getElementById("m6_gross_profit_percent")
      ? document.getElementById("m6_gross_profit_percent").value
      : "",
    gross_profit_value: document.getElementById("m6_gross_profit_value")
      ? document.getElementById("m6_gross_profit_value").value
      : "",
    description: document.getElementById("m6_description")
      ? document.getElementById("m6_description").value
      : "",
    forcasted: true,
  };

  const companyid = document.getElementById("m6_company_id");
  formData.company_id = companyid.options[companyid.selectedIndex].value;

  const designationid = document.getElementById("m6_customer_id");
  formData.customer_id =
    designationid.options[designationid.selectedIndex].value;

  const forcasted = document.getElementById("m6_forcasted");
  formData.forcasted =
    forcasted.options[forcasted.selectedIndex].value == "yes" ? true : false;

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
    let res = await updateOpportunityRecordAction(
      formData,
      opportunity_id,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res.statusCode === 200) {
      showModalSuccess("Details updated successfully");
      window.location.reload();
    } else {
      message = res.returnData.error;
      success = false;
    }
  } else {
  }

  if (!valid || !success) {
    showModalError(message);
  }
};

///////////////////////// Phase Stage methods

// Client request to create Phase Stage
export const createPhaseStageRequest = async (
  e,
  typeName,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const formData = {
    default_name: document.getElementById("m1_default_name")
      ? document.getElementById("m1_default_name").value
      : "",
    new_name: document.getElementById("m1_new_name")
      ? document.getElementById("m1_new_name").value
      : "",
    type: typeName,
    display_order: document.getElementById("m1_display_order")
      ? document.getElementById("m1_display_order").value
      : 0,
    score: document.getElementById("m1_score")
      ? document.getElementById("m1_score").value
      : 0,
    required:
      document.getElementById("m1_required") &&
      document.getElementById("m1_required").checked == true
        ? true
        : false,
    status: "",
  };

  let valid = true;
  let message = "";
  const validationFields = ["default_name"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  let success = true;
  if (valid) {
    let res = await createPhaseStageAction(
      formData,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res.statusCode === 200) {
      document.getElementById("modalform1").reset();
      showModalSuccess("New details added successfully.");
      window.location.reload();
    } else {
      success = false;
      message = res.error;
    }
  }

  if (!valid || !success) {
    showModalError(message);
  }
};

// Client request to create Phase Stage
export const updatePhaseStageRequest = async (
  e,
  typeName,
  id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const formData = {
    default_name: document.getElementById("m1_default_name")
      ? document.getElementById("m1_default_name").value
      : "",
    new_name: document.getElementById("m1_new_name")
      ? document.getElementById("m1_new_name").value
      : "",
    type: typeName,
    display_order: document.getElementById("m1_display_order")
      ? document.getElementById("m1_display_order").value
      : 0,
    score: document.getElementById("m1_score")
      ? document.getElementById("m1_score").value
      : 0,
    required: document.getElementById("m1_required")
      ? document.getElementById("m1_required").checked
      : true,
    status: "",
  };

  let valid = true;
  let message = "";
  const validationFields = ["default_name"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  let success = true;
  if (valid) {
    let res = await updatePhaseStageRecordAction(
      formData,
      id,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res.statusCode === 200) {
      showModalSuccess("Details updated successfully.");
      window.location.reload();
    } else {
      success = false;
      message = res.error;
    }
  }

  if (!valid || !success) {
    showModalError(message);
  }
};

// Client request to delete
export const deletePhaseStageRequest = async (
  e,
  id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const userConfirmed = window.confirm("Are you sure want to Rfx Stage?");

  if (userConfirmed) {
    let res = await deletePhaseStageRecordAction(
      id,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res) {
      window.location.reload();
    } else {
      //showError("Server Error:", res.returnData.error)
      window.location.reload();
    }
  }
};

///////////////////////// Persona methods

// Client request to create new Persona
export const createPersonaRequest = async (
  e,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const formData = {
    persona_role: document.getElementById("m7_persona_role")
      ? document.getElementById("m7_persona_role").value
      : "",
    is_active: true,
    description: document.getElementById("m7_description")
      ? document.getElementById("m7_description").value
      : "",
  };

  let valid = true;
  let message = "";
  const validationFields = ["persona_role"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  const isactive = document.getElementById("m7_is_active");
  formData.is_active =
    isactive.options[isactive.selectedIndex].value === "Active" ? true : false;

  if (valid && isactive.selectedIndex == 0) {
    valid = false;
    message = "Please select the status.";
  }
  let success = true;
  if (valid) {
    showMainLoader102();
    let res = await createPersonaAction(
      formData,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res.statusCode === 200) {
      //document.getElementById("modalform4").reset();
      //showModalSuccess("New details added successfully.");
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

// Client request to update Persona
export const updatePersonaRequest = async (
  e,
  id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const formData = {
    persona_role: document.getElementById("m7_persona_role")
      ? document.getElementById("m7_persona_role").value
      : "",
    is_active: true,
    description: document.getElementById("m7_description")
      ? document.getElementById("m7_description").value
      : "",
  };

  let valid = true;
  let message = "";
  const validationFields = ["persona_role"];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Please fill the required fields.";
    }
  });

  const isactive = document.getElementById("m7_is_active");
  formData.is_active =
    isactive.options[isactive.selectedIndex].value === "Active" ? true : false;

  if (valid && isactive.selectedIndex == 0) {
    valid = false;
    message = "Please select the status.";
  }

  let success = true;
  if (valid) {
    showMainLoader102();
    let res = await updatePersonaRecordAction(
      formData,
      id,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res.statusCode === 200) {
      //document.getElementById("modalform4").reset();
      //showModalSuccess("Details updated successfully.");
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

// Client request to delete Personal
export const deletePersonaRequest = async (
  e,
  id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  e.preventDefault();

  const userConfirmed = window.confirm(
    "Are you sure want delete persona?" + id
  );

  if (userConfirmed) {
    let res = await deletePersonaRecordAction(
      id,
      apiBackendURL,
      tokens,
      tenantID
    );
    if (res) {
      window.location.reload();
    } else {
      //showError("Server Error:", res.returnData.error)
      window.location.reload();
    }
  }
};



