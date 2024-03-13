"use server"
import { getToken } from "@/app/api/util/script";
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig() || {};


export const getPageContent = async () => {

    let username = ''
    let password = ''
    let apiBackendURL=''
    let tenantID=''
    if (serverRuntimeConfig) {
        apiBackendURL = serverRuntimeConfig?.API_BACKEND_SERVER
        tenantID=  serverRuntimeConfig?.tenantID


        username = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.user
        password = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.pass
    }
    let tokens = ''
    let tokenRes = await getToken(apiBackendURL, username, password)
    tokens = tokenRes?.tokenData?.access_token



    
    try {
        const url = `${apiBackendURL}templates/templates/raza/content/load?tenant_id=1`;

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
                error: response.statusText || 'Request failed',
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
            error: error.message || 'Request failed',
        };
    }
    
};
