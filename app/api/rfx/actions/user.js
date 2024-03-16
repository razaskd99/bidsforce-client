'use server'

import { getToken } from '../../util/script';
import getConfig from 'next/config'


// start login init
import { getApiPrereqVars } from '../../util/action/apiCallPrereq';
// end login init 

export const getAllUsers = async () => {
    const {apiBackendURL, tokens, tenantID} = await getApiPrereqVars()
    try {
        const url = `${apiBackendURL}auth/auth/users/tenant/${tenantID}`;

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
   