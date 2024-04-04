"use server"

import { getApiPrereqVars } from "../../util/action/apiCallPrereq";

export const updateOpportunityAction = async (formData, opp_id) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    const apiUrl = `${apiBackendURL}opportunity/Opportunity/id/${opp_id}`;
  
    const now = new Date();
    const formattedTimestamp = now.toISOString();
    const formatedDate = now.toISOString().split("T")[0];

    const expected_award_date = new Date(formData.expected_award_date).toISOString().split("T")[0];
    const expected_rfx_date = new Date(formData.expected_rfx_date).toISOString().split("T")[0];

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
        "company_id": formData.company_id,
        "customer_id": formData.customer_id,
        "title": formData.title,
        "type": formData.type,
        "probability": "",
        "total_value": parseInt(formData.total_value),
        "crm_id": parseInt(formData.crm_id),
        "customer_name": formData.customer_name,
        "end_user_name": formData.end_user_name,
        "region": formData.region,
        "industry_code": formData.industry_code,
        "business_unit": formData.business_unit,
        "project_type": formData.project_type,
        "delivery_duration": "",
        "stage": formData.stage,
        "status": formData.status,
        "expected_award_date": expected_award_date,
        "expected_rfx_date": expected_rfx_date,
        "close_date": formatedDate,
        "competition": "",
        "gross_profit_percent": 0,
        "gross_profit_value": 0,
        "description": formData.description,
        "last_updated_at": formattedTimestamp,
        "forcasted": formData.forecasted,
        "end_user_project": formData.end_user_project,
        "opportunity_currency": formData.opportunity_currency,
        "sales_persuit_progress": formData.sales_persuit_progress,
        "opportunity_owner": formData.opportunity_owner,
        "bidding_unit": formData.bidding_unit 
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
  