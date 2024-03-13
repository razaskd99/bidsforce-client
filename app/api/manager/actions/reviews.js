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



export const getAllReviewsRecordsBy_Rfx_Key_Action = async (rfxID, review_key) => {
  try {
    const url = `${apiBackendURL}bid_review/bid_review/rfx/${rfxID}/key/${review_key}`;

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
        error: response.statusText || "Request failed for Review",
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
      error: error.message || "Request failed for Review",
    };
  }
};



export const getReviewRecordByIdAction = async (bid_review_id) => {
  try {
    const url = `${apiBackendURL}bid_review/bid_review/id/${bid_review_id}`;

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
        error: response.statusText || "Request failed for Review",
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
      error: error.message || "Request failed for Review",
    };
  }
};


export const getAllReviewContactsBy_BidReviewID_Action = async (bid_review_id) => {
  try {
    const url = `${apiBackendURL}bid_review_contacts/bid_review_contacts/bid_review/${bid_review_id}`;

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
        error: response.statusText || "Request failed for Review Contacts",
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
      error: error.message || "Request failed for Review Contacts",
    };
  }
};



export const createReviewEntryAction = async (reviewData, selectedContact) => {
    const apiUrl = `${apiBackendURL}bid_review/bid_review`;
  
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
        "rfx_id": reviewData.rfx_id,
        "bid_review_templates_id": reviewData.bid_review_templates_id,
        "template_data": reviewData.template_data,
        "review_Key": reviewData.review_Key,
        "score_value": reviewData.score_value,
        "score_name": reviewData.score_name,
        "score_description": reviewData.score_description,
        "issued_date": reviewData.issued_date,
        "due_date": reviewData.due_date,
        "status": reviewData.status,
        "skip_review": reviewData.skip_review,
        "skip_reason": reviewData.skip_reason,
        "required_revision": reviewData.required_revision,
        "review_approved": reviewData.review_approved,
        "review_approved_notes": reviewData.review_approved_notes,
        "review_declined": reviewData.review_declined,
        "review_declined_notes": reviewData.review_declined_notes,
        "review_revison": reviewData.review_revison,
        "review_revison_notes": reviewData.review_revison_notes,
        "created_at": formattedTimestamp,
        "updated_at": formattedTimestamp,
        "temp_title": reviewData.temp_title,
        "temp_ref_number": reviewData.temp_ref_number
      })
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request Failed for Review',
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
        error: error.message || 'Request failed for Review',
      };
    }
  }
  



  export const updateReviewEntryAction = async (bid_review_id) => {

    const apiUrl = `${apiBackendURL}bid_review/bid_review/id/${bid_review_id}`;
  
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
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        "rfx_id": 0,
        "bid_review_templates_id": 0,
        "template_data": "data data",
        "review_Key": "key",
        "score_value": 0,
        "score_name": "string",
        "score_description": "string",
        "issued_date": "2024-02-15",
        "due_date": "2024-02-15",
        "status": "string",
        "skip_review": false,
        "skip_reason": "",
        "required_revision": false,
        "review_approved": false,
        "review_approved_notes": "",
        "review_declined": false,
        "review_declined_notes": "",
        "review_revison": false,
        "review_revison_notes": "",
        "created_at": formattedTimestamp,
        "updated_at": formattedTimestamp
      })
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request Failed for Rfx',
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
        error: error.message || 'Request failed for Rfx',
      };
    }
  }
  


  export const createReviewContactsAction = async (bid_review_id, user_id, role, has_approved, approved_notes) => {
    const apiUrl = `${apiBackendURL}bid_review_contacts/bid_review_contacts`;
  
    const now = new Date();
    const formattedTimestamp = now.toISOString()
    const formatedDate = now.toISOString().split('T')[0]
  
    const headers = new Headers({
      cache: 'no-store',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }); 
    console.log({
      "bid_review_id": bid_review_id,
      "user_id": user_id,
      "review_role": role,
      "has_approved": has_approved,
      "approved_notes": approved_notes
    })
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "bid_review_id": bid_review_id,
        "user_id": user_id,
        "review_role": role,
        "has_approved": has_approved,
        "approved_notes": approved_notes
      })
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request Failed for Contacts',
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
        error: error.message || 'Request failed for Contacts',
      };
    }
  }



  export const getAllBidReviewPostRecordsById = async (bid_review_id) => {
    try {
      const url = `${apiBackendURL}bid_review_post/bid_review_posts/bid_review/${bid_review_id}`;
  
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
          error: response.statusText || "Request failed for Review Post",
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
        error: error.message || "Request failed for Review Post",
      };
    }
  };
  


  export const createBidReviewPostAction = async (reviewData) => {
    const apiUrl = `${apiBackendURL}bid_review_post/bid_review_posts/`;
  
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
        "bid_review_id": reviewData.bid_review_id,
        "title": reviewData.title,
        "comment": reviewData.comment,
        "status": reviewData.status,
        "posted_by": reviewData.posted_by,
        "posted_at": formattedTimestamp
      })
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request Failed for Review Post',
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
        error: error.message || 'Request failed for Review Post',
      };
    }
  }


  