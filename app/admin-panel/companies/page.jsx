import { getAllCompanyRecordsAction } from "@/app/api/admin-panel/actions/user";
import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import Link from "next/link";
import CompanyListingButtons from "../components/CompanyListingButtons";
import AddNewButton from "../components/AddNewButton";
import Image from "next/image";
import DeleteAllCompaniesButton from "../components/DeleteAllCompaniesButton";

// start login init
import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from "@/app/setup";
import { getToken } from "@/app/api/util/script";
// end login init 

export default async function AdminPanelCompanies() {

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
        <AddNewButton buttonName={"company"} buttonType={"new"} tokens={tokens} apiBackendURL={apiBackendURL} tenantID={tenantID} />
      </div>

      <div className= "card">
        <div className="flex justify-between ">
          <div className=" ">
            <h5 className="card-header">Companies List</h5>
          </div>
          <div className="mt-3 mr-2 ">
            <DeleteAllCompaniesButton />
          </div>
        </div>
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead className="table-light">
              <tr>
                <th>Company</th>
                <th>Type</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Industry</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {usersData &&
                usersData.map((item, index) => (
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
                          <div className="text-base text-black ">
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
                          <div className="font-normal text-secondary">
                            {item.company_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.company_type}</td>
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
                      <CompanyListingButtons 
                        propsData={item} 
                        apiBackendURL={apiBackendURL} 
                        tokens={tokens} 
                        tenantID={tenantID}
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
