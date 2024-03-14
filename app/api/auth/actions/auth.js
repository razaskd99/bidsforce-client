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



// get access token for use
    res = await getToken(apiBackendURL, username, password)
    if (res.statusCode == 200) {
      access_token = res.tokenData.access_token
    }
    else {
      access_token = 'Invalid access Token ' + res.error
    }


  }




try {
  const loginUrl = `${apiBackendURL}auth/login`;
  const email = encodeURIComponent(username);
  const passwordEncoded = encodeURIComponent(password);
  const urlWithParams = `${loginUrl}?tenant_id=${tenantID}&email=${email}&password=${passwordEncoded}`;

  const response = await axios.post(urlWithParams, null, {
    timeout: 0, // Setting timeout to maximum value
    headers: {
      'Accept': 'application/json',
    },
  });

  if (response.status !== 200) {
    return {
      statusCode: response.status.toString(),
      user: {},
      access_token: '',
    };
  }

  const { access_token, ...user } = response.data;

  if (serverRuntimeConfig) {
    serverRuntimeConfig.API_ACCESS_TOKEN_SERVER = access_token;
    serverRuntimeConfig.IS_LOGIN = true;
    serverRuntimeConfig.LOGIN_USER_DATA = { ...user };
  }

  return {
    statusCode: '200',
    user: { ...user },
    access_token,
  };
} catch (error) {
  if (serverRuntimeConfig) {
    serverRuntimeConfig.IS_LOGIN = false;
  }

  return {
    statusCode: '400',
    user: {},
    access_token: '',
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