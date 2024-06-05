"use server";

import getConfig from "next/config";
import { getApiPrereqVars } from "../../util/action/apiCallPrereq";


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


// get all Opp Prerequisite records from db
export const getAllOppPrereqRecordsAction = async (table_name, searchTermValue, offset, limit) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    let url = "";
    if (table_name === "opportunity_currency") {
      url = `${apiBackendURL}opportunity_currency/opportunity_currency/tenant/${tenantID}?searchTerm=${searchTermValue}&offset=${offset}&limit=${limit}`;
    } else if (table_name === "opportunity_sales_stages") {
      url = `${apiBackendURL}opportunity_sales_stages/opportunity_sales_stages/tenant/${tenantID}?searchTerm=${searchTermValue}&offset=${offset}&limit=${limit}`;
    } else if (table_name === "sales_pursuit_progress") {
      url = `${apiBackendURL}sales_pursuit_progress/sales_pursuit_progress/tenant/${tenantID}?searchTerm=${searchTermValue}&offset=${offset}&limit=${limit}`;
    } else if (table_name === "business_line") {
      url = `${apiBackendURL}business_line/business_line/tenant/${tenantID}?searchTerm=${searchTermValue}&offset=${offset}&limit=${limit}`;
    } else if (table_name === "opp_committed_for_sales_budget") {
      url = `${apiBackendURL}opp_committed_for_sales_budget/opp_committed_for_sales_budget/tenant/${tenantID}?searchTerm=${searchTermValue}&offset=${offset}&limit=${limit}`;
    } else if (table_name === "bidding_unit") {
        url = `${apiBackendURL}bidding_unit/bidding_unit/tenant/${tenantID}?searchTerm=${searchTermValue}&offset=${offset}&limit=${limit}`;
    } else if (table_name === "project_type") {
        url = `${apiBackendURL}project_type/project_type/tenant/${tenantID}?searchTerm=${searchTermValue}&offset=${offset}&limit=${limit}`;
    } else if (table_name === "opportunity_type") {
        url = `${apiBackendURL}opportunity_type/opportunity_type/tenant/${tenantID}?searchTerm=${searchTermValue}&offset=${offset}&limit=${limit}`;
    }

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
        error: response.statusText || "Request failed for Opportunity Prerequisite",
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
      error: error.message || "Request failed for Opportunity Prerequisite",
    };
  }
};

// Add new Opp Prerequisite record in db
export const createOppPrereqAction = async (formData, table_name) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  let apiUrl = "";
  if (table_name === "opportunity_currency") {
    apiUrl = `${apiBackendURL}opportunity_currency/opportunity_currency`;
  } else if (table_name === "opportunity_sales_stages") {
    apiUrl = `${apiBackendURL}opportunity_sales_stages/opportunity_sales_stages/`;
  } else if (table_name === "sales_pursuit_progress") {
    apiUrl = `${apiBackendURL}sales_pursuit_progress/sales_pursuit_progress/`;
  } else if (table_name === "business_line") {
    apiUrl = `${apiBackendURL}business_line/business_line/`;
  } else if (table_name === "opp_committed_for_sales_budget") {
    apiUrl = `${apiBackendURL}opp_committed_for_sales_budget/opp_committed_for_sales_budget/`;
  } else if (table_name === "bidding_unit") {
    apiUrl = `${apiBackendURL}bidding_unit/bidding_unit/`;
  } else if (table_name === "project_type") {
    apiUrl = `${apiBackendURL}project_type/project_type/`;
  } else if (table_name === "opportunity_type") {
    apiUrl = `${apiBackendURL}opportunity_type/opportunity_type/`;
  }

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
      title: formData.title,
      active: formData.active,
      created_at: formattedTimestamp,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Opportunity Prerequisite creation failed",
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
      error: error.message || "Opportunity Prerequisite creation failed",
    };
  }
};

// Update Opp Prerequisite record in db
export const updateOppPrereqAction = async (formData, table_name, id) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  let apiUrl = "";
  if (table_name === "opportunity_currency") {
    apiUrl = `${apiBackendURL}opportunity_currency/opportunity_currency/id/${id}`;
  } else if (table_name === "opportunity_sales_stages") {
    apiUrl = `${apiBackendURL}opportunity_sales_stages/opportunity_sales_stages/id/${id}`;
  } else if (table_name === "sales_pursuit_progress") {
    apiUrl = `${apiBackendURL}sales_pursuit_progress/sales_pursuit_progress/id/${id}`;
  } else if (table_name === "business_line") {
    apiUrl = `${apiBackendURL}business_line/business_line/id/${id}`;
  } else if (table_name === "opp_committed_for_sales_budget") {
    apiUrl = `${apiBackendURL}opp_committed_for_sales_budget/opp_committed_for_sales_budget/id/${id}`;
  } else if (table_name === "bidding_unit") {
    apiUrl = `${apiBackendURL}bidding_unit/bidding_unit/id/${id}`;
  } else if (table_name === "project_type") {
    apiUrl = `${apiBackendURL}project_type/project_type/id/${id}`;
  } else if (table_name === "opportunity_type") {
    apiUrl = `${apiBackendURL}opportunity_type/opportunity_type/id/${id}`;
  }

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
      tenant_id: tenantID,
      title: formData.title,
      active: formData.active,
      created_at: formattedTimestamp
      
    }),
  };
  

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Opportunity Prerequisite creation failed",
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
      error: error.message || "Opportunity Prerequisite creation failed",
    };
  }
};

// delete a Opp Prerequisite record from db
export const deleteOppPrereqRecordAction = async (table_name, id) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    let apiUrl = "";
    if (table_name === "opportunity_currency") {
        apiUrl = `${apiBackendURL}opportunity_currency/opportunity_currency/id/${id}`;
      } else if (table_name === "opportunity_sales_stages") {
        apiUrl = `${apiBackendURL}opportunity_sales_stages/opportunity_sales_stages/id/${id}`;
      } else if (table_name === "sales_pursuit_progress") {
        apiUrl = `${apiBackendURL}sales_pursuit_progress/sales_pursuit_progress/id/${id}`;
      } else if (table_name === "business_line") {
        apiUrl = `${apiBackendURL}business_line/business_line/id/${id}`;
      } else if (table_name === "opp_committed_for_sales_budget") {
        apiUrl = `${apiBackendURL}opp_committed_for_sales_budget/opp_committed_for_sales_budget/id/${id}`;
      } else if (table_name === "bidding_unit") {
        apiUrl = `${apiBackendURL}bidding_unit/bidding_unit/id/${id}`;
      } else if (table_name === "project_type") {
        apiUrl = `${apiBackendURL}project_type/project_type/id/${id}`;
      } else if (table_name === "opportunity_type") {
        apiUrl = `${apiBackendURL}opportunity_type/opportunity_type/id/${id}`;
      }

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
        error: response.statusText || "Request failed for Opportunity Prerequisite",
      };
    }
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Opportunity Prerequisite",
    };
  }
};

// delete all Opp Prerequisite record from db
export const deleteAllOppPrereqRecordAction = async (table_name) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    let apiUrl = "";
    if (table_name === "opportunity_currency") {
        url = `${apiBackendURL}opportunity_currency/opportunity_currency/all/tenant_id/${tenantID}`;
      } else if (table_name === "opportunity_sales_stages") {
        url = `${apiBackendURL}opportunity_sales_stages/opportunity_sales_stages/all/tenant_id/${tenantID}`;
      } else if (table_name === "sales_pursuit_progress") {
        url = `${apiBackendURL}sales_pursuit_progress/sales_pursuit_progress/all/tenant_id/${tenantID}`;
      } else if (table_name === "business_line") {
        url = `${apiBackendURL}business_line/business_line/all/tenant_id/${tenantID}`;
      } else if (table_name === "opp_committed_for_sales_budget") {
        url = `${apiBackendURL}opp_committed_for_sales_budget/opp_committed_for_sales_budget/all/tenant_id/${tenantID}`;
      } else if (table_name === "bidding_unit") {
          url = `${apiBackendURL}bidding_unit/bidding_unit/all/tenant_id/${tenantID}`;
      } else if (table_name === "project_type") {
          url = `${apiBackendURL}project_type/project_type/all/tenant_id/${tenantID}`;
      } else if (table_name === "opportunity_type") {
          url = `${apiBackendURL}opportunity_type/opportunity_type/all/tenant_id/${tenantID}`;
      }

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
        error: response.statusText || "Request failed for Opportunity Prerequisite",
      };
    }
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Opportunity Prerequisite",
    };
  }
};



// Update Opp Prerequisite record iby ID
export const getOppPrereqByIDAction = async (table_name, id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  try {
    let apiUrl = "";
if (table_name === "opportunity_currency") {
  apiUrl = `${apiBackendURL}opportunity_currency/opportunity_currency/id/${id}`;
} else if (table_name === "opportunity_sales_stages") {
  apiUrl = `${apiBackendURL}opportunity_sales_stages/opportunity_sales_stages/id/${id}`;
} else if (table_name === "sales_pursuit_progress") {
  apiUrl = `${apiBackendURL}sales_pursuit_progress/sales_pursuit_progress/id/${id}`;
} else if (table_name === "business_line") {
  apiUrl = `${apiBackendURL}business_line/business_line/id/${id}`;
} else if (table_name === "opp_committed_for_sales_budget") {
  apiUrl = `${apiBackendURL}opp_committed_for_sales_budget/opp_committed_for_sales_budget/id/${id}`;
} else if (table_name === "bidding_unit") {
  apiUrl = `${apiBackendURL}bidding_unit/bidding_unit/id/${id}`;
} else if (table_name === "project_type") {
  apiUrl = `${apiBackendURL}project_type/project_type/id/${id}`;
} else if (table_name === "opportunity_type") {
  apiUrl = `${apiBackendURL}opportunity_type/opportunity_type/id/${id}`;
}


const response = await fetch(apiUrl, {
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
    error: response.statusText || "Request failed for Opportunity Prerequisite",
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
  error: error.message || "Request failed for Opportunity Prerequisite",
};
}
};
