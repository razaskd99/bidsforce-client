import Breadcrumbs from "@/components/controlpanel/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import RegisterTenantForm from "@/components/controlpanel/RegisterForm";
import { getToken } from "@/app/api/util/script";


// start for login check
import getConfig from "next/config";
import { redirect } from "next/navigation";
let isLogin = false;
// end for login check

export default async function NewTenant()  {

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

  if (isLogin == true) {
  }
  else {
    redirect('/login')
  }


  const breadcrumbItems = [
    { label: "Control Penal", href: "/controlpanel/auth/members" },
    { label: "Register Tenant", href: "/controlpanel/auth/register" },   
  ];

  

  return (
      <div className=" w-full">  
        <div className="flex w-full">
          <Breadcrumbs items={breadcrumbItems}/>        
        </div>   
        <RegisterTenantForm apiBackendURL={apiBackendURL} accessToken={tokens} />       
      </div>
  );
};

