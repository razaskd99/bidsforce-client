
import { getAllRfxRecords } from "@/app/api/rfx/scripts";
import RfxList from "@/components/Rfx";
import getConfig from "next/config";

// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from '../../setup';
import { getToken } from "@/app/api/util/script";
// end login init 

const RfxPage = async () => {
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

  // call all rfx request
  let records = await getAllRfxRecords(apiBackendURL, tokens, tenantID)
  let rfxdata = records.rfxData

  // get all rfx
  let rfxRecords = rfxdata.find(item => item.bid_number === "")
  if (rfxRecords?.length > 0) {
  }
  else {
    rfxRecords = [{ ...rfxRecords }]
  }

  rfxRecords = records.rfxData


  // check user is login
  let isLogin = await getCookieValue('loginStatus')
  if (isLogin == true || isLogin == 'true') {
  }
  else {
    { redirect("/login") }
  }


  return (
    rfxRecords.length > 0
      ?
      <RfxList rfxRec={rfxRecords} dataType="rfx" />
      :
      <div className="p-4 text-center text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
        Rfx records are not found.
      </div>
  )
}
export default RfxPage

