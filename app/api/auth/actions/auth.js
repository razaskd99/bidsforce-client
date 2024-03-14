'use server';
import getConfig from 'next/config';
import axios from 'axios';
import { getToken } from '../../util/script';

// authenticate and get user and access token for future use
export async function loginAction(username, password, apiBackendURL, tenantID) {
  const { serverRuntimeConfig } = getConfig() || {};

  let access_token = '';
  let res = {};
  if (serverRuntimeConfig) {
    serverRuntimeConfig.PRIVATE_ENCRIPTED_USER_DATA.user = username;
    serverRuntimeConfig.PRIVATE_ENCRIPTED_USER_DATA.pass = password;
  }

  try {
    const loginUrl = `${apiBackendURL}auth/login`;
    const email = encodeURIComponent(username);
    const passwordEncoded = encodeURIComponent(password);
    const urlWithParams = `${loginUrl}?tenant_id=${tenantID}&email=${email}&password=${passwordEncoded}`;

    // Get access token for use
    res = await getToken(apiBackendURL, username, password);
    if (res.statusCode === 200) {
      access_token = res.tokenData.access_token;
    } else {
      access_token = 'Invalid access Token ' + res.error;
    }

    // Get user record for authentication using Axios
    const response = await axios.post(urlWithParams, null, {
      headers: {
        'Accept': 'application/json',
      },
      timeout: 0, // Set timeout to maximum seconds
    });

    // Check if the response status is in the range 200-299 (indicating success)
    if (response.status < 200 || response.status >= 300) {
      res = {
        statusCode: "400",
        user: {}, 
        access_token: '', 
      };
    }

    // Parse user record
    const data = response.data;
    const { ...user } = data;

    // Store access token and user data in server config
    if (serverRuntimeConfig?.API_ACCESS_TOKEN_SERVER) {
      serverRuntimeConfig.API_ACCESS_TOKEN_SERVER = access_token;
      serverRuntimeConfig.IS_LOGIN = true;
      serverRuntimeConfig.LOGIN_USER_DATA = { ...user };
    }

    // Prepare response on success
    res = {
      statusCode: "200",
      user: { ...user },
      access_token: access_token,
    };
  } catch (error) {
    // Handle errors
    if (serverRuntimeConfig) {
      serverRuntimeConfig.IS_LOGIN = false;
    }

    // Prepare response on failure
    res = {
      statusCode: "400",
      user: {},
      access_token: '',
    };
  }

  return res;
}

export const getServerUserDetails = async () => {
  const { serverRuntimeConfig } = getConfig() || {};
  let userDetailRec = {};
  
  // Retrieve user details from server config
  if (serverRuntimeConfig?.API_ACCESS_TOKEN_SERVER) {
    userDetailRec = serverRuntimeConfig.LOGIN_USER_DATA;
  }
  return userDetailRec;
};
