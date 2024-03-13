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




export const getRfxDetailAction = async (rfx_id) => {
  try {
    const url = `${apiBackendURL}rfx_detail/rfx_details/rfx/${rfx_id}`;

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
        returnData: {},
        error: response.statusText || "Request failed for Rfx Detail",
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
      error: error.message || "Request failed for Rfx Detail",
    };
  }
};



export const createRfxDetailAction = async (rfx_id) => {
    const apiUrl = `${apiBackendURL}rfx_detail/rfx_details/`;
  
    const now = new Date();
    const formattedTimestamp = now.toISOString()
    const formatedDate = now.toISOString().split('T')[0]
  
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
        "rfx_id": rfx_id,
        "skip_prelim": false,
        "skip_prelim_reason": "",
        "skip_detail": false,
        "skip_detail_reason": "",
        "skip_final": false,
        "skip_final_reason": "",
        "skip_order": false,
        "skip_order_reason": "",
        "skip_rfx_clarif": false,
        "skip_rfx_clarif_reason": "",
        "skip_bid_clarif": false,
        "skip_bid_clarif_reason": "",
        "created_on": formattedTimestamp,
        "updated_on": formattedTimestamp
      })
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request Failed for Rfx Detail',
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
        error: error.message || 'Request failed for Rfx Detail',
      };
    }
  }
  


  export const updateRfxDetailByRfxIDAction = async (rfx_id, detail_key, detailData) => {
    const apiUrl = `${apiBackendURL}rfx_detail/rfx_details/${detail_key}/${rfx_id}`;
  
    const now = new Date();
    const formattedTimestamp = now.toISOString()
    const formatedDate = now.toISOString().split('T')[0]
  
    const headers = new Headers({
      cache: 'no-store',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }); 

    detailData.updated_on = formattedTimestamp;
    
    const requestOptions = {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(detailData)
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: false,
          error: response.statusText || 'Request Failed for Rfx Detail',
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
        error: error.message || 'Request failed for Rfx Detail',
      };
    }
  }
  


  