import { getToken } from '../api/util/script'
const axios = require('axios');
import getConfig from "next/config";

const page = async () => {

    const { serverRuntimeConfig } = getConfig() || {};

    let apiBackendURL=''
    let username = ''
    let password = ''
    let tenantID = 0
    let isLogin=false


    if (serverRuntimeConfig) {
        apiBackendURL = serverRuntimeConfig.API_BACKEND_SERVER
        username = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.user
        password = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.pass

        tenantID = serverRuntimeConfig.TENANT_ID
        isLogin = serverRuntimeConfig.IS_LOGIN
    
    }


    let res = await getToken(apiBackendURL, username, password)

    let tokens = res?.tokenData?.access_token

    let opData = await getOpportunitiesRequest(apiBackendURL, tenantID, tokens)


    return (
        <div>
            {
                opData.map((o) => {
                    return (
                        <h2>{o.title}</h2>
                    )
                })
            }
        </div>
    )
}


const getOpportunitiesRequest = async (apiBackendURL, tenantID, accessToken) => {

    const url = `${apiBackendURL}opportunity/Opportunity/${tenantID}`;

    try {
        const response = await axios.get(url, {
            cache: "no-store",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
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

}




export default page
