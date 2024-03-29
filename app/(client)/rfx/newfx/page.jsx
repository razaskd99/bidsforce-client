import { getBidVality, getContentSubmission, getRfxStages, getRfxTypes, getSubmissionMode, getUsers, getAllCompanyRecordsAction } from "@/app/api/rfx/actions/rfx";
import CreateNewRfx from "@/components/CreateNewRfx";
import { getUserById } from "@/app/api/rfx/actions/user";
import getConfig from "next/config";

// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
// end login init 

const NewFx = async () => {
  const { serverRuntimeConfig } = getConfig() || {};
  let preRfxData = {}  
  
  let userEncrptedData = await getCookieValue('userPrivateData')
  let tenant_ID = await getCookieValue('TENANT_ID')
  let userLoginData = await getCookieValue('userLoginData')

  // get env variables
  let apiBackendURL = API_BACKEND_SERVER
  let username = userEncrptedData.user
  let password = userEncrptedData.pass
  let tenantID = tenant_ID

  // get token
  let res = await getToken(apiBackendURL, username, password)
  let tokens = res?.tokenData?.access_token


  let rfxTypesRes= await getRfxTypes();
  const rfxType = rfxTypesRes.data

  let rfxStagesRes= await getRfxStages();
  const rfxStages = rfxStagesRes.data

  let bidValidityRes= await getBidVality();
  const bidValidity = bidValidityRes.data


  let submissionModeRes= await getSubmissionMode();
  const submissionMode = submissionModeRes.data

  let contentSubmissionRes= await getContentSubmission();
  const contentSubmission = contentSubmissionRes.data
  
  let usersRes= await getUsers();
  const users = usersRes.data

  let companyRes = await getAllCompanyRecordsAction();
  const companyList = companyRes.returnData

  
  if (serverRuntimeConfig) {
    if (Object.entries(serverRuntimeConfig.TEMP_DATA).length > 0) {
      preRfxData = { ...serverRuntimeConfig.TEMP_DATA }
    }
  }

  // check user is login
  let isLogin = await getCookieValue('loginStatus')
  if (isLogin == true || isLogin == 'true') {
  }
  else {
    { redirect("/login") }
  }
  
   return (
    <CreateNewRfx preRfxData={preRfxData}  rfxType={rfxType} rfxStages={rfxStages} bidValidity={bidValidity} submissionMode={submissionMode} contentSubmission={contentSubmission} users={users} companies={companyList}  apiBackendURL={apiBackendURL} tenantID={tenantID}  loginUserID={userLoginData.user_id} />
  );
};

export default NewFx;
