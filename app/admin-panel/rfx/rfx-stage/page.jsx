import { getAllRfxPrereqRecordsAction } from "@/app/api/admin-panel/actions/rfx";
import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import Link from "next/link";
import RfxPrereqAddNewButton from "../components/RfxPrereqAddNewButton";
import RfxPrereqListingButtons from "../components/RfxPrereqListingButtons";
import DeleteAllRFxStagesButton from "../components/DeleteAllRFxStages";

// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
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
  let records = await getAllRfxPrereqRecordsAction("rfx_stage", apiBackendURL, tokens, tenantID);
  let allRecords = records.returnData;

  const breadcrumbItems = [
    { label: "Home", href: "/admin-panel" },
    { label: "Rfx Stage", href: "/admin-panel/rfx/rfx-stage" },
  ];

  return (
    <div className=" w-full">
      <div className="flex w-full justify-between mb-2">
        <Breadcrumbs items={breadcrumbItems} />
        <RfxPrereqAddNewButton 
          buttonName={"rfx_stage"} 
          buttonType={"new"} 
          apiBackendURL={apiBackendURL}
          tenantID={tenantID}
          tokens={tokens}
        />
      </div>

      <div class="card">
        <div className="flex justify-between ">
          <div className=" ">
            <h5 class="card-header">Rfx Stage List</h5>
          </div>
          <div className="mt-3 mr-2 ">{<DeleteAllRFxStagesButton />}</div>
        </div>
        <div class="table-responsive text-nowrap">
          <table class="table">
            <thead class="table-light">
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Alias</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              {allRecords &&
                allRecords.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div class="flex items-center">
                        <div class="form-check ">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck3"
                            checked=""
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div class="font-normal text-secondary">
                            {item.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.is_active ? "Active" : "Inactive"}</td>
                    <td>{item.alias}</td>
                    <td>
                      <RfxPrereqListingButtons
                        propsData={item}
                        tablename={"rfx_stage"}
                        id={item.rfx_stage_id}
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
