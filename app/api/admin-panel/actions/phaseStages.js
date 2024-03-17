"use server";


// Add new Phase Stage record in db
export const createPhaseStageAction = async (  
  formData,
  apiBackendURL, 
  tokens, 
  tenantID
) => {
  const apiUrl = `${apiBackendURL}phase_stage/phase_stages`;

  // get token
  //let res = await getToken(apiBackendURL, username, password)
  //let tokens = res?.tokenData?.access_token

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
        "default_name": formData.default_name,
        "new_name": formData.new_name,
        "type": formData.type,
        "display_order": formData.display_order,
        "score": formData.score,
        "status": formData.status,
        "required": formData.required
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Phase Stage creation failed",
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
      error: error.message || "Phase Stage creation failed",
    };
  }
};

// Update Phase Stage record in db
export const updatePhaseStageRecordAction = async (formData, id, apiBackendURL, tokens, tenantID) => {
  const apiUrl = `${apiBackendURL}phase_stage/phase_stages/id/${id}`;
  
  // get token
  //let res = await getToken(apiBackendURL, username, password)
  //let tokens = res?.tokenData?.access_token

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
        "tenant_id": tenantID,
        "default_name": formData.default_name,
        "new_name": formData.new_name,
        "type": formData.type,
        "display_order": formData.display_order,
        "score": formData.score,
        "status": formData.status,
        "required": formData.required
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Phase Stage update failed",
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
      error: error.message || "Phase Stage updation failed",
    };
  }
};

// delete a Phase Stage record from db
export const deletePhaseStageRecordAction = async (id, apiBackendURL, tokens, tenantID) => {
  try {
    const url = `${apiBackendURL}phase_stage/phase_stages/id/${id}`;

    // get token
    //let res = await getToken(apiBackendURL, username, password)
    //let tokens = res?.tokenData?.access_token

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
        error: response.statusText || "Request failed for Phase Stage",
      };
    }
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Phase Stage",
    };
  }
};

// get all Phase Stage records from db
export const getAllPhaseStageRecordsAction = async () => {
  try {
    const url = `${apiBackendURL}phase_stage/phase_stages/tenant/${tenantID}`;
    
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
        error: response.statusText || "Request failed for Phase Stage",
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
      error: error.message || "Request failed for Phase Stage",
    };
  }
};



// get all Phase Stage records by type from db
export const getAllPhaseStageRecordsByTypeAction = async (typeName , apiBackendURL, tokens, tenantID) => {
    try {
      const typeNameEncoded = encodeURIComponent(typeName);
      const url = `${apiBackendURL}phase_stage/phase_stages/tenant/${tenantID}/type/${typeNameEncoded}`;
      
      // get token
      //let res = await getToken(apiBackendURL, username, password)
      //let tokens = res?.tokenData?.access_token

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
          error: response.statusText || "Request failed for Phase Stage",
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
        error: error.message || "Request failed for Phase Stage",
      };
    }
  };
  