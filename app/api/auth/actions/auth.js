'use server'
import getConfig from 'next/config'
import { getToken } from '../../util/script';


// authenticate and get user and access token for future use
export async function loginAction(username, password, apiBackendURL, tenantID) {
  const { serverRuntimeConfig } = getConfig() || {};

  let access_token = ''
  let res = {}
  if (serverRuntimeConfig) {
    serverRuntimeConfig.PRIVATE_ENCRIPTED_USER_DATA.user = username
    serverRuntimeConfig.PRIVATE_ENCRIPTED_USER_DATA.pass = password
  }

  try {
    const loginUrl = `${apiBackendURL}auth/login`;
    const email = encodeURIComponent(username);
    const passwordEncoded = encodeURIComponent(password);
    // url
    const urlWithParams = `${loginUrl}?tenant_id=${tenantID}&email=${email}&password=${passwordEncoded}`;

    // get access token for use
    res = await getToken(apiBackendURL, username, password)
    if (res.statusCode == 200) {
      access_token = res.tokenData.access_token
    }
    else {
      access_token = 'Invalid access Token ' + res.error
    }

    // get user record for authentication
    const response = await fetch(urlWithParams, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      res = {
        statusCode: "400",
        user: {}, // Create a copy of the 'user' object
        access_token: '', // Extract access_token
      };
    }
    // parse urser record 
    const data = await response.json();
    // get user record
    let { ...user } = data;
    // get server stored data 
    if (serverRuntimeConfig?.API_ACCESS_TOKEN_SERVER) {
      serverRuntimeConfig.API_ACCESS_TOKEN_SERVER = access_token
      serverRuntimeConfig.IS_LOGIN =true
      serverRuntimeConfig.LOGIN_USER_DATA = { ...user } 
    }
    
    // prepare response on success
    res = {
      statusCode: "200",
      user: { ...user }, // Create a copy of the 'user' object
      access_token: access_token, // Extract access_token
    };
  } catch (error) {

    if (serverRuntimeConfig) {
      serverRuntimeConfig.IS_LOGIN =false
      
    }
    // prepare response on failure
    res = {
      statusCode: "400",
      user: {}, // Create a copy of the 'user' object
      access_token: '', // Extract access_token
    };
  }

  return res;
}



export const getServerUserDetails = async () => {
  const { serverRuntimeConfig } = getConfig() || {};

  let userDetailRec = {}
  if (serverRuntimeConfig?.API_ACCESS_TOKEN_SERVER) {    
    userDetailRec = serverRuntimeConfig.LOGIN_USER_DATA 
  }
  return userDetailRec
};