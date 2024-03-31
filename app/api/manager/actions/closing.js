'use server'

// required to access cookies
import { getApiPrereqVars } from "../../util/action/apiCallPrereq";



export const updateRfxStatuAction = async (rfxID, status) => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    const apiUrl = `${apiBackendURL}rfx/rfx/rfx-status/id/${rfxID}`;

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
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        "status": status
      })
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: false,
          error: response.statusText || 'Request Failed for Bid Order Acknowledgement',
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
        error: error.message || 'Request failed for Bid Order Acknowledgement',
      };
    }
  }
  
