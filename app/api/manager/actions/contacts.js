'use server'

// required to access cookies
import { getApiPrereqVars } from "../../util/action/apiCallPrereq";



export const deleteContactAction = async (contact_id) => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    const apiUrl = `${apiBackendURL}contacts/contacts/id/${contact_id}`;

    const now = new Date();
    const formattedTimestamp = now.toISOString()
    const formatedDate = now.toISOString().split('T')[0]
  
    const headers = new Headers({
      cache: 'no-store',
      'Accept': 'application/json',
      'Authorization': `Bearer ${tokens}`,
      'Content-Type': 'application/json'
    }); 
    
    const requestOptions = {
      method: 'DELETE',
      headers: headers      
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: false,
          error: response.statusText || 'Request Failed for Contact',
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
        error: error.message || 'Request failed for Contact',
      };
    }
  }
  
