import Breadcrumbs from "@/components/Breadcrumbs";
import SearchTable from "@/components/SearchTable";
import { IoIosSearch } from "react-icons/io";
import { getAllOppotunitiesRecords } from "@/app/api/opportunities/scripts";
import { getToken } from "@/app/api/util/script";
const axios = require('axios');

// start for login check
import getConfig from "next/config";
import { redirect } from "next/navigation";
let isLogin = false;
// end for login check


const Opportunitues = async () => {

  // get env variables
  const { serverRuntimeConfig } = getConfig() || {};
  let apiBackendURL = ''
  let username = ''
  let password = ''
  let tenantID = 0
  if (serverRuntimeConfig) {
    apiBackendURL = serverRuntimeConfig.API_BACKEND_SERVER
    username = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.user
    password = serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.pass
    tenantID = serverRuntimeConfig.TENANT_ID
    isLogin = serverRuntimeConfig.IS_LOGIN
  }

  // get token
  let res = await getToken(apiBackendURL, username, password)
  let tokens = res?.tokenData?.access_token

  // get opportunities call
  let opportunitiesRecords = await getAllOppotunitiesRecords(apiBackendURL, tokens, tenantID)

  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "New Rfx", href: "/rfx/new" },
    { label: "Opportunities", href: "#", inactiveClass: "text-black cursor-default" },

  ];

  if (isLogin == true) {
  }
  else {
    redirect('/login')
  }


  return (

    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="w-[260px] flex items-center justify-between rounded-2xl bg-white py-[6px] px-5 my-4 ml-auto">
        <input
          type="text"
          placeholder="Search within results"
          className="w-full text-black bg-transparent border-0 outline-none placeholder:text-[#778CA2] placeholder:text-sm"
        />
        <button>
          <IoIosSearch className="transform scale-x-[-1] text-[#778CA2]" />
        </button>
      </div>
      {
        opportunitiesRecords.length > 0
          ?
          <SearchTable rows={opportunitiesRecords} />
          :
          <div className="p-4 text-center text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
            Opportunity records are not found.
          </div>
      }

    </div>
  );
};

export default Opportunitues;


