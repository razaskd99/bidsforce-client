'use server'

import { revalidatePath } from "next/cache";
import { getApiPrereqVars } from "../../util/action/apiCallPrereq";



// Add new User record in db
export const createUserAction = async (formData) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}auth/signup`;

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
      "job_title": formData.job_title,
      "company_name": formData.company_name,
      "employee_number": formData.employee_number ? formData.employee_number : '',
      "user_name": formData.user_name,
      "email": formData.email,
      "password": formData.password ? formData.password : '',
      "password_salt": formData.password_salt ? formData.password_salt : '',
      "first_name": formData.first_name,
      "middle_name": '',
      "last_name": formData.last_name,
      "user_role": formData.user_role,
      "contact_number": formData.contact_number,
      "profile_image": formData.profile_image ? formData.profile_image : '',
      "manager": formData.manager ? formData.manager : '',
      "functional_group": formData.functional_group,
      "time_zone": formData.time_zone,
      "work_location": formData.work_location,
      "work_hours_start": formData.work_hours_start,
      "work_hours_end": formData.work_hours_end ? formData.work_hours_end : '',
      "active": formData.active ? formData.active : true,
      "verified": false,
      "registration_date": formatedDate,
      "last_login_at": formattedTimestamp,
      "updated_at": formatedDate,
      "created_at": formattedTimestamp,
      "city": formData.city ? formData.city : '',
      "state": formData.state ? formData.state : '',
      "currency_code": formData.currency_code ? formData.currency_code : '',
      "security_code": formData.security_code ? formData.security_code : '',
      "address": formData.address ? formData.address : ''
    }),
  };
  
  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "User creation failed",
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
      error: error.message || "User creation failed",
    };
  }
};


// Update User record in db
export const updateUserRecordAction = async (
  formData,
  user_id  
) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}auth/auth/users/id/${user_id}`;

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
      "job_title": formData.job_title,
      "company_name": formData.company_name,
      "employee_number": formData.employee_number ? formData.employee_number : '',
      "user_name": formData.user_name,
      "email": formData.email,
      "password": formData.password ? formData.password : '',
      "password_salt": formData.password_salt ? formData.password_salt : '',
      "first_name": formData.first_name,
      "middle_name": '',
      "last_name": formData.last_name,
      "user_role": formData.user_role,
      "contact_number": formData.contact_number,
      "profile_image": formData.profile_image ? formData.profile_image : '',
      "manager": formData.manager ? formData.manager : '',
      "functional_group": formData.functional_group,
      "time_zone": formData.time_zone,
      "work_location": formData.work_location,
      "work_hours_start": formData.work_hours_start,
      "work_hours_end": formData.work_hours_end ? formData.work_hours_end : '',
      "active": formData.active ? formData.active : true,
      "verified": false,
      "registration_date": formatedDate,
      "last_login_at": formattedTimestamp,
      "updated_at": formatedDate,
      "created_at": formattedTimestamp,
      "city": formData.city ? formData.city : '',
      "state": formData.state ? formData.state : '',
      "currency_code": formData.currency_code ? formData.currency_code : '',
      "security_code": formData.security_code ? formData.security_code : '',
      "address": formData.address ? formData.address : ''
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "User updation failed",
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
      error: error.message || "User updation failed",
    };
  }
};


// Update user limited record 
export const updateUserDetailLimitedAction = async (formData, user_id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}auth/auth/users/limited/id/${user_id}`;
  
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
      "password": formData.password ? formData.password : '',
      "contact_number": formData.contact_number,
      "profile_image": formData.profile_image,
      "time_zone": formData.time_zone,
      "work_location": formData.work_location,
      "work_hours_start": formData.work_hours_start,
      "work_hours_end": formData.work_hours_end ? formData.work_hours_end : '',
      "job_title": formData.job_title
    }),
  };
  

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "User updation failed",
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
      error: error.message || "User updation failed",
    };
  }
};


// delete a User record from db
export const deleteUserRecordAction = async (user_id) => {
  try {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    const url = `${apiBackendURL}auth/auth/users/id/${user_id}`;

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
        error: response.statusText || "Request failed for User",
      };
    }

    
  } catch (error) {
    return {
      statusCode: "400",
      returnData: [],
      error: error.message || "Request failed for User",
    };
  }
};


// Update user bio 
export const updateUserBioAction = async (bio, user_id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}auth/auth/users/bio/id/${user_id}`;
  
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
      "bio": bio      
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "User updation failed",
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
      error: error.message || "User updation failed",
    };
  }
};


// Update user tags 
export const updateUserTagsAction = async (tags, user_id) => {
  const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
  const apiUrl = `${apiBackendURL}auth/auth/users/tags/id/${user_id}`;
  
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
      "tags": tags      
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      return {
        statusCode: "400",
        returnData: [],
        error: response.statusText || "User updation failed",
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
      error: error.message || "User updation failed",
    };
  }
};


// get all users
export const getAllUsersAction = async (searchTermValue) => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    try {
        const url = `${apiBackendURL}auth/auth/users/tenant/${tenantID}?searchTerm=${searchTermValue}`;

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
            data: [],
            error: response.statusText || 'Request failed for Users',
          };
        }
    
        const result = await response.json({ revalidated: true });
     
        return {
          statusCode: 200,
          data: result,
        };
    
      } catch (error) {
  
        return {
          statusCode: "400",
          data: [],
          error: error.message || 'Request failed for Users',
        };
      }
  
  }

  
  // get user by ID
  export const getUserById = async (userID) => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    try {
        const url = `${apiBackendURL}auth/auth/users/id/${userID}`;
      
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
            data: {},
            error: response.statusText || 'Request failed for User',
          };
        }
    
        const result = await response.json();
    
        return {
          statusCode: 200,
          data: result,
        };
    
      } catch (error) {
  
        return {
          statusCode: "400",
          data: [],
          error: error.message || 'Request failed for User',
        };
      }
  
  }
   

  export const getUserRecordByIDAction = async (user_id) => {
    const { apiBackendURL, tokens, tenantID } = await getApiPrereqVars();
    try {
      const url = `${apiBackendURL}auth/auth/users/id/${user_id}`;
      
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
          error: response.statusText || "Request failed for User",
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
        error: error.message || "Request failed for User",
      };
    }
  };
  