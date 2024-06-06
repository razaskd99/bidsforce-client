import getConfig from "next/config";


// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
import OpenDetailContact from "@/components/contacts/OpenDetailContact";
// import { getPrimaryContactsByIDAction } from "@/app/api/contacts/actions/contacts";
import { getAllDesignationRecordsAction, getAllPersonaRecordsAction, getAllTeamRecordsAction } from "@/app/api/rfx/actions/rfx";
import { getAllAccountRecordsAction } from "@/app/api/accounts/action/account";
import { getAllUsers } from "@/app/api/rfx/actions/user";
import { getAllUsersAction, getUserById } from "@/app/api/users/action/user";
// end login init

const AddAccount = async ({ params }) => {
    const { id } = params;

    // search term
    let searchTermValue=params?.searchterm
    if(!searchTermValue)searchTermValue=""

    let userEncrptedData = await getCookieValue("userPrivateData");
    let tenant_ID = await getCookieValue("TENANT_ID");
    let userLoginData = await getCookieValue("userLoginData");

    // get env variables
    let apiBackendURL = API_BACKEND_SERVER;
    let username = userEncrptedData.user;
    let password = userEncrptedData.pass;
    let tenantID = tenant_ID;
    let userLoginID = userLoginData.user_id;

    let response = {}

    // get token
    response = await getToken(apiBackendURL, username, password);
    let tokens = response?.tokenData?.access_token;
      
    // get accounts
    response = await getAllAccountRecordsAction(id);
    let accountRecords = response.returnData;

    // get designations
    response = await getAllDesignationRecordsAction(0,1000)
    let desingPaging = response.returnData 
    let { data, total_count } = desingPaging
    let desigRecords = data

     // get teams
    response = await getAllTeamRecordsAction()
    let teamRecords = response.returnData 

    // get persona
    response = await getAllPersonaRecordsAction()
    let personaRecords = response.returnData 

    // get users
    response = await getUserById(id)
    let usersRecord = response.data 
   
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
      <OpenDetailContact userLoginID={userLoginID} contactsRec={usersRecord} accountRecords={accountRecords} teamRecords={teamRecords} desigRecords={desigRecords}/>
    </>
  );
};

export default AddAccount;
