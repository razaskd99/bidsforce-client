'use server'


// required to access cookies
import { getApiPrereqVars } from "../../util/action/apiCallPrereq";


export const getAllDeliverablesAction = async (rfxID) => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    try {
      const url = `${apiBackendURL}bid_deliverables/bid_deliverables/rfx/${rfxID}`;
  
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
          error: response.statusText || "Request failed for Deliverable",
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
        error: error.message || "Request failed for Deliverable",
      };
    }
  };



  export const getDeliverablesByIDAction = async (delivID) => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    try {
      const url = `${apiBackendURL}bid_deliverables/bid_deliverables/id/${delivID}`;
  
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
          error: response.statusText || "Request failed for Deliverable",
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
        error: error.message || "Request failed for Deliverable",
      };
    }
  };



  export const createDeliverablesAction = async (delivData) => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    const apiUrl = `${apiBackendURL}bid_deliverables/bid_deliverables/`;
  
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
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "rfx_id": delivData.rfx_id,
        "title": delivData.title,
        "description": delivData.description,
        "template": delivData.template,
        "template_type": delivData.template_type,
        "created_by": delivData.created_by,
        "created_on": formattedTimestamp
      })
    };
      console.log(requestOptions)
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request Failed for Rfx Deliverable',
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
        error: error.message || 'Request failed for Rfx Deliverable',
      };
    }
  }
