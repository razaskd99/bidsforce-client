"use server"

import { revalidatePath } from "next/cache";
// get pre-req variables
import { getApiPrereqVars } from "../../util/action/apiCallPrereq";


export const getAllContactsTeamAction = async (searchTermValue) => {
  const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
  try {
      const url = `${apiBackendURL}contacts_team/contacts_team/tenant/${tenantID}?searchTerm=${searchTermValue}`;

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
          error: response.statusText || 'Request failed for  Contacts Team',
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
        error: error.message || 'Request failed for Contacts Team',
      };
    }
}


export const getAllContactsTeamByTitleAction = async (title) => {
  const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
  try {
      title = title.replace(/ /g, "-")
      const url = `${apiBackendURL}contacts_team/contacts_team/tenant/${tenantID}/title/${title}`;

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
          error: response.statusText || 'Request failed for  Contacts Team',
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
        error: error.message || 'Request failed for Contacts Team',
      };
    }
}



// Create new Contacts Team record in db
export const createContactsTeamAction = async (formData) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    const apiUrl = `${apiBackendURL}contacts_team/contacts_team`;
     
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
        "primary_contacts_id": formData.primary_contacts_id,
        "team_title": formData.team_title,
        "team_role": formData.team_role,
        "status": formData.status,
        "created_at": formattedTimestamp      
      }),
    };
    
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || "Contacts Team creation failed",
        };
      }
  
      const result = await response.json();  
     
      revalidatePath("/users?mode=teams",'page');

      return {
        statusCode: 200,
        returnData: result,
      };
    } catch (error) {
      return {
        statusCode: "400",
        returnData: [],
        error: error.message || "Contacts Team creation failed",
      };
    }
  };
  

  // delete a Contacts Team record from db
  export const deleteContactsTeamRecordAction = async (contacts_team_id) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    try {
      const url = `${apiBackendURL}contacts_team/contacts_team/id/${contacts_team_id}`;
  
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
          error: response.statusText || "Request failed for Contacts Team",
        };
      }
    } catch (error) {
      return {
        statusCode: "400",
        returnData: [],
        error: error.message || "Request failed for Contacts Team",
      };
    }
  };




  