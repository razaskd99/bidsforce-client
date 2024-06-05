import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import Link from "next/link";
import OppPrereqAddNewButton from "../components/OppPrereqAddNewButton";
import { getAllOppPrereqRecordsAction } from "@/app/api/opportunities/action/OpportunityPrereq";
import OppPrereqTable from "@/app/admin-panel/opportunity/components/OppPrereqTable"
import SearchSection from "@/components/SearchSection"

// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
import Pagination from "@/components/pageniation-util/pagination";

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

  // get all project type
  let response = await getAllOppPrereqRecordsAction("project_type", searchTermValue, offset, limit);
  const allRecords = response?.returnData?.data || [];
  const total_count = response?.returnData?.total_count || 0;
  const totalPages = Math.ceil(total_count / limit)


  const breadcrumbItems = [
    { label: "Home", href: "/admin-panel" },
    { label: "Project Type", href: "/admin-panel/opportunity/project-type" },
  ];

  return (
    <div className=" w-full">
    <div className="">
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="flex items-center gap-2">
        <OppPrereqAddNewButton 
          buttonName={"project_type"} 
          buttonType={"new"} 
        />
        
        <SearchSection/>

      </div>
    </div>

    <div>
      <OppPrereqTable allRecords={allRecords} tableName={"project_type"}/>
    </div>

    <div className=" flex justify-center mt-20">
      <Pagination totalPages={totalPages} />
    </div>
    
  </div>
);
}
