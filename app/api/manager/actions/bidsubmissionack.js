'use server'


// required to access cookies
import { getApiPrereqVars } from "../../util/action/apiCallPrereq";


export const getBidSubmissionAckBySubIdAction = async (bid_submission_id) => {
  const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
  try {
    const url = `${apiBackendURL}bid_submission_acknowledgement/bid_submission_acknowledgement/bid_submission/${bid_submission_id}`;

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
        returnData: {},
        error: response.statusText || "Request failed for Bid Submission Acknowledgement",
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
      error: error.message || "Request failed for Bid Submission Acknowledgement",
    };
  }
};



export const createBidSubmissionAckAction = async (ackData) => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    const apiUrl = `${apiBackendURL}bid_submission_acknowledgement/bid_submission_acknowledgement/`;
  
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
        "bid_submission_id": ackData.bid_submission_id,
        "acknowledgement_deadline": formatedDate,
        "acknowledgement_comment": ackData.acknowledgement_comment,
        "acknowledged_by": ackData.acknowledged_by,
        "acknowledgement_date": formatedDate,
        "acknowledged_on": formattedTimestamp,
        "acknowledged": ackData.acknowledged
      })
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request Failed for Bid Submission Acknowledgement',
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
        error: error.message || 'Request failed for Bid Submission Acknowledgement',
      };
    }
  }
  


  export const updateBidSubmissionAckBySubIDAction = async (ackData, bid_submission_id) => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    const apiUrl = `${apiBackendURL}bid_submission_acknowledgement/bid_submission_acknowledgement/bid_submission/${bid_submission_id}`;
  
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
        "bid_submission_id": bid_submission_id,
        "acknowledgement_deadline": formatedDate,
        "acknowledgement_comment": ackData.acknowledgement_comment,
        "acknowledged_by": ackData.acknowledged_by,
        "acknowledgement_date": ackData.acknowledgement_date,
        "acknowledged_on": formattedTimestamp,
        "acknowledged": ackData.acknowledged
      })
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: false,
          error: response.statusText || 'Request Failed for Bid Submission Acknowledgement',
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
        error: error.message || 'Request failed for Bid Submission Acknowledgement',
      };
    }
  }
  


  