// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
import { getUserById } from "@/app/api/users/action/user";
import AdminUserDetail from "../../components/AdminUserDetail";
import { getTenantRecordByIDAction } from "@/app/api/controlpanel/actions/controlpanel";
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

    let response = {}

    // get token
    response = await getToken(apiBackendURL, username, password);
    let tokens = response?.tokenData?.access_token;
    
    // get users
    response = await getUserById(id)
    let usersRecord = response.data 

    // get tenant record
    response = await getTenantRecordByIDAction(tenantID, apiBackendURL, tokens);
    let tenantDetails = {domainName: response.tenantData.domain_url, fullDomainURL: response.tenantData.full_domain};
    
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
      <AdminUserDetail contactsRec={usersRecord} tenantDetails={tenantDetails} userLoginID={userLoginData.user_id}/>
    </>
  );
};

export default AddAccount;
