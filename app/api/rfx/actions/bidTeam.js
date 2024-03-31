'use server'

import { formatFileSize } from "../../util/utility";
import { cookies } from "next/headers";


// start cookie init
import { API_BACKEND_SERVER } from "@/app/setup";
import { getApiPrereqVars } from "../../util/action/apiCallPrereq";
import { getCookieValue } from "@/lib/scripts";
// end cookie init


// Create new Bid Team record in db
export const createBidTeamAction = async (formData) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    const apiUrl = `${apiBackendURL}bid_teams/bid_team/`;
     
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
        "user_id": formData.user_id,
        "index": formData.index,
        "title": formData.title,
        "persona": formData.persona,
        "created_at": formattedTimestamp    
      }),
    };
    console.log({
        "tenant_id": tenantID,
        "user_id": formData.user_id,
        "index": formData.index,
        "title": formData.title,
        "persona": formData.persona,
        "created_at": formattedTimestamp    
      })
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
  
  // delete a Bid Team record from db
  export const deleteBidTeamRecordAction = async (bid_team_id) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    try {
      const url = `${apiBackendURL}bid_teams/bid_team/id/${bid_team_id}`;
  
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
  
  // delete all Bid Team record from db
  export const deleteAllBidTeamRecordAction = async () => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    try {
      const url = `${apiBackendURL}bid_teams/bid_team/tenant/${tenantID}`;
    
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
  
  // Update Bid Team record in db
  export const updateBidTeamAction = async (formData, bid_team_id) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    const apiUrl = `${apiBackendURL}bid_teams/bid_team/id/${bid_team_id}`;
    
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
         "user_id": formData.user_id,
        "index": formData.index,
        "title": formData.title,
        "persona": formData.persona
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
  