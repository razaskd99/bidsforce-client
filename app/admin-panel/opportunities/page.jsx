import { getAllOpportunityRecordsAction } from "@/app/api/admin-panel/actions/opportunity";
import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import Link from "next/link";
import OpportunityAddNewButton from "../components/OpportunityAddNewButton";
import OpportunityListingButtons from "../components/OpportunityListingButton";
import DeleteAllOpportunityButton from "../rfx/components/DeleteAllOpportunityBitton";

// start for login check
import getConfig from 'next/config'
import { redirect } from 'next/navigation'
import { headers } from "next/headers";
import { getFullDomainName } from '@/app/api/util/loginHandle';
let isLogin = false
// end for login check


export default async function AdminPanelOpportunities() {
  const { serverRuntimeConfig } = getConfig() || {};

  let isLogin=false
  // get server side global store data
  if (serverRuntimeConfig) {
    // start check login
    let homeURL = getFullDomainName(headers)
    isLogin = serverRuntimeConfig.IS_LOGIN
    if (!isLogin) { redirect(homeURL + "login") }
    // end check login
  }


  // call all tenant action
  let records = await getAllOpportunityRecordsAction();
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

                    <td>{<OpportunityListingButtons propsData={item} />}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
