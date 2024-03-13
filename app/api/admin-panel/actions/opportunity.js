"use server";

import getConfig from "next/config";
import { getToken } from "../../util/script";

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


// Add new Opportunity record in db
export const createOpportunityAction = async (formData) => {
  const apiUrl = `${apiBackendURL}opportunity/Opportunity/`;

  // get token
  let res = await getToken(apiBackendURL, username, password)
  let tokens = res?.tokenData?.access_token

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
      tenant_id: tenantID,
      company_id: parseInt(formData.company_id),
      customer_id: parseInt(formData.customer_id),
      title: formData.title,
      type: formData.type,
      probability: formData.probability,
      total_value: formData.total_value,
      crm_id: parseInt(formData.crm_id) ?? 0,
      customer_name: formData.customer_name,
      end_user_name: formData.end_user_name,
      region: formData.region,
      industry_code: formData.industry_code,
      business_unit: formData.business_unit,
      project_type: formData.project_type,
      delivery_duration: formData.delivery_duration,
      stage: formData.stage,
      status: formData.status,
      expected_award_date: formData.expected_award_date,
      expected_rfx_date: formData.expected_rfx_date,
      close_date: formData.close_date,
      competition: formData.competition,
      gross_profit_percent: parseFloat(formData.gross_profit_percent) ?? 0,
      gross_profit_value: parseFloat(formData.gross_profit_value) ?? 0,
      description: formData.description,
      last_updated_at: formattedTimestamp,
      forcasted: formData.forcasted,
    }),
  };
  console.log(formData.customer_name);
  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Opportunity creation failed",
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
      error: error.message || "Opportunity creation failed",
    };
  }
};

// Update Opportunity record in db
export const updateOpportunityRecordAction = async (
  formData,
  opportunity_id
) => {
  const apiUrl = `${apiBackendURL}opportunity/Opportunity/${tenantID}/id/${opportunity_id}`;
  
  // get token
  let res = await getToken(apiBackendURL, username, password)
  let tokens = res?.tokenData?.access_token

  const headers = new Headers({
    cache: "no-store",
    Accept: "application/json",
    Authorization: `Bearer ${tokens}`,
    "Content-Type": "application/json",
  });
  console.log(formData);
  const now = new Date();
  const formattedTimestamp = now.toISOString();
  const formatedDate = now.toISOString().split("T")[0];

  const requestOptions = {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      tenant_id: tenantID,
      company_id: parseInt(formData.company_id),
      customer_id: parseInt(formData.customer_id),
      title: formData.title,
      type: formData.type,
      probability: formData.probability,
      total_value: formData.total_value,
      crm_id: parseInt(formData.crm_id) ?? 0,
      customer_name: formData.customer_name,
      end_user_name: formData.end_user_name,
      region: formData.region,
      industry_code: formData.industry_code,
      business_unit: formData.business_unit,
      project_type: formData.project_type,
      delivery_duration: formData.delivery_duration,
      stage: formData.stage,
      status: formData.status,
      expected_award_date: formData.expected_award_date,
      expected_rfx_date: formData.expected_rfx_date,
      close_date: formData.close_date,
      competition: formData.competition,
      gross_profit_percent: parseFloat(formData.gross_profit_percent) ?? 0,
      gross_profit_value: parseFloat(formData.gross_profit_value) ?? 0,
      description: formData.description,
      last_updated_at: formattedTimestamp,
      forcasted: formData.forcasted,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Opportunity update failed",
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
      error: error.message || "Opportunity updation failed",
    };
  }
};

// delete a Opportunity record from db
export const deleteOpportunityRecordAction = async (opportunity_id) => {
  try {
    const url = `${apiBackendURL}opportunity/Opportunity/id/${opportunity_id}`;

    // get token
    let res = await getToken(apiBackendURL, username, password)
    let tokens = res?.tokenData?.access_token

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

// delete all Opportunity record from db
export const deleteAllOpportunityRecordAction = async (opportunity_id) => {
  try {
    const url = `${apiBackendURL}opportunity/Opportunity/id/${opportunity_id}`;

    // get token
    let res = await getToken(apiBackendURL, username, password)
    let tokens = res?.tokenData?.access_token

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

// get all Opportunity records from db
export const getAllOpportunityRecordsAction = async () => {
  try {
    const url = `${apiBackendURL}opportunity/Opportunity/${tenantID}`;

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
