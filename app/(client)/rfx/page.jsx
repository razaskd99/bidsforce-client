
import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs"
import SearchSection from "@/components/SearchSection";
import OpenRfx from "@/components/rfx/OpenRfx"
import RFxTable from "@/components/rfx/RFxTable"
// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from '../../setup';
import { getToken } from "@/app/api/util/script";
import { getAllUsersAction } from "@/app/api/users/action/user";
import { getAllRfxRecordsAction } from "@/app/api/rfx/actions/rfx";
import { getAllRfxPrereqRecordsAction } from "@/app/api/rfx/actions/rfxPrereq";
import { getAllOppPrereqRecordsAction } from "@/app/api/opportunities/action/OpportunityPrereq";
import { getAllAccountRecordsAction } from "@/app/api/accounts/action/account";
import { hideMainLoader102 } from "@/app/api/util/utility";
// end login init 

const RfxPage = async ({searchParams}) => {
  hideMainLoader102()
  // search terms
  let searchTermValue=searchParams?.searchterm
  if(!searchTermValue)searchTermValue=""

  // pagination
  let numberOfRecords=15
  const currentPage = Number(searchParams?.page) || 1
  const limit = Number(searchParams?.limit) || numberOfRecords
  const offset = (currentPage - 1) * limit

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

  // get all users 
  let records = await getAllUsersAction('')
  let usersRecords = records?.data || []

  // get all accounts 
  records = await getAllAccountRecordsAction('', 0 , 1000)
  let accountRecords = records?.returnData?.data || []

  // get all rfx 
  records = await getAllRfxRecordsAction(searchTermValue, offset, limit)
  let rfxRecords = records?.returnData?.data || []
  const total_count = records?.returnData?.total_count || 0;
  const totalPages = Math.ceil(total_count / limit)

  
  //**************** Rfx prereqsuites starts ***********

  // get all bid validity
  res = await getAllRfxPrereqRecordsAction('bid_validity', "", 0, 1000);
  let rfxBidValidity = res?.returnData?.data || [];

  // get all rfx type
  res = await getAllRfxPrereqRecordsAction('rfx_type', "", 0, 1000);
  let rfxType = res?.returnData?.data || [];

  // get all rfx content submission
  res = await getAllRfxPrereqRecordsAction('rfx_content_submission', "", 0, 1000);
  let rfxContentSubmission = res?.returnData?.data || [];

  // get all rfx submission mode
  res = await getAllRfxPrereqRecordsAction('rfx_submission_mode', "", 0, 1000);
  let rfxSubmissionMode = res?.returnData?.data || [];

  // get all rfx stage
  res = await getAllRfxPrereqRecordsAction('rfx_stage', "", 0, 1000);
  let rfxStage = res?.returnData?.data || [];

  //**** Start getting opportunity pre-requisite

  // get all opportunity sales stages
  res = await getAllOppPrereqRecordsAction('opportunity_sales_stages', "", 0, 1000);
  let oppSalesStages = res?.returnData?.data || [];

  // get all opportunity sales pursuit progress stages
  res = await getAllOppPrereqRecordsAction('sales_pursuit_progress', "", 0, 1000);
  let salesPursuitProgress = res?.returnData?.data || [];

  // get all business line stages
  res = await getAllOppPrereqRecordsAction('business_line', "", 0, 1000);
  let businessLine = res?.returnData?.data || [];

  // get all opportunity Committed For Sales Budget
  res = await getAllOppPrereqRecordsAction('opp_committed_for_sales_budget', "", 0, 1000);
  let oppCommForSalesBudget = res?.returnData?.data || [];

  // get all bidding unit
  res = await getAllOppPrereqRecordsAction('bidding_unit', "", 0, 1000);
  let biddingUnit = res?.returnData?.data || [];

  // get all project type
  res = await getAllOppPrereqRecordsAction('project_type', "", 0, 1000);
  let projectType = res?.returnData?.data || [];

  // get all opp type
  res = await getAllOppPrereqRecordsAction('opportunity_type', "", 0, 1000);
  let opportunityType = res?.returnData?.data || [];

  // get all opp industry
  res = await getAllOppPrereqRecordsAction('opportunity_industry', "", 0, 1000);
  let opportunityIndustry = res?.returnData?.data || [];

 
 
  
  // check user is login
  let isLogin = await getCookieValue('loginStatus')
  if (isLogin == true || isLogin == 'true') {
  }
  else {
    { redirect("/login") }
  }


  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "RFx List", href: "/rfx" }
  ];


  return (
    <div className=" w-full">

      <div>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex items-center gap-2 mt-2">
      <OpenRfx  
        className="mr-2" 
        usersRecords={usersRecords}
        accountRecords={accountRecords}
        oppSalesStagesList={oppSalesStages}
        salesPursuitProgressList={salesPursuitProgress}
        businessLineList={businessLine}
        oppCommForSalesBudgetList={oppCommForSalesBudget}
        biddingUnitList={biddingUnit}
        projectTypeList={projectType}
        opportunityTypeList={opportunityType}
        opportunityIndustryList={opportunityIndustry}
      />
      
      
        <SearchSection/>

      </div>

      {
        rfxRecords.length > 0
        ?
        <RFxTable 
          rows={rfxRecords}  
          usersRecords={usersRecords} 
          totalPages={totalPages}
          rfxBidValidity={rfxBidValidity}
          rfxType={rfxType}
          rfxContentSubmission={rfxContentSubmission}
          rfxSubmissionMode={rfxSubmissionMode}
          rfxStage={rfxStage}
        />
        :
        <div className="p-4 text-center text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
          Rfx records are not found.
        </div>
      }
    
    </div>


    </div>
  )
}
export default RfxPage

