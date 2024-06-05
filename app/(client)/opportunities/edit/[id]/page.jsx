//import { getOpportunityByID } from "@/app/api/opportunities/scripts";
import EditOpportunity from "@/components/EditOpportunity";
import getConfig from "next/config";

// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
import { hideMainLoader102 } from "@/app/api/util/utility";
import { getAllAccountRecordsAction } from "@/app/api/accounts/action/account";


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

  // call all  request
  //let records = await getOpportunityByid(apiBackendURL, tokens, tenantID, id);
  let opportunityRec = []//records.opportunityData;

  // get all company
  records = await getAllAccountRecordsAction('');
  let accountRecords = records.returnData;

  // check user is login
  let isLogin = await getCookieValue("loginStatus");
  if (isLogin == true || isLogin == "true") {
  } else {
    {
      redirect("/login");
    }
  }
console.log(opportunityRec)
  return (
    <>
      <EditOpportunity data={opportunityRec} accountRecords={accountRecords}/>
    </>
  );
};

export default AddRfx;
