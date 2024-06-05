import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import Link from "next/link";
import PersonaAddNewButton from "./components/FunctionalGroupAddNewButton";
import PersonaInfoModal from "./components/FunctionalGroupInfoModal";
import PersonaListingButtons from "./components/FunctionalGroupListingButtons";


// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
import { getAllFunctionalGroupAction } from "@/app/api/contacts/actions/functionalGroup";
import { formatDatetime } from "@/app/api/util/utility";
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
  let records = await getAllFunctionalGroupAction();
  let allRecords = records.returnData;

  const breadcrumbItems = [
    { label: "Home", href: "/admin-panel" },
    { label: "Functional Group", href: "/admin-panel/functional-group" },
  ];

  return (
    <div className=" w-full">
      <div className="flex w-full justify-between mb-2">
        <Breadcrumbs items={breadcrumbItems} />
        <PersonaAddNewButton 
          buttonName={"functional group"} 
          buttonType={"new"} 
          apiBackendURL={apiBackendURL}
          tenantID={tenantID}
          tokens={tokens}
        />
      </div>

      <div className="card">
        <div className="flex justify-between ">
          <div className=" ">
            <h5 className="card-header">Functional Group List</h5> 
          </div>
          <div className="mt-3 mr-2 ">{'Delete All BUtton'}</div>
        </div>
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Created On</th>
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
                            {item.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.active ? "Active" : "Inactive"}</td>
                    <td>{formatDatetime(item.created_at)}</td>
                    <td>
                      <PersonaListingButtons
                        propsData={item}
                        id={item.id}
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
