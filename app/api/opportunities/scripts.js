"use server"
const axios = require('axios');
import getConfig from "next/config";
import { getToken } from "../util/script";


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


export const getAllOppotunitiesRecords = async (apiBackendURL, accessToken, tenantID) => {
    const url = `${apiBackendURL}opportunity/Opportunity/${tenantID}`;

    // get token
    let res = await getToken(apiBackendURL, username, password)
    let tokens = res?.tokenData?.access_token

    try {
        const response = await axios.get(url, {
            cache: "no-store",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokens}`,
            },
            timeout: 0, // Setting timeout to maximum value
        });
  
        if (!response.data || !response.data.length || !response.data.length > 0) {
            return []
        }
  
        return response.data
  
    } catch (err) {
  
        return []
  
    }
  };


export const getOpportunityByID = async (apiBackendURL, accessToken, tenantID, id) => {
    try {
        const url = `${apiBackendURL}opportunity/Opportunity/${tenantID}/id/${id}`;

        // get token
        let res = await getToken(apiBackendURL, username, password)
        let tokens = res?.tokenData?.access_token

        const response = await axios.get(url, {
            cache: "no-store",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokens}`,
            },
            timeout: 0, // Setting timeout to maximum value
        });

        if (!response.status === 200) {
            return {
                statusCode: "400",
                opportunityData: [],
                error: response.statusText || 'Request failed for Rfxs',
            };
        }

        return {
            statusCode: 200,
            opportunityData: response.data,
        };
    } catch (error) {
        return {
            statusCode: "400",
            opportunityData: [],
            error: error.message || 'Request failed for Rfxs',
        };
    }
};
