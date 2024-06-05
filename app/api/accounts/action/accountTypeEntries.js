'use server'

import { revalidatePath } from "next/cache";
import { getApiPrereqVars } from "../../util/action/apiCallPrereq"

// Add new Account Type Entries record in db
export const createAccountTypeEntriesAction = async (account_id, id ) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    const apiUrl = `${apiBackendURL}account_type_entries/account_type_entries`;
     
    const headers = new Headers({
      cache: "no-store",
      Accept: "application/json",
      Authorization: `Bearer ${tokens}`,
      "Content-Type": "application/json",
    });
  
  
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        "tenant_id": tenantID,
        "account_id": account_id,
        "account_type_id": id,
        
        }),
    };
    
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || "Account Type Entries creation failed",
        };
      }
  
      const result = await response.json();
      revalidatePath("/accounts",'page')
  
      return {
        statusCode: 200,
        returnData: result,
      };
    } catch (error) {
      return {
        statusCode: "400",
        returnData: [],
        error: error.message || "Account Type Entries creation failed",
      };
    }
  };

// delete Account Type Entries record by ID
export const deleteAccountTypeEntriesAction = async (account_id) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    try {
      const url = `${apiBackendURL}account_type_entries/account_type_entries/account/${account_id}`;
  
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
          error: response.statusText || "Request failed for Account Type Entries",
        };
      }
    } catch (error) {
      return {
        statusCode: "400",
        returnData: [],
        error: error.message || "Request failed for Account Type Entries",
      };
    }
  };

  // get all Account Type Entries records from db
  export const getAllAccountTypeEntriesAction = async (account_id) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    try {
      const url = `${apiBackendURL}account_type_entries/account_type_entries/account/${account_id}`;
     
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
          error: response.statusText || "Request failed for Account Type Entries",
        };
      }
  
      const result = await response.json();

      revalidatePath("/accounts",'page')
  
      return {
        statusCode: 200,
        returnData: result,
      };
    } catch (error) {
      return {
        statusCode: "400",
        returnData: [],
        error: error.message || "Request failed for Account Type Entries",
      };
    }
  };

// get Account Type Entries record by id from db
export const getAccountTypeEntriesByIDAction = async (account_type_entries_id) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    try {
      const url = `${apiBackendURL}account_type_entries/account_type_entries/id/${account_type_entries_id}`;
     
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
          error: response.statusText || "Request failed for Account Type Entries",
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
        error: error.message || "Request failed for Account Type Entries",
      };
    }
  };
  
  
