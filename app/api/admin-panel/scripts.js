import {
  isValidEmail,
  showError,
  showModalError,
  showModalSuccess,
} from "./utility";
import {
  getAllUserRecordsAction,
  getAllCompanyRecordsAction,
  getAllDesignationRecordsAction,
  getAllTeamRecordsAction,
  createUserAction,
  deleteUserRecordAction,
  updateUserRecordAction,
  createCompanyAction,
  createDesignationAction,
  createTeamAction,
  deleteCompanyRecordAction,
  updateCompanyAction,
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

// Client request to create User
export const createUserRequest = async (
  e,
  apiBackendURL,
  accessToken,
  tenantID,
  companyName,
  desigination,
  team,
  activeUser,
  selectedFilesMain
) => {
  e.preventDefault();

  const formData = {
    tenant_id: tenantID,
    company_id: companyName,
    designation_id: desigination,
    team_id: team,
    active: activeUser,
    first_name: document.getElementById("first_name")
      ? document.getElementById("first_name").value
      : "",
    last_name: document.getElementById("last_name")
      ? document.getElementById("last_name").value
      : "",
    user_name: document.getElementById("user_name")
      ? document.getElementById("user_name").value
      : "",
    email: document.getElementById("email")
      ? document.getElementById("email").value
      : "",
    password: document.getElementById("password")
      ? document.getElementById("password").value
      : "",
    cpassword: document.getElementById("cpassword")
      ? document.getElementById("cpassword").value
      : "",
    user_profile_photo: document.getElementById("user_profile_photo")
      ? document.getElementById("user_profile_photo").value
      : "",
    egistration_date: "2024-01-25",
    last_login_at: "2024-01-25",
    created_at: "2024-01-25T14:04:20.334Z",
    updated_at: "2024-01-25T14:04:20.334Z",
  };
  console.log(selectedFilesMain);

  // const companyid = document.getElementById("company_id");
  // console.log(companyid);
  // formData.company_id = companyid.options[companyid.selectedIndex].value;

  // const designationid = document.getElementById("designation_id");
  // formData.designation_id =
  //   designationid.options[designationid.selectedIndex].value;

  // const teamid = document.getElementById("team_id");
  // formData.team_id = teamid.options[teamid.selectedIndex].value;

  // const isactive = document.getElementById("is_active");
  // const is_active = isactive.options[isactive.selectedIndex].value;
  // formData.active =
  //   isactive.options[isactive.selectedIndex].value === "Active" ? true : false;
  // formData.verified =
  //   isactive.options[isactive.selectedIndex].value === "Active" ? true : false;

  let valid = true;
  let message = "";
  let title = "Validation Error:";
  const validationFields = [
    "first_name",
    "last_name",
    "user_name",
    "email",
    "password",
    "cpassword",
  ];

  validationFields.forEach((element) => {
    if (!formData[element]) {
      valid = false;
      message = "Fill all the required fields to process registraion.";
    }
  });

  if (
    !formData.company_id ||
    !formData.designation_id ||
    !formData.team_id ||
    (!formData.team_id && !is_active)
  ) {
    valid = false;
    message = "Select the business logic options to proceede registration.";
  }

  if (valid && formData.password != formData.cpassword) {
    valid = false;
    message = "Password and Confirm Password are different.";
  }

  if (valid && !isValidEmail(formData.email)) {
    valid = false;
    message = "Email is not in the valid format.";
  }

  let success = true;
  if (valid) {
    let res = await createUserAction(apiBackendURL, accessToken, formData);
    if (res.statusCode === 200) {
      window.location = "/admin-panel/users";
    } else {
      valid = false;
      title = "Server Error:";
      message = res.error;
    }
  } else {
  }

  if (!valid || !success) {
    showError(title, message);
  }
};

// Client request to delete
export const deleteUserRequest = async (e, user_id) => {
  e.preventDefault();

  const userConfirmed = window.confirm(
    "Are you sure want to delete User? This will delete user's all data."
  );

  if (userConfirmed) {
    let res = await deleteUserRecordAction(user_id);
    if (res) {
      window.location.reload();
    } else {
      // showError("Server Error:", res.returnData.error*/);
    }
  }
};

// Client request to update user
export const updateUserRequest = async (e, user_id) => {
  e.preventDefault();

  let formData = {
    company_id: 0,
    designation_id: 0,
    team_id: 0,
    first_name: document.getElementById("first_name")
      ? document.getElementById("first_name").value
      : "",
    last_name: document.getElementById("last_name")
      ? document.getElementById("last_name").value
      : "",
    password: document.getElementById("password")
      ? document.getElementById("password").value
      : "",
    cpassword: document.getElementById("cpassword")
      ? document.getElementById("cpassword").value
      : "",
    user_profile_photo: document.getElementById("user_profile_photo")
      ? document.getElementById("user_profile_photo").value
      : "",
  };

  const companyid = document.getElementById("company_id");
  formData.company_id = companyid.options[companyid.selectedIndex].value;

  const designationid = document.getElementById("designation_id");
  formData.designation_id =
    designationid.options[designationid.selectedIndex].value;

  const teamid = document.getElementById("team_id");
  formData.team_id = teamid.options[teamid.selectedIndex].value;

  let valid = true;
  if (
    !formData.company_id ||
    formData.designation_id ||
    formData.team_id ||
    formData.first_name ||
    formData.last_name
  ) {
    showError("Validtaion Error", "Please fill the required field.");
    false;
  }

  if (valid && formData.password) {
    if (formData.password != formData.cpassword) {
      showError(
        "Validtaion Error",
        "Password and Confirm Password are different."
      );
    }
  }

  if (valid) {
    let res = await updateUserRecordAction(formData, user_id);
    if (res.statusCode === 200) {
      window.location.reload();
    } else {
      showError("Server Error:", res.returnData.error);
    }
  } else {
  }
};

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
  accessToken,
  tenantID
) => {
  let res = await getAllDesignationRecordsAction(
    apiBackendURL,
    accessToken,
    tenantID
  );
  if (res.statusCode === 200) {
    return res;
  }
};

///////////////////////// Company methods

// Client request to get all company
export const getAllCompanyRequest = async () => {
  let res = await getAllCompanyRecordsAction();
  if (res.statusCode === 200) {
    return res;
  }
};

// Client request to create company
export const createCompanyRequest = async (e) => {
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
  };

  let valid = true;
  let message = "";
  const validationFields = ["company_name", "phone", "email", "industry"];

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
    let res = await createCompanyAction(formData);
    if (res.statusCode === 200) {
      document.getElementById("modalform1").reset();
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
export const updateCompanyRequest = async (e, company_id) => {
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
  };

  let valid = true;
  let message = "";
  const validationFields = ["company_name", "phone", "email", "industry"];

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
    let res = await updateCompanyAction(formData, company_id);

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
    //showModalError(message)
  }
};

// Client request to delete company
export const deleteCompanyRequest = async (e, company_id) => {
  e.preventDefault();

  const userConfirmed = window.confirm(
    "Are you sure want to delete Company? This will delete user's all data."
  );

  if (userConfirmed) {
    let res = await deleteCompanyRecordAction(company_id);

    if (res) {
      window.location.reload();
    } else {
      //showError("Server Error:", "Could not delete")
      window.location.reload();
    }
  }
};

///////////////////////// Designation methods

// Client request to create designation
export const createDesignationRequest = async (e) => {
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
    let res = await createDesignationAction(formData);
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
export const updateDesignationRequest = async (e, designatin_id) => {
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
    let res = await updateDesignationAction(formData, designatin_id);
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
export const deleteDesignationRequest = async (e, designatin_id) => {
  e.preventDefault();

  const userConfirmed = window.confirm(
    "Are you sure want to delete Designation?"
  );

  if (userConfirmed) {
    let res = await deleteDesignationRecordAction(designatin_id);
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
export const getAllTeamRequest = async () => {
  let res = await getAllTeamRecordsAction();
  if (res.statusCode === 200) {
    return res;
  }
};

// Client request to create team
export const createTeamRequest = async (e) => {
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
    let res = await createTeamAction(formData);
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

// Client request to create team
export const updateTeamRequest = async (e, team_id) => {
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
    let res = await updateTeamAction(formData, team_id);
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
export const deleteTeamRequest = async (e, team_id) => {
  e.preventDefault();

  const userConfirmed = window.confirm("Are you sure want to delete Team?");

  if (userConfirmed) {
    let res = await deleteTeamRecordAction(team_id);
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
export const createRfxPrereqRequest = async (e, table_name) => {
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
    let res = await createRfxPrereqAction(formData, table_name);
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
export const updateRfxPrereqRequest = async (e, table_name, id) => {
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
    let res = await updateRfxPrereqAction(formData, table_name, id);
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
export const createCustomerRequest = async (e) => {
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
    let res = await createCustomerAction(formData);
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
export const deleteCustomerRequest = async (e, customer_id) => {
  e.preventDefault();

  const userConfirmed = window.confirm(
    "Are you sure want to delete Customer? This will delete customers's all data."
  );

  if (userConfirmed) {
    let res = await deleteCustomerRecordAction(customer_id);
    if (res) {
      window.location.reload();
    } else {
      window.location.reload();
      //showError("Server Error:", res.returnData.error);
    }
  }
};

// Client request to update customer
export const updateCustomerRequest = async (e, customer_id) => {
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
    let res = await updateCustomerAction(formData, customer_id);
    console.log(customer_id);
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
export const createOpportunityRequest = async (e, customer, endUser) => {
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
  console.log(formData);
  let success = true;
  if (valid) {
    let res = await createOpportunityAction(formData);
    if (res.statusCode === 200) {
      document.getElementById("modalform6").reset();
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
  endUser
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
  //console.log(formData);

  let success = true;
  if (valid) {
    let res = await updateOpportunityRecordAction(formData, opportunity_id);
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
export const createPhaseStageRequest = async (e, typeName) => {
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
    let res = await createPhaseStageAction(formData);
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
export const updatePhaseStageRequest = async (e, typeName, id) => {
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
    let res = await updatePhaseStageRecordAction(formData, id);
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
export const deletePhaseStageRequest = async (e, id) => {
  e.preventDefault();

  const userConfirmed = window.confirm("Are you sure want to Rfx Stage?");

  if (userConfirmed) {
    let res = await deletePhaseStageRecordAction(id);
    if (res) {
      window.location.reload();
    } else {
      //showError("Server Error:", res.returnData.error)
      window.location.reload();
    }
  }
};
