import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import PersonaAddNewButton from "./components/FunctionalGroupAddNewButton";
import { getAllFunctionalGroupAction } from "@/app/api/users/action/functionalGroup";
import FunctionalGroupTable from "./components/FunctionalGroupTable";
import SearchSection from '@/components/SearchSection'
import Pagination from "@/components/pageniation-util/pagination";

// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
// end login init 

export default async function AdminPanelDesignation({searchParams}) {
  // search terms
  let searchTermValue=searchParams?.searchterm
  if(!searchTermValue)searchTermValue=""

  // pagination
  let numberOfRecords=5
  const currentPage = Number(searchParams?.page) || 1
  const limit = Number(searchParams?.limit) || numberOfRecords
  const offset = (currentPage - 1) * limit


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

  // call all tenant action
  let records = await getAllFunctionalGroupAction(searchTermValue, offset, limit);
  const allRecords = records?.returnData?.data || [];
  const total_count = records?.returnData?.total_count || 0;
  const totalPages = Math.ceil(total_count / limit)

  const breadcrumbItems = [
    { label: "Home", href: "/admin-panel" },
    { label: "Functional Group", href: "/admin-panel/functional-group" },
  ];

  return (
    <div className=" w-full">
      <div className="">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-center gap-2">
          <PersonaAddNewButton 
            buttonName={"functional group"} 
            buttonType={"new"} 
            apiBackendURL={apiBackendURL}
            tenantID={tenantID}
            tokens={tokens}
          />
          
          <SearchSection/>

        </div>
      </div>

      <div>
        <FunctionalGroupTable allRecords={allRecords} />       
      </div> 

        <div className=" flex justify-center mt-20">
          <Pagination totalPages={totalPages} />
        </div>
    </div>
  );
}
