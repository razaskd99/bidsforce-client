import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import AdminPanelUserRegistrationForm from "../components/RegisterForm";

// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
// end login init 

export default async function AdminPanelUserRegistration() {

  let userEncrptedData = await getCookieValue('userPrivateData')
  let tenant_ID = await getCookieValue('TENANT_ID')
  let userLoginData = await getCookieValue('userLoginData')

  // check user is login
  let isLogin = await getCookieValue('loginStatus')    
  if (!isLogin) { 
      { redirect("/login") }
  }
  
  // get env variables
  let apiBackendURL = API_BACKEND_SERVER
  let username = userEncrptedData.user
  let password = userEncrptedData.pass
  let tenantID = tenant_ID

  // get token
  let res = await getToken(apiBackendURL, username, password)
  let tokens = res?.tokenData?.access_token

  const breadcrumbItems = [
    { label: "Users", href: "/admin-panel/users" },
    { label: "New User", href: "/controlpanel/register" },
  ];

  if (isLogin == true) {
  }
  else {
    redirect('/login')
  }


  return (
    <div className=" w-full">
      <div className="flex w-full">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <AdminPanelUserRegistrationForm
        apiBackendURL={apiBackendURL}
        accessToken={tokens}
        tenantID={tenantID}
      />
    </div>
  );
}
