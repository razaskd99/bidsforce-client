'use server'

import getConfig from 'next/config'
import { getToken } from '../../util/script';

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


// Add new User record in db
export const createUserAction = async (apiBackendURL, accessToken, formData) => {  
    const apiUrl = `${apiBackendURL}auth/signup`;

    // get token
    let res = await getToken(apiBackendURL, username, password)
    let tokens = res?.tokenData?.access_token
 
    const headers = new Headers({
      cache: 'no-store',
      'Accept': 'application/json',
      'Authorization': `Bearer ${tokens}`,
      'Content-Type': 'application/json'
    });  
    
    const now = new Date();
    const formattedTimestamp = now.toISOString()
    const formatedDate = now.toISOString().split('T')[0]
    
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "tenant_id": formData.team_id,
        "team_id": formData.team_id,
        "designation_id": formData.designation_id,
        "company_id": formData.company_id,
        "user_name": formData.user_name,
        "email": formData.email,
        "password": formData.password,
        "first_name": formData.first_name,
        "middle_name": "",
        "last_name": formData.last_name,
        "user_role": "",
        "role_level": "",
        "registration_date": formatedDate,
        "last_login_at": formatedDate,
        "created_at": formattedTimestamp,
        "updated_at": formattedTimestamp,
        "active": formData.tenant_is_active === "Active" ? true : false,
        "verified": formData.tenant_is_active === "Active" ? true : false,
        "password_salt": "",
        "user_profile_photo": ""
      })
    };
  
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'User creation failed',
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
        error: error.message || 'User creation failed',
      };
    }
   
};


// Update User record in db
export const updateUserRecordAction = async (apiBackendURL, accessToken, formData, user_id) => {  
    const apiUrl = `${apiBackendURL}auth/auth/users/id/${user_id}`;

    // get token
    let res = await getToken(apiBackendURL, username, password)
    let tokens = res?.tokenData?.access_token
 
    const headers = new Headers({
      cache: 'no-store',
      'Accept': 'application/json',
      'Authorization': `Bearer ${tokens}`,
      'Content-Type': 'application/json'
    });  
    
    const now = new Date();
    const formattedTimestamp = now.toISOString()
    const formatedDate = now.toISOString().split('T')[0]
  
    const requestOptions = {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        "tenant_id": 1,
        "team_id": formData.team_id,
        "designation_id": formData.designation_id,
        "company_id": formData.company_id,
        "user_name": "UNAME",
        "email": "user@example.com",
        "password": formData.password,
        "first_name": formData.first_name,
        "middle_name": "",
        "last_name": formData.last_name,
        "user_role": "",
        "role_level": "",
        "registration_date": formatedDate,
        "last_login_at": formattedTimestamp,
        "created_at": formattedTimestamp,
        "updated_at": formattedTimestamp,
        "active": false,
        "verified": false,
        "password_salt": "",
        "user_profile_photo": ""
      })
    };
  
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'User update failed',
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
        error: error.message || 'User updation failed',
      };
    }
   
};


// delete a User record from db
export const deleteUserRecordAction = async (apiBackendURL, accessToken, user_id) => {
  
    try {
        const url = `${apiBackendURL}auth/auth/users/id/${user_id}`;

        // get token
        let res = await getToken(apiBackendURL, username, password)
        let tokens = res?.tokenData?.access_token

        const response = await fetch(url, {
        cache: 'no-store',
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokens}`,
        },
        redirect: 'follow',
        });
        
        if (!response.ok) {
            return {
                statusCode: "400",
                returnData: [],
                error: response.statusText || 'Request failed for User',
            };
        }
    } catch (error) {    
        return {
          statusCode: "400",
          returnData: [],
          error: error.message || 'Request failed for User',
        };
    };
}


// get all Users records from db
export const getAllUserRecordsAction = async (apiBackendURL, accessToken, tenant_id) => {
  
    try {
      const url = `${apiBackendURL}auth/auth/users/tenant/${tenant_id}`;

      // get token
      let res = await getToken(apiBackendURL, username, password)
      let tokens = res?.tokenData?.access_token
     
      const response = await fetch(url, {
        cache: 'no-store',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${tokens}`,
        },
        redirect: 'follow',
      });
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request failed for Company',
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
        error: error.message || 'Request failed for Company',
      };
    }
  };


 // get all Company records from db
export const getAllCompanyRecordsAction = async (apiBackendURL, accessToken, tenant_id) => {

    try {
        const url = `${apiBackendURL}company/companies/tenant/${tenant_id}`;

        // get token
        let res = await getToken(apiBackendURL, username, password)
        let tokens = res?.tokenData?.access_token
      
        const response = await fetch(url, {
        cache: 'no-store',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokens}`,
        },
        redirect: 'follow',
        });

        if (!response.ok) {
        return {
            statusCode: "400",
            returnData: [],
            error: response.statusText || 'Request failed for Designation',
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
        error: error.message || 'Request failed for Designation',
        };
    }
};


// get all Designation records from db
export const getAllDesignationRecordsAction = async (apiBackendURL, accessToken, tenant_id) => {
  
    try {
      const url = `${apiBackendURL}designation/designations/tenant/${tenant_id}`;

      // get token
      let res = await getToken(apiBackendURL, username, password)
      let tokens = res?.tokenData?.access_token
      
      const response = await fetch(url, {
        cache: 'no-store',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${tokens}`,
        },
        redirect: 'follow',
      });
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request failed for Designation',
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
        error: error.message || 'Request failed for Designation',
      };
    }
  };


// get all Designation records from db
export const getAllTeamRecordsAction = async (apiBackendURL, accessToken, tenant_id) => {
  
    try {
      const url = `${apiBackendURL}team/teams/tenant/${tenant_id}`;

      // get token
      let res = await getToken(apiBackendURL, username, password)
      let tokens = res?.tokenData?.access_token
      
      const response = await fetch(url, {
        cache: 'no-store',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${tokens}`,
        },
        redirect: 'follow',
      });
  
      if (!response.ok) {
        return {
          statusCode: "400",
          returnData: [],
          error: response.statusText || 'Request failed for Team',
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
        error: error.message || 'Request failed for Team',
      };
    }
  };
  
  


///////////////////////// Company methods




// Add new company record in db
export const createCompanyAction = async (formData) => {  
  const apiUrl = `${apiBackendURL}company/companies`;

  // get token
  let res = await getToken(apiBackendURL, username, password)
  let tokens = res?.tokenData?.access_token

  const headers = new Headers({
    cache: 'no-store',
    'Accept': 'application/json',
    'Authorization': `Bearer ${tokens}`,
    'Content-Type': 'application/json'
  });  
  
  const now = new Date();
  const formattedTimestamp = now.toISOString()
  const formatedDate = now.toISOString().split('T')[0]
  
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      "tenant_id": tenantID,
      "company_name": formData.company_name,
      "phone": formData.phone,
      "email": formData.email,
      "address": "",
      "industry": formData.industry,
      "website": formData.website,
      "company_logo": formData.company_logo,
      "created_date": formattedTimestamp,
      "updated_date": formattedTimestamp
    })
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || 'Company creation failed',
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
      error: error.message || 'Company creation failed',
    };
  } 
};





///////////////////////// Designation methods




// Add new company record in db
export const createDesignationAction = async (formData) => {  
  const apiUrl = `${apiBackendURL}designation/designations`;

  // get token
  let res = await getToken(apiBackendURL, username, password)
  let tokens = res?.tokenData?.access_token

  const headers = new Headers({
    cache: 'no-store',
    'Accept': 'application/json',
    'Authorization': `Bearer ${tokens}`,
    'Content-Type': 'application/json'
  });  
  
  const now = new Date();
  const formattedTimestamp = now.toISOString()
  const formatedDate = now.toISOString().split('T')[0]
  
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      "tenant_id": tenantID,
      "title": formData.title,
      "type": formData.type,
      "description": formData.description
    })
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || 'Designation creation failed',
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
      error: error.message || 'Designation creation failed',
    };
  }
 
};




///////////////////////// Team methods




// Add new company record in db
export const createTeamAction = async (formData) => {  
  const apiUrl = `${apiBackendURL}team/teams`;

  // get token
  let res = await getToken(apiBackendURL, username, password)
  let tokens = res?.tokenData?.access_token

  const headers = new Headers({
    cache: 'no-store',
    'Accept': 'application/json',
    'Authorization': `Bearer ${tokens}`,
    'Content-Type': 'application/json'
  });  
  
  const now = new Date();
  const formattedTimestamp = now.toISOString()
  const formatedDate = now.toISOString().split('T')[0]
  
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      "tenant_id": tenantID,
      "team_title": formData.team_title,
      "team_role": formData.team_role,
      "role_level": formData.role_level
    })
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || 'Team creation failed',
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
      error: error.message || 'Team creation failed',
    };
  } 
};
