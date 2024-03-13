import { getBidVality, getContentSubmission, getRfxStages, getRfxTypes, getSubmissionMode, getUsers, getAllCompanyRecordsAction } from "@/app/api/rfx/actions/rfx";
import CreateNewRfx from "@/components/CreateNewRfx";
import { getUserById } from "@/app/api/rfx/actions/user";
import { getToken } from "@/app/api/util/script";


// start for login check
import getConfig from "next/config";
import { redirect } from "next/navigation";
let isLogin = false;
// end for login check

const NewFx = async () => {
  let preRfxData = {}
  
  // get env variables
  const { serverRuntimeConfig } = getConfig() || {};
  let apiBackendURL = ''
  let username = ''
  let password = ''
  let tenantID = 0
  let loginUserRec = {}
  if (serverRuntimeConfig) {
    apiBackendURL = serverRuntimeConfig.API_BACKEND_SERVER
    username = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.user
    password = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.pass
    tenantID = serverRuntimeConfig.TENANT_ID
    isLogin = serverRuntimeConfig.IS_LOGIN
    loginUserRec = serverRuntimeConfig.LOGIN_USER_DATA
  }

  // get token
  let res = await getToken(apiBackendURL, username, password)
  let tokens = res?.tokenData?.access_token



  if (serverRuntimeConfig) {
    if (Object.entries(serverRuntimeConfig.TEMP_DATA).length > 0) {
      preRfxData = { ...serverRuntimeConfig.TEMP_DATA }
    }
  }

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

  if (isLogin == true) {
  }
  else {
    redirect('/login')
  }


   return (
    <CreateNewRfx preRfxData={preRfxData}  rfxType={rfxType} rfxStages={rfxStages} bidValidity={bidValidity} submissionMode={submissionMode} contentSubmission={contentSubmission} users={users} companies={companyList}  apiBackendURL={apiBackendURL} tenantID={tenantID}  loginUserID={loginUserRec.user_id} />
  );
};

export default NewFx;
