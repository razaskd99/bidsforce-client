import AdminPanelHome from "./components/AdminPanelHome";

// start for login check
import getConfig from 'next/config'
import { redirect } from 'next/navigation'
import { headers } from "next/headers";
import { getFullDomainName } from '@/app/api/util/loginHandle';
let isLogin = false
// end for login check

function AdminPanel() {
  const { serverRuntimeConfig } = getConfig() || {};


  if (serverRuntimeConfig) {
    // start check login
    let homeURL = getFullDomainName(headers)
    isLogin = serverRuntimeConfig.IS_LOGIN
    if (!isLogin) { redirect(homeURL + "login") }
    // end check login
  }

  if (isLogin == true) {
  }
  else {
    redirect('/login')
  }

  return (
    <>
      <div>
        <AdminPanelHome />
      </div>
    </>
  );
}
export default AdminPanel;
