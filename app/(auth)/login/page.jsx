import { checkValidTenant, getTenantUrl } from "@/app/api/util/script";
import LoginForm from "@/components/LoginForm";
import "./login.css";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import InvalidTenant from "@/components/InvalidTenant";
import getConfig from 'next/config'
import { redirect } from 'next/navigation'

import { API_BACKEND_SERVER } from '../../setup';
import { getCookieValue } from "@/lib/scripts";


const Login = async () => {

  const { serverRuntimeConfig, publicRuntimeConfig, env } = getConfig() || {};



  const headersList = headers();
  const domain = headersList.get("x-forwarded-host");
  let currentURL = domain;

  let homeURL = getFullDomainName(domain)
  let tID = 0

  let tenantDomain = getTenantUrl(currentURL);

  console.log("tdddddd",tenantDomain)

  
  const res = await checkValidTenant(API_BACKEND_SERVER, tenantDomain);
  let tenantStatus = false;
  let tenantStatusMsg = "";
  if (res.statusCode == 200) {
    let tenant = res.responseData;
    tenantStatus = true;

    if (!tenant.email_verified) {
      tenantStatus = false;
      tenantStatusMsg = "Tenant Email is not Verified ";
    }
    if (!tenant.tenant_is_active) {
      tenantStatus = false;
      tenantStatusMsg = "Tenant Email is not Active ";
    }
    if (tenant.tenant_is_suspended) {
      tenantStatus = false;
      tenantStatusMsg = "Tenant Email is Suspended ";
    }



    tID = tenant.tenant_id


  } else {
    tenantStatus = false;
    tenantStatusMsg = "No Tenant Found";
  }


  // check user is login
  let isLogin = await getCookieValue('loginStatus')
  if (isLogin == true || isLogin == 'true') {
    { redirect("/dashboard") }
  }
  else {
  }


  return tenantStatus ? (
    <LoginForm tenantID={tID} homeURL={homeURL} />
  ) : (
    <InvalidTenant msg={tenantStatusMsg} />
  );
};

function getFullDomainName(domain) {
  // Check if the domain contains "localhost"
  if (domain.includes('localhost')) {
    // If it does, prepend "http://" to the domain
    domain = 'http://' + domain;
  } else if (!/^https?:\/\//.test(domain)) {
    // If it doesn't contain "localhost" and doesn't start with "http://" or "https://",
    // prepend "https://" to the domain
    domain = 'https://' + domain;
  }

  // Check if the domain already ends with "/"
  if (!domain.endsWith('/')) {
    // If it doesn't, append "/" to the domain
    domain += '/';
  }

  return domain;
}



export default Login;


