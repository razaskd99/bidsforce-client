"use server";


// Add new Persona record in db
export const createPersonaAction = async (  
  formData,
  apiBackendURL, 
  tokens, 
  tenantID
) => {
  const apiUrl = `${apiBackendURL}persona/persona/`;

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
        "persona_role": formData.persona_role,
        "description": formData.description,
        "is_active": formData.is_active,
        "created_on": formattedTimestamp
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Persona creation failed",
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
      error: error.message || "Persona creation failed",
    };
  }
};

// Update Persona record in db
export const updatePersonaRecordAction = async (formData, id, apiBackendURL, tokens, tenantID) => {
  const apiUrl = `${apiBackendURL}persona/persona/id/${id}`;
  
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
        "persona_role": formData.persona_role,
        "description": formData.description,
        "is_active": formData.is_active,
        "created_on": formattedTimestamp
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "Persona update failed",
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
      error: error.message || "Persona updation failed",
    };
  }
};

// delete a Persona record from db
export const deletePersonaRecordAction = async (id, apiBackendURL, tokens, tenantID) => {
  try {
    const url = `${apiBackendURL}persona/persona/id/${id}`;
   
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
        error: response.statusText || "Request failed for Persona",
      };
    }
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for Persona",
    };
  }
};

// get all Persona records from db
export const getAllPersonaRecordsAction = async (apiBackendURL, tokens, tenantID) => {
  try {
    const url = `${apiBackendURL}persona/persona/tenant/${tenantID}`;
    
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
        error: response.statusText || "Request failed for Persona",
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
      error: error.message || "Request failed for Persona",
    };
  }
};

// get all Persona record by ID
export const getPersonaRecordByIDAction = async (id, apiBackendURL, tokens, tenantID) => {
  try {
    const url = `${apiBackendURL}persona/persona/id/${id}`;
    
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
        error: response.statusText || "Request failed for Persona",
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
      error: error.message || "Request failed for Persona",
    };
  }
};




