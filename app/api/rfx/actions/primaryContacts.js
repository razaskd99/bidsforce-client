'use server'

import { formatFileSize } from "../../util/utility";
import { cookies } from "next/headers";


// start cookie init
import { API_BACKEND_SERVER } from "@/app/setup";
import { getApiPrereqVars } from "../../util/action/apiCallPrereq";
import { getToken } from "../../util/script";
import { getCookieValue } from "@/lib/scripts";
// end cookie init



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
          data: [],
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
          returnData: {},
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
        returnData: {},
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
        "primary_contacts_id": 0,
        "tenant_id": tenantID,
        "company_id": formData.company_id,
        "designation_id": formData.designation_id,
        "team_id": formData.team_id,
        "first_name": formData.first_name,
        "last_name": formData.last_name,
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
  
  // delete a Primary Contacts record from db
  export const deletePrimaryContactsRecordAction = async (customer_id) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    try {
      const url = `${apiBackendURL}customer/customers/id/${customer_id}`;
  
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
  
  // delete all Primary Contacts record from db
  export const deleteAllPrimaryContactsRecordAction = async () => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    try {
      const url = `${apiBackendURL}customer/customers/all-customer/id/${customer_id}`;
    
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
  
  // Update Primary Contacts record in db
  export const updatePrimaryContactsAction = async (formData, customer_id) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    const apiUrl = `${apiBackendURL}customer/customers/id/${customer_id}`;
    
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
        company_id: formData.company_id,
        customer_name: formData.customer_name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        created_at: formattedTimestamp,
        updated_at: formattedTimestamp,
      }),
    };
 
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
  