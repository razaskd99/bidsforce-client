'use server'

import getConfig from 'next/config'
import { getToken } from '../../util/script';


// start - get env variables
const { serverRuntimeConfig } = getConfig() || {};
let apiBackendURL = ''
let username = ''
let password = ''
let tenantID = 0

if (serverRuntimeConfig) {
  apiBackendURL = serverRuntimeConfig.API_BACKEND_SERVER
  username = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.user
  password = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.pass
  tenantID = serverRuntimeConfig?.TENANT_ID
  //isLogin = serverRuntimeConfig?.IS_LOGIN
}
// end - get env variables


export const getAllBidClarificationRecordsBy_RfxID_Action = async (rfxID) => {
    try {
      const url = `${apiBackendURL}bid_clarification/bid-clarifications/rfx-id/${rfxID}`;

      // get token
      let res = await getToken(apiBackendURL, username, password)
      let tokens = res?.tokenData?.access_token
  
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
          error: response.statusText || "Request failed for Bid Clarification",
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
        error: error.message || "Request failed for Bid Clarification",
      };
    }
  };


  export const getBidClarificationRecordsByIdAction = async (bid_clarification_id) => {
    try {
      const url = `${apiBackendURL}bid_clarification/bid-clarifications/id/${bid_clarification_id}`;

      // get token
      let res = await getToken(apiBackendURL, username, password)
      let tokens = res?.tokenData?.access_token
  
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
          error: response.statusText || "Request failed for Bid Clarification",
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
        error: error.message || "Request failed for Bid Clarification",
      };
    }
  };

  
  export const getAllBidClarificationPostRecordsBy_ClarifId_Action = async (clarif_id) => {
    try {
      const url = `${apiBackendURL}bid_clarification_post/bid_clarification_posts/clarification/${clarif_id}`;

      // get token
      let res = await getToken(apiBackendURL, username, password)
      let tokens = res?.tokenData?.access_token
  
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
          error: response.statusText || "Request failed for Bid Clarification Post",
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
        error: error.message || "Request failed for Bid Clarification Post",
      };
    }
  };



  export const createBidClarificationAction = async (rfxData) => {
    const apiUrl = `${apiBackendURL}bid_clarification/bid-clarifications/`;

    // get token
    let res = await getToken(apiBackendURL, username, password)
    let tokens = res?.tokenData?.access_token
  
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
        "rfx_id": rfxData.rfx_id,
        "submitted_by": rfxData.submitted_by,
        "assigned_to": rfxData.assigned_to,
        "reference_num": rfxData.reference_num,
        "title": rfxData.title,
        "type": rfxData.type,
        "status": rfxData.status,
        "description": rfxData.description,
        "issued_date": rfxData.issued_date,
        "due_date": rfxData.due_date,
        "completed": rfxData.completed,
        "completed_on": formattedTimestamp
      })
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request Failed for Bid Clarification',
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
        error: error.message || 'Request failed for Bid Clarification',
      };
    }
  }



  export const createBidClarificationCommentAction = async (rfxData) => {
    const apiUrl = `${apiBackendURL}bid_clarification_post/bid-clarification-posts/`;

    // get token
    let res = await getToken(apiBackendURL, username, password)
    let tokens = res?.tokenData?.access_token
  
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
        "bid_clarification_id": rfxData.bid_clarification_id,       
        "posted_by": rfxData.posted_by,
        "post_number": rfxData.post_number,
        "posted_on": formattedTimestamp,
        "title": rfxData.title,
        "comment": rfxData.comment,
        "parent_id": rfxData.parent_id ? rfxData.parent_id : 0
      })
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request Failed for Bid Clarification',
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
        error: error.message || 'Request failed for Bid Clarification',
      };
    }
  }
