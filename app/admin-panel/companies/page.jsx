import { getAllCompanyRecordsAction } from "@/app/api/admin-panel/actions/user";
import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import Link from "next/link";
import CompanyListingButtons from "../components/CompanyListingButtons";
import AddNewButton from "../components/AddNewButton";
import Image from "next/image";
import DeleteAllCompaniesButton from "../components/DeleteAllCompaniesButton";

// start for login check
import getConfig from "next/config";
import { redirect } from "next/navigation";
import { getToken } from "@/app/api/util/script";
let isLogin = false;
// end for login check

export default async function AdminPanelCompanies() {

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
  
  // call all tenant action
  let records = await getAllCompanyRecordsAction(apiBackendURL, tokens, tenantID);
  let usersData = records.returnData;

  const breadcrumbItems = [
    { label: "Home", href: "/admin-panel" },
    { label: "Companies", href: "/admin-panel/companies" },
  ];

  if (isLogin == true) {
  }
  else {
    redirect('/login')
  }


  return (
    <div className=" w-full">
      <div className="flex w-full justify-between mb-2">
        <Breadcrumbs items={breadcrumbItems} />
        <AddNewButton buttonName={"company"} buttonType={"new"} />
      </div>

      <div class="card">
        <div className="flex justify-between ">
          <div className=" ">
            <h5 class="card-header">Companies List</h5>
          </div>
          <div className="mt-3 mr-2 ">
            <DeleteAllCompaniesButton />
          </div>
        </div>
        <div class="table-responsive text-nowrap">
          <table class="table">
            <thead class="table-light">
              <tr>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Industry</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              {usersData &&
                usersData.map((item, index) => (
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
                          <div class="text-base text-black ">
                            {
                              <Image
                                src="/assets/img/icons/brands/asana.png"
                                alt="brand"
                                className="mr-2"
                                width={40}
                                height={40}
                              />
                            }
                          </div>
                          <div class="font-normal text-secondary">
                            {item.company_name}
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
                    <td>{item.industry}</td>
                    <td>
                      <CompanyListingButtons propsData={item} />
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
