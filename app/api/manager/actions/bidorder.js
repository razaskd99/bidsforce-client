'use server'

// required to access cookies
import { getApiPrereqVars } from "../../util/action/apiCallPrereq";


export const getAllBidOrderAction = async (rfxID) => {
  const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
  try {
    const url = `${apiBackendURL}bid_order/bid-orders/rfx-id/${rfxID}`;

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
        error: response.statusText || "Request failed for Bid Order",
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
      error: error.message || "Request failed for Bid Order",
    };
  }
};



export const getBidOrderByIdAction = async (bid_order_id) => {
  const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
  try {
    const url = `${apiBackendURL}bid_order/bid-orders/id/${bid_order_id}`;

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
        error: response.statusText || "Request failed for Bid Order",
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
      error: error.message || "Request failed for Bid Order",
    };
  }
};


export const getBidOrderByRfxIdAction = async (rfxID) => {
  const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
  try {
    const url = `${apiBackendURL}bid_order/bid-orders/rfx-id/${rfxID}`;
   
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
        error: response.statusText || "Request failed for Bid Order",
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
      error: error.message || "Request failed for Bid Order",
    };
  }
};



export const createBidOrderAction = async (orderData) => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    const apiUrl = `${apiBackendURL}bid_order/bid-orders/`;
  
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
        "rfx_id": orderData.rfx_id,
        "assign_to": orderData.assign_to,
        "acknowledged_by": orderData.acknowledged_by,
        "acknowledgement_document": orderData.acknowledgement_document,
        "bid_order_num": orderData.bid_order_num,
        "title": orderData.title,
        "currency": orderData.currency,
        "order_value": orderData.order_value,
        "description": orderData.description,
        "issued_date": orderData.issued_date,
        "delivery_date": orderData.delivery_date,
        "acknowledgement_deadline": orderData.acknowledgement_deadline,
        "acknowledgement_comment": orderData.acknowledgement_comment,
        "acknowledgement_date": formatedDate,
        "acknowledged_on": formattedTimestamp,
        "acknowledged": orderData.acknowledged,
        "order_complete": orderData.order_complete
      })
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request Failed for Bid Order',
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
        error: error.message || 'Request failed for Bid Order',
      };
    }
  }
  


  export const getBidOrderPostsByBidOrderIdAction = async (bid_order_id) => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    try {
      const url = `${apiBackendURL}bid_order_post/bid-order-posts/bid-order-id/${bid_order_id}`;
 
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
          error: response.statusText || "Request failed for Bid Order",
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
        error: error.message || "Request failed for Bid Order",
      };
    }
  };
  
  


  export const createBidOrderPostAction = async (orderData) => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    const apiUrl = `${apiBackendURL}bid_order_post/bid-order-posts/`;

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
        "bid_order_id": orderData.bid_order_id,
        "posted_by": orderData.posted_by,
        "post_number": orderData.post_number,
        "posted_on": formattedTimestamp,
        "title": orderData.title,
        "comment": orderData.comment,
        "parent_id": orderData.parent_id
      })
    };
      
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request Failed for Bid Order Post',
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
        error: error.message || 'Request failed for Bid Order Post',
      };
    }
  }
  



export const updateBidOrderAckByOrderIDAction = async (ackData, bid_order_id) => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    const apiUrl = `${apiBackendURL}bid_order/bid-orders/acknowledgement/${bid_order_id}`;

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
        "acknowledged_by": ackData.acknowledged_by,
        "acknowledgement_document": 0,
        "acknowledgement_comment": ackData.acknowledgement_comment,
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
  
