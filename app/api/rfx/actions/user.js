'use server'

import { getToken } from '../../util/script';
import getConfig from 'next/config'


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


export const getAllUsers = async () => {
    try {
        const url = `${apiBackendURL}auth/auth/users/tenant/${tenantID}`;

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
            data: [],
            error: response.statusText || 'Request failed for Users',
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
          error: error.message || 'Request failed for Users',
        };
      }
  
  }

  
  export const getUserById = async (userID) => {
    try {
        const url = `${apiBackendURL}auth/auth/users/id/${userID}`;

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
   