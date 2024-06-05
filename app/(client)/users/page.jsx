import ContactTabel from "@/components/contacts/ContactTable";
import OpenContact from "@/components/contacts/OpenContact";
import OpenTeamDailog from "@/components/contacts/OpenTeamDailog";
import Breadcrumbs from "@/components/controlpanel/Breadcrumbs";


// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
import {  getAllPersonaRecordsAction } from "@/app/api/rfx/actions/rfx";
import { getAllUsersAction } from "@/app/api/users/action/user";
import { getAllContactsTeamAction } from "@/app/api/contacts/actions/team";
// end login init 



export default async function Contacts({searchParams}) {

  // search term
  let searchTermValue=searchParams?.searchterm
  if(!searchTermValue)searchTermValue=""

  // mode term
  let modeTermValue=searchParams?.mode
  if(!modeTermValue)modeTermValue=""

  // pagination
  let numberOfRecirds=5
  const search = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const limit = Number(searchParams?.limit) || numberOfRecirds
  const offset = (currentPage - 1) * limit

  // access info
  let userEncrptedData = await getCookieValue('userPrivateData')
  let tenant_ID = await getCookieValue('TENANT_ID')
  let userLoginData = await getCookieValue('userLoginData')

  // check user is login
  let isLogin = await getCookieValue('loginStatus')    
  if (!isLogin) { 
      { redirect("/login") }
  }
  
  // get env variables
  let apiBackendURL = API_BACKEND_SERVER
  let username = userEncrptedData.user
  let password = userEncrptedData.pass
  let tenantID = tenant_ID

  // get token
  let res = await getToken(apiBackendURL, username, password)
  let tokens = res?.tokenData?.access_token

  let response = {}

  // get persona
  response = await getAllPersonaRecordsAction()
  let personaRecords = response.returnData 

  // get users
  response = await getAllUsersAction(!modeTermValue || modeTermValue == 'users' ? searchTermValue : '')
  let userRecords = response.data 

  // get users team
  response = await getAllContactsTeamAction(modeTermValue == 'teams' ? searchTermValue : '')
  let userTeamRecords = response.returnData

  
  return (
    <div className="">      
      <div>
        <OpenContact userRecords={userRecords} personaRecords={personaRecords} userTeamRecords={userTeamRecords}/>
      </div>
    </div>
  )
}