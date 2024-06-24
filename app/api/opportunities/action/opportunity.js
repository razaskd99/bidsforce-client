"use server"

import { getApiPrereqVars } from "../../util/action/apiCallPrereq";


// create
export const createOpportunityAction = async (formData) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}opportunity/Opportunity/`;

  const now = new Date();
  const formattedTimestamp = now.toISOString();
  const formatedDate = now.toISOString().split("T")[0];

  //const expected_award_date = new Date(formData.expected_award_date).toISOString().split("T")[0];
  // const expected_rfx_date = new Date(formData.expected_rfx_date).toISOString().split("T")[0];
  // const close_date = new Date(formData.close_datae).toISOString().split("T")[0];

  const headers = new Headers({
    cache: "no-store",
    Accept: "application/json",
    Authorization: `Bearer ${tokens}`,
    "Content-Type": "application/json",
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      "tenant_id":tenantID,
      "account_id": 0,
      "opp_number": formData.opp_number,
      "opp_title": formData.opp_title,
      "customer_id": formData.customer_id,
      "enduser_id": formData.enduser_id,
      "enduser_project": formData.enduser_project,
      "opp_value": formData.opp_value,
      "opp_currency": formData.opp_currency,
      "opp_sale_stage": formData.opp_sale_stage,
      "opp_pursuit_progress": formData.opp_pursuit_progress,
      "opp_business_line": formData.opp_business_line,
      "opp_comm_sales_budget": formData.opp_comm_sales_budget,
      "opp_industry": formData.opp_industry,
      "opp_owner_id": formData.opp_owner_id,
      "region": formData.region,
      "bidding_unit": formData.bidding_unit,
      "project_type": formData.project_type,
      "opp_type": formData.opp_type,
      "description": formData.description ? formData.description : '',
      "status": formData.status ? formData.status : '',
      "expected_award_date": formData.expected_award_date ? formData.expected_award_date : formatedDate,
      "expected_rfx_date": formData.expected_rfx_date ? formData.expected_rfx_date : formatedDate,
      "close_date": formData.close_date ? formData.close_date : formatedDate,
      "updated_at": formattedTimestamp,
      "created_at": formattedTimestamp,
      "data": ""
    }),
  };
  
  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Request Failed for Opportunity",
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
      error: error.message || "Request failed for Opportunity",
    };
  }
};


// update
export const updateOpportunityAction = async (formData, opportunity_id) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    const apiUrl = `${apiBackendURL}opportunity/Opportunity/id/${opportunity_id}`;
  
    const now = new Date();
    const formattedTimestamp = now.toISOString();
    const formatedDate = now.toISOString().split("T")[0];

    //const expected_award_date = new Date(formData.expected_award_date).toISOString().split("T")[0];
    //const expected_rfx_date = new Date(formData.expected_rfx_date).toISOString().split("T")[0];

    const headers = new Headers({
      cache: "no-store",
      Accept: "application/json",
      Authorization: `Bearer ${tokens}`,
      "Content-Type": "application/json",
    });
  
    const requestOptions = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        "tenant_id":tenantID,
        "account_id": 0,
        "opp_number": formData.opp_number,
        "opp_title": formData.opp_title,
        "customer_id": formData.customer_id,
        "enduser_id": formData.enduser_id,
        "enduser_project": formData.enduser_project,
        "opp_value": formData.opp_value,
        "opp_currency": formData.opp_currency,
        "opp_sale_stage": formData.opp_sale_stage,
        "opp_pursuit_progress": formData.opp_pursuit_progress,
        "opp_business_line": formData.opp_business_line,
        "opp_comm_sales_budget": formData.opp_comm_sales_budget,
        "opp_industry": formData.opp_industry,
        "opp_owner_id": formData.opp_owner_id,
        "region": formData.region,
        "bidding_unit": formData.bidding_unit,
        "project_type": formData.project_type,
        "opp_type": formData.opp_type,
        "description": formData.description ? formData.description : '',
        "status": formData.status ? formData.status : '',
        "expected_award_date": formData.expected_award_date ? formData.expected_award_date : formatedDate,
        "expected_rfx_date": formData.expected_rfx_date ? formData.expected_rfx_date : formatedDate,
        "close_date": formData.close_date ? formData.close_date : formatedDate,
        "updated_at": formattedTimestamp,
        "created_at": formattedTimestamp,
        "data": ""
      }),
    };

  
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || "Request Failed for Opportunity",
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
        error: error.message || "Request failed for Opportunity",
      };
    }
  };
  

  
export const getMaxOpportunityByID = async () => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const url = `${apiBackendURL}opportunity/opportunity/max_id`;

    try{
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
          error: response.statusText || "Request failed for Opportunity",
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
        error: error.message || "Request failed for Opportunity",
      }
    };
};



export const getAllOppotunitiesRecords = async (searchTermValue, offset, limit) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();

  try {
    const url = `${apiBackendURL}opportunity/Opportunity/tenant/${tenantID}?searchTerm=${searchTermValue}&offset=${offset}&limit=${limit}`;
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
        error: response.statusText || "Request failed for Opportunity",
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
      error: error.message || "Request failed for Opportunity",
    };
  }
};


export const getOpportunityByID = async (id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
      const url = `${apiBackendURL}opportunity/Opportunity/id/${id}`;


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
          error: response.statusText || "Request failed for Opportunity",
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
        error: error.message || "Request failed for Opportunity",
      };
    }
  };


// delete opportunity from db
export const deleteOpportunityRecordByIdAction = async (opportunity_id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    let  apiUrl = `${apiBackendURL}opportunity/Opportunity/id/${opportunity_id}`;
    
    const response = await fetch(apiUrl, {
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
        error: response.statusText || "Request failed for Opportunity",
      };
    }
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Opportunity",
    };
  }
};

export const getOpportunityByOppNumber = async (oppNum) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
      const url = `${apiBackendURL}opportunity/Opportunity/tenant/${tenantID}/opp-number/${oppNum}`;


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
          error: response.statusText || "Request failed for Opportunity",
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
        error: error.message || "Request failed for Opportunity",
      };
    }
  };