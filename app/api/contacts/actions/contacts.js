"use server"

// get pre-req variables
import { getApiPrereqVars } from "../../util/action/apiCallPrereq";



export const getAllPrimaryContactsAction = async () => {
  const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
  try {
      const url = `${apiBackendURL}primary_contacts/primary_contacts/tenant/${tenantID}`;

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
          error: response.statusText || 'Request failed for  Primary Contacts',
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
        error: error.message || 'Request failed for Primary Contacts',
      };
    }
}


export const getPrimaryContactsByIDAction = async (primary_contacts_id) => {
  const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars(primary_contacts_id)
  try {
      const url = `${apiBackendURL}primary_contacts/primary_contacts/id/${primary_contacts_id}`;

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
          error: response.statusText || 'Request failed for  Primary Contacts',
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
        error: error.message || 'Request failed for Primary Contacts',
      };
    }

}


// Create new Primary Contacts record in db
export const createPrimaryContactsAction = async (formData) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    const apiUrl = `${apiBackendURL}primary_contacts/primary_contacts/`;
     
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
        "first_name": formData.first_name,
        "last_name": formData.last_name,
        "job_title": formData.job_title,
        "manager": formData.manager,
        "function_group": formData.function_group,
        "contact_number": formData.contact_number,
        "time_zone": formData.time_zone,
        "email": formData.email,
        "working_hours": formData.working_hours,
        "work_location": formData.work_location,
        "profile_image": formData.profile_image ? formData.profile_image : '/avatar.png',
        "created_at": formattedTimestamp      
      }),
    };
    
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || "Primary Contacts creation failed",
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
        error: error.message || "Primary Contacts creation failed",
      };
    }
  };
  
  // delete a Primary Contacts record from db
  export const deletePrimaryContactsRecordAction = async (primary_contacts_id) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    try {
      const url = `${apiBackendURL}primary_contacts/primary_contacts/id/${primary_contacts_id}`;
  
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



  // Update Primary Contacts record 
  export const updatePrimaryContactsAction = async (formData, primary_contacts_id) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    const apiUrl = `${apiBackendURL}primary_contacts/primary_contacts/id/${primary_contacts_id}`;
    
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
        "first_name": formData.first_name,
        "last_name": formData.last_name,
        "job_title": formData.job_title,
        "manager": formData.manager,
        "function_group": formData.function_group,
        "contact_number": formData.contact_number,
        "time_zone": formData.time_zone,
        "email": formData.email,
        "working_hours": formData.working_hours,
        "work_location": formData.work_location,
        "profile_image": formData.profile_image,
        "created_at": formattedTimestamp      
      }),
    };
 
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || "Primary contacts updation failed",
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
        error: error.message || "Primary contacts updation failed",
      };
    }
  };
  