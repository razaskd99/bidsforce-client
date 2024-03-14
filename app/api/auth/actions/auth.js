'use server'
import getConfig from 'next/config'
import { getToken } from '../../util/script';




// Main login action function
export async function loginAction(username, password, apiBackendURL, tenantID) {
  try {
    const { serverRuntimeConfig } = getConfig() || {};

    // Attempt to obtain access token
    const tokenResponse = await getToken(apiBackendURL, username, password);
    let access_token = '';

    if (tokenResponse.statusCode === 200) {
      access_token = tokenResponse.tokenData.access_token;
    } else {
      throw new Error('Failed to obtain access token: ' + tokenResponse.error);
    }

    // Construct login URL
    const loginUrl = `${apiBackendURL}auth/login`;
    const email = encodeURIComponent(username);
    const passwordEncoded = encodeURIComponent(password);
    const urlWithParams = `${loginUrl}?tenant_id=${tenantID}&email=${email}&password=${passwordEncoded}`;

    // Make API call to login
    const response = await axios.post(urlWithParams, null, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.status !== 200) {
      throw new Error('Login request failed: ' + response.statusText);
    }

    const userData = response.data;

    // Store user data and access token in server runtime config
    if (serverRuntimeConfig) {
      serverRuntimeConfig.PRIVATE_ENCRIPTED_USER_DATA.user = username;
      serverRuntimeConfig.PRIVATE_ENCRIPTED_USER_DATA.pass = password;
      serverRuntimeConfig.API_ACCESS_TOKEN_SERVER = access_token;
      serverRuntimeConfig.IS_LOGIN = true;
      serverRuntimeConfig.LOGIN_USER_DATA = { ...userData };
    }

    // Prepare and return success response
    return {
      statusCode: 200,
      user: { ...userData },
      access_token
    };
  } catch (error) {
    // Handle errors
    console.error('Login action failed:', error);
    const { serverRuntimeConfig } = getConfig() || {};
    if (serverRuntimeConfig) {
      serverRuntimeConfig.IS_LOGIN = false;
    }
    return {
      statusCode: 400,
      error: error.message
    };
  }
}



export const getServerUserDetails = async () => {
  const { serverRuntimeConfig } = getConfig() || {};

  let userDetailRec = {}
  if (serverRuntimeConfig?.API_ACCESS_TOKEN_SERVER) {
    userDetailRec = serverRuntimeConfig.LOGIN_USER_DATA
  }
  return userDetailRec
};