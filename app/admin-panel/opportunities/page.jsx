import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import OpportunityAddNewButton from "../components/OpportunityAddNewButton";
import OpportunityListingButtons from "../components/OpportunityListingButton";
import DeleteAllOpportunityButton from "../rfx/components/DeleteAllOpportunityBitton";
import { getAllOpportunityRecordsAction } from "@/app/api/admin-panel/actions/opportunity";


// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
// end login init 

export default async function AdminPanelOpportunities() {
  
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

  if (isLogin == true) {
  }
  else {
    redirect('/login')
  }

  // call all tenant action
  let records = await getAllOpportunityRecordsAction(apiBackendURL, tenantID, tokens);
  let allData = records.returnData;

  const breadcrumbItems = [
    { label: "Home", href: "/admin-panel" },
    { label: "Opportunities", href: "/admin-panel/opportunities" },
  ];

  return (
    <div className=" w-full">
      <div className="flex w-full justify-between mb-2">
        <Breadcrumbs items={breadcrumbItems} />
        <OpportunityAddNewButton
          buttonName={"opportunity"}
          buttonType={"new"}
          apiBackendURL={apiBackendURL} 
          tokens={tokens} 
          tenantID={tenantID}
        />
      </div>

      <div class="card">
        <div className="flex justify-between ">
          <div className=" ">
            <h5 class="card-header">Opportunities List</h5>
          </div>
          <div className="mt-3 mr-2 ">
            <DeleteAllOpportunityButton />
          </div>
        </div>
        <div class="table-responsive text-nowrap">
          <table class="table">
            <thead class="table-light">
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Company</th>
                <th>Value</th>
                <th>Project Type</th>
                <th>Award Date</th>
                <th>RFx Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              {allData &&
                allData.map((item, index) => (
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

                    <td>{item.type}</td>
                    <td>{item.company_name}</td>
                    <td>{item.total_value}</td>
                    <td>{item.project_type}</td>
                    <td>{item.expected_award_date}</td>
                    <td>{item.expected_rfx_date}</td>
                    <td>{item.status}</td>

                    <td>{
                      <OpportunityListingButtons 
                        propsData={item}  
                        apiBackendURL={apiBackendURL} 
                        tokens={tokens} 
                        tenantID={tenantID}
                      />}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
