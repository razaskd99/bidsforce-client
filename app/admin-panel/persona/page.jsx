import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import Link from "next/link";
import PersonaAddNewButton from "./components/PersonaAddNewButton";
import PersonaInfoModal from "./components/PersonaInfoModal";
import PersonaListingButtons from "./components/PersonaListingButtons";

// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
import { getAllPersonaRecordsAction } from "@/app/api/admin-panel/actions/persona";
// end login init 

export default async function AdminPanelDesignation() {
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
  let records = await getAllPersonaRecordsAction(apiBackendURL, tokens, tenantID);
  let allRecords = records.returnData;

  const breadcrumbItems = [
    { label: "Home", href: "/admin-panel" },
    { label: "Bid Validity", href: "/admin-panel/rfx/bid-validity" },
  ];

  return (
    <div className=" w-full">
      <div className="flex w-full justify-between mb-2">
        <Breadcrumbs items={breadcrumbItems} />
        <PersonaAddNewButton 
          buttonName={"persona"} 
          buttonType={"new"} 
          apiBackendURL={apiBackendURL}
          tenantID={tenantID}
          tokens={tokens}
        />
      </div>

      <div className="card">
        <div className="flex justify-between ">
          <div className=" ">
            <h5 className="card-header">Bid Validity List</h5>
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
      </div>
    </div>
  );
}
