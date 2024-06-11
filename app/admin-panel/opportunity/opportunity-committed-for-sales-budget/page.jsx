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
  let numberOfRecords=15
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
  let records = await getAllOppPrereqRecordsAction("opp_committed_for_sales_budget",  searchTermValue, offset, limit);
  const allRecords = records?.returnData?.data || [];
  const total_count = records?.returnData?.total_count || 0;
  const totalPages = Math.ceil(total_count / limit)

  const breadcrumbItems = [
    { label: "Home", href: "/admin-panel" },
    { label: "Opportunity Committed For Sales Budget", href: "/admin-panel/opportunity/opportunity-committed-for-sales-budget" },
  ];

  return (
    <div className=" w-full">
      <div className="">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="flex items-center gap-2">
          <OppPrereqAddNewButton 
            buttonName={"opp_committed_for_sales_budget"} 
            buttonType={"new"} 
          />
          
          <SearchSection/>

        </div>
      </div>

      <div>
        <OppPrereqTable allRecords={allRecords} tableName={"opp_committed_for_sales_budget"}/>
      </div>

      <div className=" flex justify-center mt-20">
        <Pagination totalPages={totalPages} />
      </div>
      
    </div>
  );
}
