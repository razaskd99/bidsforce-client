'use server'
import getConfig from 'next/config'
import { getToken } from '../../util/script';
const axios = require('axios');


// authenticate and get user and access token for future use
export async function loginAction(username, password, apiBackendURL, tenantID) {
  const { serverRuntimeConfig } = getConfig() || {};

  let access_token = ''
  let res = {}

  // get access token for use
  res = await getToken(apiBackendURL, username, password)
  if (res.statusCode == 200) {
    access_token = res.tokenData.access_token
  }
  else {
    access_token = 'Invalid access Token ' + res.error
  }


  if (serverRuntimeConfig) {
    serverRuntimeConfig.PRIVATE_ENCRIPTED_USER_DATA.user = username
    serverRuntimeConfig.PRIVATE_ENCRIPTED_USER_DATA.pass = password
  }


  let resp = {}
  let data = {}
  try {
    const loginUrl = `${apiBackendURL}auth/login`;
    const email = encodeURIComponent(username);
    const passwordEncoded = encodeURIComponent(password);
    // URL with parameters
    const urlWithParams = `${loginUrl}?tenant_id=${tenantID}&email=${email}&password=${passwordEncoded}`;

    // Make POST request with Axios
    const response = await axios.post(urlWithParams, null, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
      timeout: 0, // Timeout set to maximum seconds (adjust as needed)
    });

    if (response.status !== 200) {
      // If response status is not 200 (OK), handle error
      return {
        statusCode: 400,
        user: {},
        access_token: '',
      };
    }

    // Parse user record
    data = response.data;
  } catch (error) {
    // Handle network errors or Axios-specific errors
    return {
      statusCode: 400,
      user: {},
      access_token: '',
    };
  }

  // get user record
  let user = data !== null ? { ...data } : null;

  if (user !== null) {

      // get server stored data 
  if (serverRuntimeConfig) {
    serverRuntimeConfig.API_ACCESS_TOKEN_SERVER = access_token
    serverRuntimeConfig.IS_LOGIN = true
    serverRuntimeConfig.LOGIN_USER_DATA = { ...user }
  }

  } else {

    return {
      statusCode: 400,
      user: {},
      access_token: '',
    }
  }




  // prepare response on success
  resp = {
    statusCode: "200",
    user: { ...user }, // Create a copy of the 'user' object
    access_token: access_token, // Extract access_token
  };

  return resp;
}



export const getServerUserDetails = async () => {
  const { serverRuntimeConfig } = getConfig() || {};

  let userDetailRec = {}
  if (serverRuntimeConfig?.API_ACCESS_TOKEN_SERVER) {
    userDetailRec = serverRuntimeConfig.LOGIN_USER_DATA
  }
  return userDetailRec
};