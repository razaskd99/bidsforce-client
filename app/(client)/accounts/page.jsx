import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import { IoIosSearch } from "react-icons/io";
import OpenAccounts from "@/components/account/OpenAccounts";


// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
import AccountTable from "@/components/account/AccountTable";
import SearchSection from "@/components/SearchSection";
import { getAllAccountRecordsAction } from "@/app/api/accounts/action/account";
import { getAllAccountTypeRecordsAction } from "@/app/api/accounts/action/accountType";
import { getAccountTypeEntriesByIDAction, getAllAccountTypeEntriesAction } from "@/app/api/accounts/action/accountTypeEntries";
import { getAllUsersAction } from "@/app/api/users/action/user";

// end login init 

export default async function Accounts({searchParams}) {

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
  
    // get all account
    let records = await getAllAccountRecordsAction(searchTermValue, offset, limit);
    const {data, total_count} = records.returnData;
    const accountsRecord = data || [];
        
    // get all account types
    records = await getAllAccountTypeRecordsAction(searchTermValue, 0, 1000);
    let allAccountsTypeRecord = records.returnData.data;

    // get all users
    records = await getAllUsersAction(searchTermValue);
    let usersRecord = records.data;


    
    const breadcrumbItems = [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Accounts", href: "/accounts" }
    ];

    if (isLogin == true) {
    }
    else {
      redirect('/login')
    }


  return (
    <div className=" w-full">

      <div>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex items-center gap-2">
      <OpenAccounts  className="mr-2" allAccountsTypeRecord={allAccountsTypeRecord} contactsRecords={usersRecord}/>
      
      
        <SearchSection/>

      </div>

      {
        accountsRecord.length > 0
          ?
          <AccountTable rows={accountsRecord} totalCount={total_count} limit={limit} allAccountsTypeRecord={allAccountsTypeRecord} contactsRecords={usersRecord}/>
          :
          <div className="p-4 text-center text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
            Account records not found.
          </div>
      }
    
    </div>


    </div>
  );
}
