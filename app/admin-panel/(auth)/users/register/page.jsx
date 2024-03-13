import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import AdminPanelUserRegistrationForm from "../components/RegisterForm";

// start for login check
import getConfig from "next/config";
import { redirect } from "next/navigation";
import { getToken } from "@/app/api/util/script";
let isLogin = false;
// end for login check
export default async function AdminPanelUserRegistration() {


  // get env variables
  const { serverRuntimeConfig } = getConfig() || {};
  let apiBackendURL = ''
  let username = ''
  let password = ''
  let tenantID = 0
  if (serverRuntimeConfig) {
    apiBackendURL = serverRuntimeConfig.API_BACKEND_SERVER
    username = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.user
    password = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.pass
    tenantID = serverRuntimeConfig.TENANT_ID
    isLogin = serverRuntimeConfig.IS_LOGIN
  }

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
