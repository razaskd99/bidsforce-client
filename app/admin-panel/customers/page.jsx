import { getAllCustomerRecordsAction } from "@/app/api/admin-panel/actions/user";
import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import Link from "next/link";
import CustomerListingButtons from "../components/CustomerListingButton";
import AddNewButton from "../components/AddNewButton";
import DeleteAllCustomerButton from "../rfx/components/DeleteAllCustomerButton";

// start for login check
import getConfig from "next/config";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getFullDomainName } from "@/app/api/util/loginHandle";
let isLogin = false;
// end for login check

export default async function AdminPanelCustomers() {
  const { serverRuntimeConfig } = getConfig() || {};

  // get server side global store data
  if (serverRuntimeConfig) {
    // start check login
    let homeURL = getFullDomainName(headers);
    isLogin = serverRuntimeConfig.IS_LOGIN;
    if (!isLogin) {
      redirect(homeURL + "login");
    }
    // end check login
  }

  // call all tenant action
  let records = await getAllCustomerRecordsAction();
  let allData = records.returnData;

  const breadcrumbItems = [
    { label: "Home", href: "/admin-panel" },
    { label: "Customers", href: "/admin-panel/customers" },
  ];

  return (
    <div className=" w-full">
      <div className="flex w-full justify-between mb-2">
        <Breadcrumbs items={breadcrumbItems} />
        <AddNewButton buttonName={"customer"} buttonType={"new"} />
      </div>

      <div class="card">
        <div className="flex justify-between ">
          <div className=" ">
            <h5 class="card-header">Customers List</h5>
          </div>
          <div className="mt-3 mr-2 ">
            <DeleteAllCustomerButton />
          </div>
        </div>
        <div class="table-responsive text-nowrap">
          <table class="table">
            <thead class="table-light">
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
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
                            {item.customer_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a
                        className="text-secondary"
                        href={"mailto:" + item.email}
                      >
                        {item.email}
                      </a>
                    </td>
                    <td>{item.phone}</td>
                    <td>{item.company_name}</td>
                    <td>
                      <CustomerListingButtons propsData={item} />
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
