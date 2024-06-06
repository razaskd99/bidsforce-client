import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";


// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
import AddNewButton from "./components/AddNewButton";
import { hideMainLoader102 } from "@/app/api/util/utility";
import UserTable from "./components/UserTable";
import { getAllUsersAction } from "@/app/api/users/action/user";
import { getTenantRecordByIDAction } from "@/app/api/controlpanel/actions/controlpanel";
import SearchSection from "@/components/SearchSection";
import { getAllFunctionalGroupAction } from "@/app/api/users/action/functionalGroup";
// end login init 

export default async function AdminPanelUsers({searchParams}) {
  hideMainLoader102();

  // search term
  let searchTermValue=searchParams?.searchterm
  if(!searchTermValue)searchTermValue=""

  // cookie variables
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

  // get all users
  let records = await getAllUsersAction(searchTermValue);
  let usersData = records.data;
 
  // get tenant record
  records = await getTenantRecordByIDAction(tenantID, apiBackendURL, tokens);
  let tenantDetails = {domainName: records.tenantData.domain_url, fullDomainURL: records.tenantData.full_domain};

  // get all functional group
  records = await getAllFunctionalGroupAction("", 0, 1000);
  let functionaGroupRecs = records?.returnData?.data?.map((rec) => ({
    id: rec.id,
    name: rec.title
  }));
 

 // get all users record
 records = await getAllUsersAction('');
 let usersRecords = records?.data?.map((rec) => ({
    id: rec.user_id,
    name: rec.first_name + ' ' + rec.last_name
  }))

 

  const breadcrumbItems = [
    { label: "Home", href: "/admin-panel" },
    { label: "Users", href: "/admin-panel/users" },
  ];


  if (isLogin == true) {
  }
  else {
    redirect('/login')
  }


  return (
    <div className=" w-full">
      <div className="flex w-full justify-between items-center mb-2 gap-4">
        <Breadcrumbs items={breadcrumbItems} />
        <SearchSection />
        <AddNewButton  
          modalType={"new"}
          tenantDetails={tenantDetails}
          functionaGroupRecs={functionaGroupRecs}
          usersRecords={usersRecords} 
        />
      </div>

      <div className="card">        
        <div className="table-responsive text-nowrap">
          <UserTable rows={usersData} tenantDetails={tenantDetails} functionaGroupRecs={functionaGroupRecs} usersRecords={usersRecords}/>        
        </div>
      </div>
    </div>
  );
}
