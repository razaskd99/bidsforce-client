"use server"

// Add new Tenant record in db
export const createTenantAction = async (apiBackendURL, accessToken, tenantData) => {  

    const apiUrl = `${apiBackendURL}admin/control-panel/tenants/`;
  
    const headers = new Headers({
      cache: 'no-store',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });  

    const now = new Date();
    const formattedTimestamp = now.toISOString();  
  
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "tenant_name": tenantData.tenant_name,
        "tenant_title": tenantData.tenant_title,
        "tenant_logo": tenantData.tenant_logo,
        "tenant_description": tenantData.tenant_description,
        "contact_person": tenantData.contact_person,
        "contact_email": tenantData.contact_email,
        "contact_phone": tenantData.contact_phone,
        "contact_address": tenantData.contact_address,
        "subscription_start_date": tenantData.subscription_start_date,
        "subscription_end_date": tenantData.subscription_end_date,
        "subscription_type": tenantData.subscription_type,
        "created_on": "2024-01-21",
        "created_at": formattedTimestamp,
        "updated_at": formattedTimestamp,
        "location_country": tenantData.location_country,
        "location_state": tenantData.location_state,
        "location_zip": tenantData.location_zip,
        "domain_url": tenantData.domain_url,
        "private_key": "string",
        "public_key": "string",
        "email_verified": tenantData.tenant_is_active === "Active" ? true : false,
        "tenant_status": "string",
        "tenant_is_active": tenantData.tenant_is_active === "Active" ? true : false
      })
    };
  
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          tenantData: [],
          error: response.statusText || 'Tenant creation failed',
        };
      }
  
      const result = await response.json();
  
      return {
        statusCode: 200,
        tenantData: result,
      };
  
    } catch (error) {
      return {
        statusCode: "400",
        tenantData: [],
        error: error.message || 'Tenant creation failed',
      };
    }
   
};


// get all Tenant records from db
export const getAllTenantRecordsAction = async (apiBackendURL, accessToken) => {
  
  try {
    const url = `${apiBackendURL}admin/control-panel/tenants/`;
    
    const response = await fetch(url, {
      cache: 'no-store',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        tenantData: [],
        error: response.statusText || 'Request failed for Tenant',
      };
    }

    const result = await response.json();
    
    return {
      statusCode: 200,
      tenantData: result,
    };

  } catch (error) {    
    return {
      statusCode: "400",
      tenantData: [],
      error: error.message || 'Request failed for Tenant',
    };
  }
};


// delelte a Tenant records from db
export const deleteTenantRecordAction = async (apiBackendURL, accessToken, tenant_id) => {
  
  try {
    const url = `${apiBackendURL}admin/control-panel/tenants/${tenant_id}`;
    console.log(url)
    const response = await fetch(url, {
      cache: 'no-store',
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      redirect: 'follow',
    });
    
    if (!response.ok) {
      return {
        statusCode: "400",
        tenantData: [],
        error: response.statusText || 'Request failed for Tenant',
      };
    }

    const result = await response.json();
    
    return {
      statusCode: 200,
      tenantData: result,
    };

  } catch (error) {    
    return {
      statusCode: "400",
      tenantData: [],
      error: error.message || 'Request failed for Tenant',
    };
  }
};



// update a Tenant record in db
export const updateTenantRecordAction = async (apiBackendURL, accessToken, tenantData) => {
  
  try {
    const url = `${apiBackendURL}admin/control-panel/tenants/${tenantData.tenant_id}`;
    const headers = new Headers({
      cache: 'no-store',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }); 

    const response = await fetch(url, {
      cache: 'no-store',
      method: 'PUT',
      headers:headers,
      body: JSON.stringify(tenantData)
    });
    
    if (!response.ok) {
      return {
        statusCode: "400",
        tenantData: [],
        error: response.statusText || 'Request failed for Tenant',
      };
    }

    const result = await response.json();
    
    return {
      statusCode: 200,
      tenantData: result,
    };

  } catch (error) {    
    return {
      statusCode: "400",
      tenantData: [],
      error: error.message || 'Request failed for Tenant',
    };
  }
};
