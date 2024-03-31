"use server"
// get all Contacts records from db
export const getAllContactRecordsAction = async (
    apiBackendURL,
    tokens,
    tenantID
  ) => {
    try {
      const url = `${apiBackendURL}primary_contacts/primary_contacts/tenant/${tenantID}`;
    
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
          error: response.statusText || "Request failed for Company",
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
        error: error.message || "Request failed for Company",
      };
    }
  };
  