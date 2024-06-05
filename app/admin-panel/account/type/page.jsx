import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import Link from "next/link";
import AccountTypeAddNewButton from "../components/AccountTypeAddNewButton";
import SearchSection from "@/components/SearchSection"



// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
import { getAllAccountTypeRecordsAction } from "@/app/api/accounts/action/accountType";
import Pagination from "@/components/pageniation-util/pagination";
import AccountTypeTableAdmin from "../components/AccountTypeTableAdmin";
// end login init 

export default async function AccountType({searchParams}) {
  let userEncrptedData = await getCookieValue('userPrivateData')
  let tenant_ID = await getCookieValue('TENANT_ID')
  let userLoginData = await getCookieValue('userLoginData')

   let numberOfRecords=5
  // for pagination
  const searchTermValue = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1


  const limit = Number(searchParams?.limit) || numberOfRecords
  const offset = (currentPage - 1) * limit

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
  let records = await getAllAccountTypeRecordsAction(searchTermValue, offset, limit);
  const {data, total_count} = records.returnData;
  const allRecords = data;
  const totalPages = Math.ceil(total_count / limit)

  const breadcrumbItems = [
    { label: "Home", href: "/admin-panel" },
    { label: "Account Type", href: "/admin-panel/account/type" },
  ];

  
  return (
    <div className=" w-full">
      <div className="">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="flex items-center gap-2">
          <AccountTypeAddNewButton 
          buttonName={"AccountType"} 
          buttonType={"new"} 
          apiBackendURL={apiBackendURL}
          tenantID={tenantID}
          tokens={tokens}
        />

        <SearchSection/>

        </div>
      </div>     

      <div>
        <AccountTypeTableAdmin allRecords={allRecords} />       
      </div> 
        <div className=" flex justify-center mt-20">
          <Pagination totalPages={totalPages} />
        </div>
    </div>
  );
}
