import { checkValidTenant, getTenantUrl } from "@/app/api/util/script";
import LoginForm from "@/components/LoginForm";
import "./login.css";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import InvalidTenant from "@/components/InvalidTenant";
import getConfig from 'next/config'
import { redirect } from 'next/navigation'

const Login = async () => {
  let apiBackendURL = "";
  let isLogin = false

  const { serverRuntimeConfig, publicRuntimeConfig, env } = getConfig() || {};
  if (serverRuntimeConfig) {
    apiBackendURL = serverRuntimeConfig.API_BACKEND_SERVER;
    isLogin = serverRuntimeConfig.IS_LOGIN
  }


  const headersList = headers();
  const domain = headersList.get("x-forwarded-host");
  let currentURL = domain;

  let homeURL = getFullDomainName(domain)


  let tenantDomain = getTenantUrl(currentURL);
  const res = await checkValidTenant(apiBackendURL, tenantDomain);
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

    if (serverRuntimeConfig) {
      if (tenantStatus == true) {
        serverRuntimeConfig.TENANT_ID = tenant.tenant_id;
        serverRuntimeConfig.HOME_URL = homeURL
      }
      else { serverRuntimeConfig.TENANT_ID = 0 };
    }

    if (publicRuntimeConfig) {
      publicRuntimeConfig.TENANT_ID = tenant.tenant_id
      publicRuntimeConfig.HOME_URL = homeURL
    }

    if (env) {
      env.TENANT_ID = tenant.tenant_id
      env.HOME_URL = homeURL
    }

  } else {
    tenantStatus = false;
    tenantStatusMsg = "No Tenant Found";
  }


  if (isLogin) redirect(homeURL + "dashboard")


  return tenantStatus ? (
    <LoginForm tenantID={serverRuntimeConfig.TENANT_ID} />
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
