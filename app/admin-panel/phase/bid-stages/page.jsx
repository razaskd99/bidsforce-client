import {
  getAllPhaseStageRecordsAction,
  getAllPhaseStageRecordsByTypeAction,
} from "@/app/api/admin-panel/actions/phaseStages";
import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import Link from "next/link";
import PhaseStagesAddNewButton from "../components/PhaseStagesAddNewButton";
import PhaseStageListingButtons from "../components/PhaseStageListingButtons";

// start for login check
import getConfig from "next/config";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getFullDomainName } from "@/app/api/util/loginHandle";
let isLogin = false;
// end for login check

export default async function AdminPanelDesignation() {
  const { serverRuntimeConfig } = getConfig() || {};

  // get server side global store data
  if (serverRuntimeConfig) {
    isLogin = serverRuntimeConfig.IS_LOGIN;

    // start check login
    let homeURL = getFullDomainName(headers);
    isLogin = serverRuntimeConfig.IS_LOGIN;
    if (!isLogin) {
      redirect(homeURL + "login");
    }
    // end check login
  }

  // call all stages by type action
  let records = await getAllPhaseStageRecordsByTypeAction("bid stage");
  let allRecords = records.returnData;

  const breadcrumbItems = [
    { label: "Home", href: "/admin-panel" },
    { label: "Bid Stages", href: "/admin-panel/phase/bid-stages" },
  ];

  const totalScore = allRecords.reduce(
    (total, record) => total + record.score,
    0
  );

  const customLayout = false;

  return (
    <div className=" w-full">
      <div className="flex w-full justify-between mb-2">
        <Breadcrumbs items={breadcrumbItems} />
        <PhaseStagesAddNewButton
          typeName={"bid stage"}
          buttonType={"new"}
          customLayout={customLayout}
        />
      </div>

      <div class="card">
        <h5 class="card-header">Bid Stages List</h5>
        <div class="table-responsive text-nowrap">
          <table class="table">
            <thead class="table-light">
              <tr>
                <th>Name</th>
                <th>Display As</th>
                <th>Order</th>
                <th>Score %</th>
                <th>Status</th>
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
                            {item.default_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.new_name ? item.new_name : "Not Assigned"}</td>
                    <td>{item.display_order}</td>
                    <td>{item.score}</td>
                    <td>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <span class=" text-sm font-medium text-gray-900 dark:text-gray-300">
                          {item.required ? "Enabled" : "Disabled"}
                        </span>
                      </label>
                    </td>
                    <td>
                      <PhaseStageListingButtons
                        propsData={item}
                        typeName={"bid stage"}
                        id={item.bidding_phases_id}
                        customLayout={customLayout}
                      />
                    </td>
                  </tr>
                ))}

              <tr key={allRecords.length + 1}>
                <td></td>
                <td></td>
                <td></td>
                <td className="font-bold">{totalScore} %</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
