import { getApiPrereqVars } from "../../util/action/apiCallPrereq";



// get all AccountType records from db
export const getAllAccountTypeRecordsAction = async (searchTermValue, offset, limit) => {
    try {
      const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
      const url = `${apiBackendURL}account_type/account_type/tenant/${tenantID}?searchTerm=${searchTermValue}&offset=${offset}&limit=${limit}`;
      console.log(url)
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
          error: response.statusText || "Request failed for Account Type",
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
        error: error.message || "Request failed for Account Type",
      };
    }
  };
  
  
  // get  AccountType record by ID
  export const getAccountTypeRecordByIDAction = async (account_type_id) => {
    try {
      const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
      const url = `${apiBackendURL}account_type/account_type/id/${account_type_id}`;
      
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
          returnData: {},
          error: response.statusText || "Request failed for Account Type",
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
        error: error.message || "Request failed for Account Type",
      };
    }
  };
  

  // delete a AccountType record from db
export const deleteAccountTypeRecordAction = async (id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    const url = `${apiBackendURL}account_type/account_type/id/${id}`;
   
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
        error: response.statusText || "Request failed for Account Type",
      };
    }
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Account Type",
    };
  }
};

// Update AccountType record in db
export const updateAccountTypeRecordAction = async (formData, id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();

  const apiUrl = `${apiBackendURL}account_type/account_type/id/${id}`;
  
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
        "type_name": formData.type_name,
        "created_at": formattedTimestamp
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Account Type update failed",
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
      error: error.message || "Account Type updation failed",
    };
  }
};

export const createAccountTypeAction = async (  
  formData
) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}account_type/account_type/`;

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
        "type_name": formData.type_name,
        "created_at": formattedTimestamp
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Account Type creation failed",
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
      error: error.message || "AccountType creation failed",
    };
  }
};
