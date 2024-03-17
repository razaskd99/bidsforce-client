"use server";

import getConfig from "next/config";

// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
import { getApiPrereqVars } from "../../util/action/apiCallPrereq";
// end login init

// Add new User record in db
export const createUserAction = async (apiBackendURL, tokens, formData) => {
  const apiUrl = `${apiBackendURL}auth/signup`;

  // get token
  //let res = await getToken(apiBackendURL, username, password)
  //let tokens = res?.tokenData?.access_token

  const headers = new Headers({
    cache: "no-store",
    Accept: "application/json",
    Authorization: `Bearer ${tokens}`,
    "Content-Type": "application/json",
  });

  const now = new Date();
  const formattedTimestamp = now.toISOString();
  const formatedDate = now.toISOString().split("T")[0];

  let tenantID = await getCookieValue("TENANT_ID");

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      tenant_id: tenantID,
      team_id: formData.team_id,
      designation_id: formData.designation_id,
      company_id: formData.company_id,
      user_name: formData.user_name,
      email: formData.email,
      password: formData.password,
      first_name: formData.first_name,
      middle_name: "",
      last_name: formData.last_name,
      user_role: "",
      role_level: "",
      registration_date: formatedDate,
      last_login_at: formattedTimestamp,
      created_at: formattedTimestamp,
      updated_at: formattedTimestamp,
      active: formData.active === "Active" ? true : false,
      verified: formData.active === "Active" ? true : false,
      password_salt: "",
      user_profile_photo: formData.user_profile_photo,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "User creation failed",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "User creation failed",
    };
  }
};

// Update User record in db
export const updateUserRecordAction = async (
  formData,
  user_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  const apiUrl = `${apiBackendURL}auth/auth/users/id/${user_id}`;

  // get token
  //let res = await getToken(apiBackendURL, username, password)
  //let tokens = res?.tokenData?.access_token

  const headers = new Headers({
    cache: "no-store",
    Accept: "application/json",
    Authorization: `Bearer ${tokens}`,
    "Content-Type": "application/json",
  });

  const now = new Date();
  const formattedTimestamp = now.toISOString();
  const formatedDate = now.toISOString().split("T")[0];

  const requestOptions = {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      tenant_id: tenantID,
      team_id: formData.team_id,
      designation_id: formData.designation_id,
      company_id: formData.company_id,
      user_name: "string",
      email: "user@example.com",
      password: formData.password,
      first_name: formData.first_name,
      middle_name: "string",
      last_name: formData.last_name,
      user_role: "string",
      role_level: "string",
      registration_date: "2024-03-16",
      last_login_at: "2024-03-16T16:36:51.061Z",
      created_at: "2024-03-16T16:36:51.061Z",
      updated_at: "2024-03-16T16:36:51.061Z",
      active: formData.is_active,
      verified: false,
      password_salt: "string",
      user_profile_photo: "",
    }),
  };
  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "User update failed",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "User updation failed",
    };
  }
};

// delete a User record from db
export const deleteUserRecordAction = async (
  user_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  try {
    const url = `${apiBackendURL}auth/auth/users/id/${user_id}`;

    // get token
    //let res = await getToken(apiBackendURL, username, password)
    //let tokens = res?.tokenData?.access_token

    const response = await fetch(url, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request failed for User",
      };
    }
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for User",
    };
  }
};

// delete  All Users from dbs
export const deleteAllUsersAction = async () => {
  try {
    let tenantID = await getCookieValue("TENANT_ID");
    const url = `${apiBackendURL}auth/auth/users/all/tenant/${tenantID}`;

    // get token
    let res = await getToken(apiBackendURL, username, password);
    let tokens = res?.tokenData?.access_token;

    const response = await fetch(url, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request failed for User",
      };
    }
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for User",
    };
  }
};

// get all Users records from db
export const getAllUserRecordsAction = async (
  apiBackendURL,
  tokens,
  tenantID
) => {
  try {
    const url = `${apiBackendURL}auth/auth/users/tenant/${tenantID}`;

    // get token
    //let res = await getToken(apiBackendURL, username, password)
    //let tokens = res?.tokenData?.access_token

    const response = await fetch(url, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request failed for Company",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Company",
    };
  }
};

// get all Company records from db
export const getAllCompanyRecordsAction = async (
  apiBackendURL,
  tokens,
  tenantID
) => {
  try {
    const url = `${apiBackendURL}company/companies/tenant/${tenantID}`;

    // get token
    //let res = await getToken(apiBackendURL, username, password)
    //let tokens = res?.tokenData?.access_token

    const response = await fetch(url, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request failed for Designation",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Designation",
    };
  }
};

// get all Designation records from db
export const getAllTeamRecordsAction = async (
  apiBackendURL,
  tokens,
  tenantID
) => {
  try {
    const url = `${apiBackendURL}team/teams/tenant/${tenantID}`;

    // get token
    //let res = await getToken(apiBackendURL, username, password)
    //let tokens = res?.tokenData?.access_token

    const response = await fetch(url, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request failed for Team",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Team",
    };
  }
};

///////////////////////// Company methods

// Add new company record in db
export const createCompanyAction = async (
  formData,
  apiBackendURL,
  tokens,
  tenantID
) => {
  const apiUrl = `${apiBackendURL}company/companies`;

  // get token
  //let res = await getToken(apiBackendURL, username, password)
  //let tokens = res?.tokenData?.access_token

  const headers = new Headers({
    cache: "no-store",
    Accept: "application/json",
    Authorization: `Bearer ${tokens}`,
    "Content-Type": "application/json",
  });

  const now = new Date();
  const formattedTimestamp = now.toISOString();
  const formatedDate = now.toISOString().split("T")[0];

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      tenant_id: tenantID,
      company_name: formData.company_name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      industry: formData.industry,
      website: formData.website,
      company_logo: formData.company_logo,
      created_date: formattedTimestamp,
      updated_date: formattedTimestamp,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Company creation failed",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Company creation failed",
    };
  }
};

// Update company record in db
export const updateCompanyAction = async (
  formData,
  company_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  const apiUrl = `${apiBackendURL}company/companies/id/${company_id}`;

  // get token
  //let res = await getToken(apiBackendURL, username, password)
  //let tokens = res?.tokenData?.access_token

  const headers = new Headers({
    cache: "no-store",
    Accept: "application/json",
    Authorization: `Bearer ${tokens}`,
    "Content-Type": "application/json",
  });

  const now = new Date();
  const formattedTimestamp = now.toISOString();
  const formatedDate = now.toISOString().split("T")[0];

  const requestOptions = {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      tenant_id: tenantID,
      company_name: formData.company_name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      industry: formData.industry,
      website: formData.website,
      company_logo: formData.company_logo,
      created_date: formattedTimestamp,
      updated_date: formattedTimestamp,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Company updation failed",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Company updation failed",
    };
  }
};

// delete a Company record from db
export const deleteCompanyRecordAction = async (
  company_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  try {
    const url = `${apiBackendURL}company/companies/id/${company_id}`;

    // get token
    //let res = await getToken(apiBackendURL, username, password)
    //let tokens = res?.tokenData?.access_token

    const response = await fetch(url, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request failed for Company",
      };
    }
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Company",
    };
  }
};

// delete  All Company from db
export const deleteAllCompanyRecordAction = async (company_id) => {
  try {
    const url = `${apiBackendURL}company/companies/delete-all/id/${company_id}`;

    // get token
    let res = await getToken(apiBackendURL, username, password);
    let tokens = res?.tokenData?.access_token;

    const response = await fetch(url, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request failed for Company",
      };
    }
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Company",
    };
  }
};

///////////////////////// Designation methods

// get all Designation records from db
export const getAllDesignationRecordsAction = async (
  apiBackendURL,
  tokens,
  tenantID
) => {
  try {
    const url = `${apiBackendURL}designation/designations/tenant/${tenantID}`;

    // get token
    //let res = await getToken(apiBackendURL, username, password)
    //let tokens = res?.tokenData?.access_token

    const response = await fetch(url, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request failed for Designation",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Designation",
    };
  }
};

export const getDesignationRecordByIDAction = async (designatin_id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}designation/designations/id/${designatin_id}`;

    // get token
    //let res = await getToken(apiBackendURL, username, password)
    //let tokens = res?.tokenData?.access_token

    const response = await fetch(url, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request failed for Designation",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Designation",
    };
  }
};

// Add new designation record in db
export const createDesignationAction = async (
  formData,
  apiBackendURL,
  tokens,
  tenantID
) => {
  const apiUrl = `${apiBackendURL}designation/designations`;

  // get token
  //let res = await getToken(apiBackendURL, username, password)
  //let tokens = res?.tokenData?.access_token

  const headers = new Headers({
    cache: "no-store",
    Accept: "application/json",
    Authorization: `Bearer ${tokens}`,
    "Content-Type": "application/json",
  });

  const now = new Date();
  const formattedTimestamp = now.toISOString();
  const formatedDate = now.toISOString().split("T")[0];

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      tenant_id: tenantID,
      title: formData.title,
      type: formData.type,
      description: formData.description,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Designation creation failed",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Designation creation failed",
    };
  }
};

// Update designation record in db
export const updateDesignationAction = async (
  formData,
  designatin_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  const apiUrl = `${apiBackendURL}designation/designations/id/${designatin_id}`;

  // get token
  //let res = await getToken(apiBackendURL, username, password)
  //let tokens = res?.tokenData?.access_token

  const headers = new Headers({
    cache: "no-store",
    Accept: "application/json",
    Authorization: `Bearer ${tokens}`,
    "Content-Type": "application/json",
  });

  const now = new Date();
  const formattedTimestamp = now.toISOString();
  const formatedDate = now.toISOString().split("T")[0];

  const requestOptions = {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      tenant_id: tenantID,
      title: formData.title,
      type: formData.type,
      description: formData.description,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Designation updation failed",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Designation updation failed",
    };
  }
};

// delete a designation record from db
export const deleteDesignationRecordAction = async (
  designation_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  try {
    const url = `${apiBackendURL}designation/designations/id/${designation_id}`;

    // get token
    //let res = await getToken(apiBackendURL, username, password)
    //let tokens = res?.tokenData?.access_token

    const response = await fetch(url, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request failed for Designation",
      };
    }
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Designation",
    };
  }
};

// delete all designation record from db
export const deleteAllDesignationRecordAction = async (
  designation_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  try {
    const url = `${apiBackendURL}designation/designations/all-designation/id/${designation_id}`;

    // get token
    //let res = await getToken(apiBackendURL, username, password)
    //let tokens = res?.tokenData?.access_token

    const response = await fetch(url, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request failed for Designation",
      };
    }
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Designation",
    };
  }
};

///////////////////////// Team methods

// Add new team record in db
export const createTeamAction = async (
  formData,
  apiBackendURL,
  tokens,
  tenantID
) => {
  const apiUrl = `${apiBackendURL}team/teams`;

  // get token
  //let res = await getToken(apiBackendURL, username, password)
  //let tokens = res?.tokenData?.access_token

  const headers = new Headers({
    cache: "no-store",
    Accept: "application/json",
    Authorization: `Bearer ${tokens}`,
    "Content-Type": "application/json",
  });

  const now = new Date();
  const formattedTimestamp = now.toISOString();
  const formatedDate = now.toISOString().split("T")[0];

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      tenant_id: tenantID,
      team_title: formData.team_title,
      team_role: formData.team_role,
      role_level: formData.role_level,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Team creation failed",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Team creation failed",
    };
  }
};

// Add new team record in db
export const updateTeamAction = async (
  formData,
  team_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  const apiUrl = `${apiBackendURL}team/teams/id/${team_id}`;

  // get token
  //let res = await getToken(apiBackendURL, username, password)
  //let tokens = res?.tokenData?.access_token

  const headers = new Headers({
    cache: "no-store",
    Accept: "application/json",
    Authorization: `Bearer ${tokens}`,
    "Content-Type": "application/json",
  });

  const now = new Date();
  const formattedTimestamp = now.toISOString();
  const formatedDate = now.toISOString().split("T")[0];

  const requestOptions = {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      tenant_id: tenantID,
      team_title: formData.team_title,
      team_role: formData.team_role,
      role_level: formData.role_level,
    }),
  };
  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Team updation failed",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Team updation failed",
    };
  }
};

// delete a team record from db
export const deleteTeamRecordAction = async (
  team_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  try {
    const url = `${apiBackendURL}team/teams/id/${team_id}`;

    // get token
    //let res = await getToken(apiBackendURL, username, password)
    //let tokens = res?.tokenData?.access_token

    const response = await fetch(url, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request failed for Team",
      };
    }
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Team",
    };
  }
};

// delete  All Team from db
export const deleteAllTeamRecordAction = async (
  team_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  try {
    const url = `${apiBackendURL}team/teams/all-team/id/${team_id}`;

    // get token
    //let res = await getToken(apiBackendURL, username, password)
    //let tokens = res?.tokenData?.access_token

    const response = await fetch(url, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request failed for Company",
      };
    }
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Company",
    };
  }
};

///////////////////////// Customers methods

// Add new Customer record in db
export const createCustomerAction = async (
  formData,
  apiBackendURL,
  tokens,
  tenantID
) => {
  const apiUrl = `${apiBackendURL}customer/customers`;

  // get token
  //let res = await getToken(apiBackendURL, username, password)
  //let tokens = res?.tokenData?.access_token

  const headers = new Headers({
    cache: "no-store",
    Accept: "application/json",
    Authorization: `Bearer ${tokens}`,
    "Content-Type": "application/json",
  });

  const now = new Date();
  const formattedTimestamp = now.toISOString();
  const formatedDate = now.toISOString().split("T")[0];

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      tenant_id: tenantID,
      company_id: parseInt(formData.company_id),
      designation_id: parseInt(formData.designation_id),
      customer_name: formData.customer_name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      created_at: formattedTimestamp,
      created_date: formatedDate,
      updated_date: formatedDate,
    }),
  };
  console.log(requestOptions);
  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Customer creation failed",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Customer creation failed",
    };
  }
};

// delete a customer record from db
export const deleteCustomerRecordAction = async (
  customer_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  try {
    const url = `${apiBackendURL}customer/customers/id/${customer_id}`;

    // get token
    //let res = await getToken(apiBackendURL, username, password)
    //let tokens = res?.tokenData?.access_token

    const response = await fetch(url, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request failed for Customer",
      };
    }
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Customer",
    };
  }
};

// delete all customer record from db
export const deleteAllCustomerRecordAction = async (
  customer_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  try {
    const url = `${apiBackendURL}customer/customers/all-customer/id/${customer_id}`;

    // get token
    //let res = await getToken(apiBackendURL, username, password)
    //let tokens = res?.tokenData?.access_token

    const response = await fetch(url, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request failed for Customer",
      };
    }
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Customer",
    };
  }
};

// Update customer record in db
export const updateCustomerAction = async (
  formData,
  customer_id,
  apiBackendURL,
  tokens,
  tenantID
) => {
  const apiUrl = `${apiBackendURL}customer/customers/id/${customer_id}`;

  // get token
  //let res = await getToken(apiBackendURL, username, password)
  //let tokens = res?.tokenData?.access_token

  const headers = new Headers({
    cache: "no-store",
    Accept: "application/json",
    Authorization: `Bearer ${tokens}`,
    "Content-Type": "application/json",
  });

  const now = new Date();
  const formattedTimestamp = now.toISOString();
  const formatedDate = now.toISOString().split("T")[0];

  const requestOptions = {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      tenant_id: tenantID,
      company_id: parseInt(formData.company_id),
      designation_id: parseInt(formData.designation_id),
      customer_name: formData.customer_name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      created_at: formattedTimestamp,
      created_date: formatedDate,
      updated_date: formatedDate,
    }),
  };
  console.log(requestOptions + "lllllll");
  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Customer updation failed",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Customer updation failed",
    };
  }
};

// get all Company records from db
export const getAllCustomerRecordsAction = async (
  apiBackendURL,
  tokens,
  tenantID
) => {
  try {
    const url = `${apiBackendURL}customer/customers/tenant/${tenantID}`;

    // get token
    //let res = await getToken(apiBackendURL, username, password)
    //let tokens = res?.tokenData?.access_token

    const response = await fetch(url, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request failed for Customer",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      returnData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Customer",
    };
  }
};
