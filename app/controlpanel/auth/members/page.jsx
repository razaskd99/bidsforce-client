import { getAllTenantRecordsAction } from "@/app/api/controlpanel/actions/controlpanel";
import getConfig from "next/config";
import Breadcrumbs from "@/components/controlpanel/Breadcrumbs";
import TenantListingButtons from "@/components/controlpanel/TenantListingButtons";
import Image from "next/image";
import Link from "next/link";
import { redirect } from 'next/navigation'

export default async function ControlPanelHome() {
  const { serverRuntimeConfig } = getConfig() || {};

  let isLogin=false
  // get server side global store data
  if (serverRuntimeConfig) {
      isLogin = serverRuntimeConfig.IS_LOGIN;
  }


  const actionData = [
    { value: "Active", selected: false },
    { value: "Inactive", selected: false },
    { value: "Delete", selected: false },
  ];

  let accessToken = "";
  let apiBackendURL = "";
  let tenantID = 0;
  // get server side global store data
  if (serverRuntimeConfig) {
    // get api backend url
    apiBackendURL = serverRuntimeConfig.API_BACKEND_SERVER;
    // get access token
    accessToken = serverRuntimeConfig.API_ACCESS_TOKEN_SERVER;
    tenantID = serverRuntimeConfig.TENANT_ID;
  }

  // call all tenant action
  let records = await getAllTenantRecordsAction(apiBackendURL, accessToken);
  let tenantData = records.tenantData;

  const breadcrumbItems = [
    { label: "Control Panel", href: "/controlpanel/auth/members" },
    { label: "Home", href: "/controlpanel/auth/members" },
  ];

  return (
    <div className=" w-full">
      <div className="flex w-full justify-between mb-2">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div class="card">
        <h5 class="card-header">Users List</h5>
        <div class="table-responsive text-nowrap">
          <table class="table">
            <thead class="table-light">
              <tr>
                <th>Tenant</th>
                <th>Created on</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              {tenantData &&
                tenantData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div class="flex">
                        <div class="form-check ">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck3"
                            checked=""
                          />
                        </div>
                        <div>
                          <div class=" ">
                            <div class="text-black font-semibold ">
                              <Link href={"/controlpanel/new-tenant"}>
                                {item.tenant_title}
                              </Link>
                            </div>
                            <div class="font-normal text-gray-500">
                              {item.domain_url}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.created_on}</td>
                    <td>{item.contact_email}</td>
                    <td>{item.contact_phone}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        {item.tenant_is_active === true ? (
                          <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                        ) : item.tenant_status === "Inactive" ? (
                          <div class="h-2.5 w-2.5 rounded-full bg-gray-400 me-2"></div>
                        ) : (
                          <div class="h-2.5 w-2.5 rounded-full bg-orange-500 me-2"></div>
                        )}
                        {item.tenant_status}
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <TenantListingButtons
                        tenantData={item}
                        accessToken={accessToken}
                        apiBackendURL={apiBackendURL}
                        tenant_id={item.tenant_id}
                      />
                    </td>

                    {/* {<td>
                      <UserListingButtons
                        apiBackendURL={apiBackendURL}
                        accessToken={accessToken}
                        tenantID={tenantID}
                        user_id={item.user_id}
                        userDetail={item}
                      />
                    </td>} */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
