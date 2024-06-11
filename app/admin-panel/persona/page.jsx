import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import Link from "next/link";
import PersonaAddNewButton from "./components/PersonaAddNewButton";
import PersonaInfoModal from "./components/PersonaInfoModal";
import PersonaListingButtons from "./components/PersonaListingButtons";
import PersonaTable from './components/PersonaTable'
import SearchSection from '@/components/SearchSection'

// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
import { getAllPersonaRecordsAction } from "@/app/api/admin-panel/actions/persona";
import Pagination from "@/components/pageniation-util/pagination";
// end login init 

export default async function AdminPanelDesignation({searchParams}) {
  // search term
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

  // get all persona
  let records = await getAllPersonaRecordsAction(searchTermValue, offset, limit, apiBackendURL, tokens, tenantID);
  const allRecords = records?.returnData?.data || [];
  const total_count = records?.returnData?.total_count || 0;
  const totalPages = Math.ceil(total_count / limit)


  const breadcrumbItems = [
    { label: "Home", href: "/admin-panel" },
    { label: "Persona", href: "/admin-panel/persona" },
  ];

  return (
    <div className=" w-full">
      <div className="">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-center justify-items-end	 gap-2">
          <PersonaAddNewButton 
            buttonName={"persona"} 
            buttonType={"new"} 
            apiBackendURL={apiBackendURL}
            tenantID={tenantID}
            tokens={tokens}
          />        

          <SearchSection/>
        </div>
      </div>
      {/*<div className="card">
        <div className="flex justify-between ">
          <div className=" ">
            <h5 className="card-header">Persona List</h5>
          </div>
          <div className="mt-3 mr-2 ">{'Delete All BUtton'}</div>
        </div>
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {allRecords &&
                allRecords.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center">
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck3"
                            checked=""
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="font-normal text-secondary">
                            {item.persona_role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.is_active ? "Active" : "Inactive"}</td>
                    <td>{item.description}</td>
                    <td>
                      <PersonaListingButtons
                        propsData={item}
                        id={item.persona_id}
                        apiBackendURL={apiBackendURL}
                        tenantID={tenantID}
                        tokens={tokens}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>*/}

        <div>
          <PersonaTable allRecords={allRecords} apiBackendURL={apiBackendURL} tenantID={tenantID} tokens={tokens}/>       
        </div> 

        <div className=" flex justify-center mt-20"> 
          <Pagination totalPages={totalPages} />
        </div>
    </div>
  );
}
