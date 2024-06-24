import { getBidVality, getContentSubmission, getRfxStages, getRfxTypes, getSubmissionMode, getUsers, getAllPersonaRecordsAction } from "@/app/api/rfx/actions/rfx";
import CreateNewRfx from "@/components/CreateNewRfx";
import getConfig from "next/config";

// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
//import { getOpportunityByID } from "@/app/api/opportunities/scripts";
// import { getAllPrimaryContactsAction } from "@/app/api/contacts/actions/contacts";
import { getAllAccountRecordsAction } from "@/app/api/accounts/action/account";
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
  const rfxType = rfxTypesRes?.data

  let rfxStagesRes= await getRfxStages();
  const rfxStages = rfxStagesRes?.data

  let bidValidityRes= await getBidVality();
  const bidValidity = bidValidityRes?.data

  let submissionModeRes= await getSubmissionMode();
  const submissionMode = submissionModeRes?.data

  let contentSubmissionRes= await getContentSubmission();
  const contentSubmission = contentSubmissionRes?.data
  
  let usersRes= await getUsers();
  const users = usersRes?.data

  // let contactsRes = await getAllPrimaryContactsAction()
  const primaryContactsRec =[]// contactsRes?.returnData

  let companyRes = await getAllAccountRecordsAction('');
  const companyList = companyRes?.returnData

  let personaRes = await getAllPersonaRecordsAction();
  const personaList = personaRes?.returnData
  
  // load opportunity details from cookie
  //preRfxData = await getCookieValue('rfxTempData')
  
  // get opportunity ID from cookie
  let temp_opp_id = await getCookieValue('temp_opp_id')

  // get opportunity details
  //let oppRes = await getOpportunityByID(apiBackendURL, tokens, tenantID, temp_opp_id);
  preRfxData = []//oppRes.opportunityData
  
  // prep data for rfx
  preRfxData = {...preRfxData, opportunity_title: preRfxData.title, customer: preRfxData.customer_name, end_user: preRfxData.end_user_name, opportunity_type: preRfxData.type, total_opportunity_value: preRfxData.total_value, opportunity_probability: preRfxData.probability, opportunity_forecasted: preRfxData.forcasted, rfx_id: '', bid_id: ''}
  
  // check user is login
  let isLogin = await getCookieValue('loginStatus')
  if (isLogin == true || isLogin == 'true') {
  }
  else {
    { redirect("/login") }
  }

   return (
    <CreateNewRfx preRfxData={preRfxData}  rfxType={rfxType} rfxStages={rfxStages} bidValidity={bidValidity} submissionMode={submissionMode} contentSubmission={contentSubmission} users={users} companies={companyList} personas={personaList}  apiBackendURL={apiBackendURL} tenantID={tenantID}  loginUserID={userLoginData.user_id} primaryContactsRec={primaryContactsRec} loginUserRec={userLoginData} />
  );
};

export default NewFx;
