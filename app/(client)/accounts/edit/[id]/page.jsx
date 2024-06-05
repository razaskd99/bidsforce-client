// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
import { getAccountRecordByIDAction } from "@/app/api/accounts/action/account";
import { getAllUserRecordsAction } from "@/app/api/admin-panel/actions/user";
import AccountsDetail from "@/components/account/AccountsDetail";
import { getAllAccountTypeEntriesAction } from "@/app/api/accounts/action/accountTypeEntries";
import { getAllAccountTypeRecordsAction } from "@/app/api/accounts/action/accountType";

// end login init

const AddAccount = async ({ params }) => {
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
   let records = await getAccountRecordByIDAction(id);
   let accountRec = records.returnData;

   // get all account type
   records = await getAllAccountTypeRecordsAction('', 0, 1000);
   let allAccountsTypeRecord = records?.returnData?.data;
   
   // get all contacts
   records = await getAllUserRecordsAction('');
   let contactsRecord = records.returnData;

   // get account type entries by account id
   records = await getAllAccountTypeEntriesAction(id);
   let resp = records.returnData
   let accountTypeEntries = resp?.map((rec, index) => ({
    id: rec.account_type_id,
    name: rec.type_name    
  }))

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
      <AccountsDetail data={accountRec} allAccountsTypeRecord={allAccountsTypeRecord} contactsRecords={contactsRecord} accountTypeEntries={accountTypeEntries}/>
    </>
  );
};

export default AddAccount;
