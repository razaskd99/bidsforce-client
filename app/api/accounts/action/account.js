'use server'


// start cookie init
import { getApiPrereqVars } from "../../util/action/apiCallPrereq";


// Add new Account record in db
export const createAccountAction = async (formData, account_number) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    const apiUrl = `${apiBackendURL}account/account`;
     
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
        "tenant_id": tenantID,
        "account_name": formData.account_name,
        "account_type_id": formData.account_type_id ? formData.account_type_id : 0,
        "account_owner_id": formData.account_owner_id,
        "street": formData.street,
        "city": formData.city ? formData.city : '',
        "postal_code": formData.postal_code,
        "country": formData.country,
        "data": formData?.data ? formData?.data : '' ,
        "created_at": formattedTimestamp,
        "account_number": account_number,
        "account_image": formData?.account_image ? formData?.account_image : '/avatar.png',
        "state": formData.state ? formData.state : '',
        }),
    };
    
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || "Account creation failed",
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
        error: error.message || "Account creation failed",
      };
    }
  };
  
 // Update Account record in db
export const updateAccountAction = async (formData,account_id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}account/account/id/${account_id}`;

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
        "tenant_id": tenantID,
        "account_name": formData.account_name,
        "account_type_id": formData.account_type_id ? formData.account_type_id : 0,
        "account_owner_id": formData.account_owner_id,
        "street": formData.street,
        "city": formData.city ? formData.city : '',
        "postal_code": formData.postal_code,
        "country": formData.country,
        "data": formData.data,
        "created_at": formattedTimestamp,
        "account_image": formData.account_image,
        "state": formData.state ? formData.state : '',
      }),
    };
    

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Account updation failed",
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
      error: error.message || "Account updation failed",
    };
  }
};

// delete a Account record from db
export const deleteAccountAction = async (account_id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}account/account/id/${account_id}`;

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
        error: response.statusText || "Request failed for Account",
      };
    }

  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Account",
    };
  }
};

// delete  Account from db
export const deleteAccountRecordAction = async (account_id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}account/account/id/${account_id}`;

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
        error: response.statusText || "Request failed for Account",
      };
    }
    
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Account",
    };
  }
};

// get all Account records from db
export const getAllAccountRecordsAction = async (searchTermValue, offset, limit) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}account/account/tenant/${tenantID}?searchTerm=${searchTermValue}&offset=${offset}&limit=${limit}`;
   
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
        error: response.statusText || "Request failed for Account",
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
      error: error.message || "Request failed for Account",
    };
  }
};

// get Account record by id from db
export const getAccountRecordByIDAction = async (account_id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}account/account/id/${account_id}`;
   
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
        error: response.statusText || "Request failed for Account",
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
      error: error.message || "Request failed for Account",
    };
  }
};


// get all Account records from db
export const getAccountMaxRecordsAction = async () => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}account/account/max_id`;
   
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
        error: response.statusText || "Request failed for Account",
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
      error: error.message || "Request failed for Account",
    };
  }
};

