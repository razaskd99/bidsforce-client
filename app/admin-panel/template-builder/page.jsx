import EditorInner from './EditorInner'
getCookieValue
// start login init
import { redirect } from "next/navigation";
import { API_BACKEND_SERVER } from '../../setup';
import { getToken } from '@/app/api/util/script';
import { getCookieValue } from '@/lib/scripts';
//import { getCookieValue } from '@/lib/scripts';
// end login init 

export default async function page() {

  let userEncrptedData = await getCookieValue('userPrivateData')
  let tenant_ID = await getCookieValue('TENANT_ID')
    
  // get env variables
  let apiBackendURL = API_BACKEND_SERVER
  let username = userEncrptedData.user
  let password = userEncrptedData.pass
  let tenantID = tenant_ID

  // get token
  let res = await getToken(apiBackendURL, username, password)
  let tokens = res?.tokenData?.access_token

  // check user is login
  let isLogin = await getCookieValue('loginStatus')
  if (isLogin == true || isLogin == 'true') {
  }
  else {
    { redirect("/login") }
  }


  return (
    <div>
      <EditorInner tId={tenantID} tokens={tokens} />
      {/* <EditorInner tId={tenantID}  /> */}
    </div>
  )
}
