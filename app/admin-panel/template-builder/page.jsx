import EditorInner from './EditorInner'

// start for login check
import getConfig from 'next/config'
import { redirect } from 'next/navigation'
import { headers } from "next/headers";
import { getFullDomainName } from '@/app/api/util/loginHandle';
let isLogin = false
// end for login check




export default function page() {

  const { serverRuntimeConfig } = getConfig() || {};

  let accessToken = ''
  let apiBackendURL = ''
  let tenantID = 0


  if (serverRuntimeConfig) {
    // get api backend url
    apiBackendURL = serverRuntimeConfig.API_BACKEND_SERVER
    // get access token
    accessToken = serverRuntimeConfig.API_ACCESS_TOKEN_SERVER
    tenantID = serverRuntimeConfig.TENANT_ID

    // start check login
    let homeURL = getFullDomainName(headers)
    isLogin = serverRuntimeConfig.IS_LOGIN
    if (!isLogin) { redirect(homeURL + "login") }
    // end check login
  }

  if (isLogin == true) {
  }
  else {
    redirect('/login')
  }



  return (
    <div>
      <EditorInner tId={tenantID}  />
      {/* <EditorInner tId={tenantID}  /> */}
    </div>
  )
}
