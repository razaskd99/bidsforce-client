import { getOpportunityByID } from "@/app/api/opportunities/action/opportunity";
import OpportunityDetail from "@/components/opportunity/OpportunityDetail"
import getConfig from "next/config";


// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
import { hideMainLoader102 } from "@/app/api/util/utility";
import { getAllAccountRecordsAction } from "@/app/api/accounts/action/account";
import { getAllOppPrereqRecordsAction } from "@/app/api/opportunities/action/OpportunityPrereq";
import { getAllUserRecordsAction } from "@/app/api/admin-panel/actions/user";
import { getUserById } from "@/app/api/users/action/user";

// end login init

const AddRfx = async ({ params }) => {
  const { id } = params;

  let userEncrptedData = await getCookieValue("userPrivateData");
  let tenant_ID = await getCookieValue("TENANT_ID");
  let userLoginData = await getCookieValue("userLoginData");

  // get env variables
  let apiBackendURL = API_BACKEND_SERVER;
  let username = userEncrptedData.user;
  let password = userEncrptedData.pass;
  let tenantID = tenant_ID;

  // get token
  let res = await getToken(apiBackendURL, username, password);
  let tokens = res?.tokenData?.access_token;

  // call opp record
  let records = await getOpportunityByID(id);
  let opportunityRec = records.returnData;

  // call all account
  records = await getAllAccountRecordsAction('', 0, 1000);
  let accountRec = records.returnData.data;

  // get all users
  records = await getAllUserRecordsAction('');
  let contactsRecords = records.returnData;

  // get owner
  records = await getUserById(opportunityRec.opp_owner_id);
  let ownerRec = records.data;


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


  // check user is login
  let isLogin = await getCookieValue("loginStatus");
  if (isLogin == true || isLogin == "true") {
  } else {
    {
      redirect("/login");
    }
  }

  return (
    <>
      <OpportunityDetail 
      data={opportunityRec}
      accountRec={accountRec}
      contactsRecords={contactsRecords}
      ownerRec={ownerRec}
      oppSalesStages={oppSalesStages}
      salesPursuitProgress={salesPursuitProgress}
      businessLine={businessLine}
      oppCommForSalesBudget={oppCommForSalesBudget}
      biddingUnit={biddingUnit}
      projectType={projectType}
      opportunityType={opportunityType}
     />
    </>
  );
};

export default AddRfx;
