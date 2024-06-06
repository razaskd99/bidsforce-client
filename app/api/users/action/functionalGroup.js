"use server"

import { getApiPrereqVars } from "../../util/action/apiCallPrereq";

export const getAllFunctionalGroupAction = async (searchTermValue, offset, limit) => {
  const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
  try {
      const url = `${apiBackendURL}functional_group/functional_group/tenant/${tenantID}?searchTerm=${searchTermValue}&offset=${offset}&limit=${limit}`;

      const response = await fetch(url, {
        cache: 'no-store',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${tokens}`,
        },
        redirect: 'follow',
      });
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request failed for Functional Group',
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
        error: error.message || 'Request failed for Functional Group',
      };
    }
}


export const getFunctionalGroupByIDAction = async (functional_group_id) => {
  const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars(functional_group_id)
  try {
      const url = `${apiBackendURL}functional_group/functional_group/id/${functional_group_id}`;

      const response = await fetch(url, {
        cache: 'no-store',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${tokens}`,
        },
        redirect: 'follow',
      });
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request failed for  Functional Group',
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
        error: error.message || 'Request failed for Functional Group',
      };
    }

}


// Create new Functional Group record in db
export const createFunctionalGroupAction = async (formData) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    const apiUrl = `${apiBackendURL}functional_group/functional_group`;
     
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
        "tenant_id":tenantID,
        "title": formData.title,
        "active": formData.active,
        "created_at": formattedTimestamp   
      }),
    };
    
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || "Functional Group creation failed",
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
        error: error.message || "Functional Group creation failed",
      };
    }
  };
  
  // delete a Functional Group record from db
  export const deleteFunctionalGroupRecordAction = async (functional_group_id) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    try {
      const url = `${apiBackendURL}functional_group/functional_group/id/${functional_group_id}`;
  
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
          error: response.statusText || "Request failed for Functional Group",
        };
      }

      return {
        statusCode: "200",
        returnData: [],
      };

    } catch (error) {
      return {
        statusCode: "400",
        returnData: [],
        error: error.message || "Request failed for Functional Group",
      };
    }
  };



  // Update Functional Group record 
  export const updateFunctionalGroupAction = async (formData, functional_group_id) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    const apiUrl = `${apiBackendURL}functional_group/functional_group/id/${functional_group_id}`;
    
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
        "title": formData.title,
        "active": formData.active,
        "created_at": formattedTimestamp
      }),
    };
 
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || "Functional Group updation failed",
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
        error: error.message || "Functional Group updation failed",
      };
    }
  };
  