'use server'

import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig() || {};

let tenantID=0
let apiBackendURL=''
let accessToken = ''

if (serverRuntimeConfig) {
    tenantID=serverRuntimeConfig.TENANT_ID 
    apiBackendURL=serverRuntimeConfig.API_BACKEND_SERVER
    accessToken = serverRuntimeConfig.API_ACCESS_TOKEN_SERVER
}
export const loadPostData = async (postData) => {

    const { serverRuntimeConfig } = getConfig() || {};
    if (serverRuntimeConfig) {
        serverRuntimeConfig.TEMP_DATA={}
        serverRuntimeConfig.TEMP_DATA=postData
    }

}

//////////////////////////////////////////////////////
///////////////// Configuration settings/////////////
/////////////////////////////////////////////////////



export const getAllKoffMeetingAction = async (rfxID) => {
    try {
      const url = `${apiBackendURL}bid_kickoff_meeting/bid_kickoff_meeting/rfx/${rfxID}`;
  
      const response = await fetch(url, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        redirect: "follow",
      });
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || "Request failed for Koff Meeting",
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
        error: error.message || "Request failed for Koff Meeting",
      };
    }
  };



  export const getKoffMeetingByIDAction = async (koffID) => {
    try {
      const url = `${apiBackendURL}bid_kickoff_meeting/bid_kickoff_meeting/id/${koffID}`;
  
      const response = await fetch(url, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        redirect: "follow",
      });
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || "Request failed for Koff Meeting",
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
        error: error.message || "Request failed for Koff Meeting",
      };
    }
  };



  export const createKoffMeetingAction = async (koffData) => {
    const apiUrl = `${apiBackendURL}bid_kickoff_meeting/bid_kickoff_meeting/`;
  
    const now = new Date();
    const formattedTimestamp = now.toISOString()
    const formatedDate = now.toISOString().split('T')[0]

    koffData.start_time = koffData.start_time + ':00'
    let currentDate = new Date();
    let [hours, minutes, seconds] = koffData.start_time.split(':');
    currentDate.setHours(hours, minutes, seconds, 0);
    let timestamp1 = currentDate.toISOString();

    koffData.end_time = koffData.end_time + ':00'
    currentDate = new Date();
    [hours, minutes, seconds] = koffData.end_time.split(':');
    currentDate.setHours(hours, minutes, seconds, 0);
    const timestamp2 = currentDate.toISOString();
  
    const headers = new Headers({
      cache: 'no-store',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }); 
    
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "rfx_id": koffData.rfx_id,
        "title": koffData.title,
        "description": koffData.description,
        "template": koffData.template,
        "template_type": koffData.template_type,
        "location": koffData.location,
        "date": koffData.date,
        "start_time": timestamp1,
        "end_time": timestamp2,
        "created_on": formattedTimestamp
      })
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request Failed for Koff Meeting',
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
        error: error.message || 'Request failed for Rfx Koff Meeting',
      };
    }
  }
