import { getCookieValue } from "@/lib/scripts";
import AdminPanelHome from "./components/AdminPanelHome";

// start for login check
import { redirect } from "next/navigation";
// end for login check

const AdminPanel = async()=> {

  // check user is login
  let isLogin = await getCookieValue('loginStatus')
  if (isLogin == true || isLogin == 'true') {
  }
  else {
    { redirect("/login") }
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
