'use server'


// required to access cookies
import { getApiPrereqVars } from "../../util/action/apiCallPrereq";


export const getAllSubmissionAction = async (rfxID) => {
  const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
  try {
    const url = `${apiBackendURL}bid_submissions/bid_submission/rfx_id/${rfxID}`;

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
        error: response.statusText || "Request failed for Bid Submission",
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
      error: error.message || "Request failed for Bid Submission",
    };
  }
};



export const getSubmissionByIdAction = async (bid_submission_id) => {
  const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
  try {
    const url = `${apiBackendURL}bid_submissions/bid_submission/id/${bid_submission_id}`;

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
        error: response.statusText || "Request failed for Bid Submission",
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
      error: error.message || "Request failed for Bid Submission",
    };
  }
};



export const createSubmissionAction = async (bidData) => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    const apiUrl = `${apiBackendURL}bid_submissions/bid_submission/`;
    
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
        "rfx_id": bidData.rfx_id,
        "bid_type": bidData.bid_type,
        "bid_stage": bidData.bid_stage,
        "assign_to_id": bidData.assign_to_id,
        "submitted_by": bidData.submitted_by,
        "reference_number": bidData.reference_number,
        "description": bidData.description,
        "status": bidData.status,
        "issued_date": formatedDate,
        "due_date": formatedDate,
        "created_on": formattedTimestamp
      })
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request Failed for Bid Submission',
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
        error: error.message || 'Request failed for Bid Submission',
      };
    }
  }

  

  export const getSubmissionPostsBySubIdAction = async (bid_submission_id) => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    try {
      const url = `${apiBackendURL}bid_submission_posts/bid_submission_posts/bid_submission/${bid_submission_id}`;

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
          error: response.statusText || "Request failed for Bid Submission Post",
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
        error: error.message || "Request failed for Bid Submission Post",
      };
    }
  };

  

  export const createSubmissionPostAction = async (postData) => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    const apiUrl = `${apiBackendURL}bid_submission_posts/bid_submission_posts/`;
   
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
        "bid_submission_id": postData.bid_submission_id,
        "title": postData.title,
        "comment": postData.comment,
        "status": postData.status,
        "posted_by": postData.posted_by,
        "posted_on": formattedTimestamp
      })
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request Failed for Bid Submission Post',
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
        error: error.message || 'Request failed for Bid Submission Post',
      };
    }
  }


