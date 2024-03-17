import { getAllTenantRecordsAction } from "@/app/api/controlpanel/actions/controlpanel";
import Breadcrumbs from "@/components/controlpanel/Breadcrumbs";
import TenantListingButtons from "@/components/controlpanel/TenantListingButtons";
import Image from "next/image";
import Link from "next/link";
import { getToken } from "@/app/api/util/script";


// start for login check
import getConfig from "next/config";
import { redirect } from "next/navigation";
let isLogin = false;
// end for login check

export default async function ControlPanelHome() {
  
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

  if (isLogin == true) {
  }
  else {
    redirect('/login')
  }

  const actionData = [
    { value: "Active", selected: false },
    { value: "Inactive", selected: false },
    { value: "Delete", selected: false },
  ];

 
  // call all tenant action
  let records = await getAllTenantRecordsAction(apiBackendURL, tokens);
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

      <div className="card">
        <h5 className="card-header">Users List</h5>
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead className="table-light">
              <tr>
                <th>Tenant</th>
                <th>Created on</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {tenantData &&
                tenantData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex">
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck3"
                            checked=""
                          />
                        </div>
                        <div>
                          <div className=" ">
                            <div className="text-black font-semibold ">
                              <Link href={"/controlpanel/new-tenant"}>
                                {item.tenant_title}
                              </Link>
                            </div>
                            <div className="font-normal text-gray-500">
                              {item.domain_url}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.created_on}</td>
                    <td>{item.contact_email}</td>
                    <td>{item.contact_phone}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {item.tenant_is_active === true ? (
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                        ) : item.tenant_status === "Inactive" ? (
                          <div className="h-2.5 w-2.5 rounded-full bg-gray-400 me-2"></div>
                        ) : (
                          <div className="h-2.5 w-2.5 rounded-full bg-orange-500 me-2"></div>
                        )}
                        {item.tenant_status}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <TenantListingButtons
                        tenantData={item}
                        accessToken={tokens}
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
