
import { getAllRfxRecords } from "@/app/api/rfx/scripts";
import { getToken } from "@/app/api/util/script";
import RfxList from "@/components/Rfx";

// start for login check
import getConfig from "next/config";
import { redirect } from "next/navigation";
let isLogin = false;
// end for login check

const RfxPage = async () => {

  // get env variables
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
    isLogin = serverRuntimeConfig?.IS_LOGIN
  }


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


  if (isLogin == true) {
  }
  else {
    redirect('/login')
  }


  return (
    rfxRecords.length > 0
      ?
      <RfxList rfxRec={rfxRecords} dataType="rfx" />
      :
      <div class="p-4 text-center text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
        Rfx records are not found.
      </div>
  )
}
export default RfxPage

