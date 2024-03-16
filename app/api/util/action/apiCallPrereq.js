'use server'

// start login init
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
// end login init 

// get prereq variables for api calls
export const getApiPrereqVars = async()=> {  
  let tokens = ''
  let tenantID = ''
  let apiBackendURL = ''
  try{
    let userEncrptedData = await getCookieValue('userPrivateData')
    let tenant_ID = await getCookieValue('TENANT_ID')
    let userLoginData = await getCookieValue('userLoginData')
    
    // get env variables
    let username = userEncrptedData.user
    let password = userEncrptedData.pass
    apiBackendURL = API_BACKEND_SERVER
    tenantID = tenant_ID

    // get token
    let res = await getToken(apiBackendURL, username, password)
    tokens = res?.tokenData?.access_token

  }catch {}
  
  return {apiBackendURL, tokens, tenantID};
}