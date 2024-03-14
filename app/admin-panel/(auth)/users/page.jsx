import { getAllUserRecordsAction } from "@/app/api/admin-panel/actions/user";
import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import UserListingButtons from "../../components/UserListingButtons";
import Link from "next/link";
import DeleteAllUsersButton from "./components/DeleteAllUsersButton";

// start for login check
import getConfig from "next/config";
import { redirect } from "next/navigation";
import { getToken } from "@/app/api/util/script";
let isLogin = false;
// end for login check
const axios = require('axios');

export default async function AdminPanelUsers() {

  // get env variables
  const { serverRuntimeConfig } = getConfig() || {};
  let apiBackendURL = ''
  let username = ''
  let password = ''
  let tenantID = 0
  if (serverRuntimeConfig) {
    apiBackendURL =serverRuntimeConfig.API_BACKEND_SERVER
    username =serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.user
    password =serverRuntimeConfig?.PRIVATE_ENCRIPTED_USER_DATA?.pass
    tenantID =serverRuntimeConfig.TENANT_ID
    isLogin =serverRuntimeConfig.IS_LOGIN
  }



  // get token
  let res = await getToken(apiBackendURL, username, password)
  let tokens = res?.tokenData?.access_token

  // call all tenant action
  let records = await getAllUserRecordsAction1(apiBackendURL, tokens, tenantID);
  let usersData = records.returnData;
  let error = records.error;

  const breadcrumbItems = [
    { label: "Home", href: "/admin-panel" },
    { label: "Users", href: "/admin-panel/users" },
  ];


  if (isLogin == true) {
  }
  else {
    redirect('/login')
  }


  return (
    <div className=" w-full">
    {error}
      <div className="flex w-full justify-between mb-2">
        <Breadcrumbs items={breadcrumbItems} />
        <Link
          href={"/admin-panel/users/register"}
          type="button"
          className="btn btn-sm btn-secondary waves-effect justify-between"
        >
          <span className="tf-icons mdi mdi-plus me-1"></span>New User
        </Link>
      </div>

      <div className="card">
        <div className="flex justify-between ">
          <div className=" ">
            <h5 className="card-header">Users List</h5>
          </div>
          <div className="mt-3 mr-2 ">
            <DeleteAllUsersButton />
          </div>
        </div>
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead className="table-light">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Last Login At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {usersData &&
                usersData.map((item, index) => (
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
                          <div className="text-base text-black ">
                            <Link
                              href={"/admin-panel/users"}
                              className="text-secondary"
                            >
                              {item.first_name + " " + item.last_name}
                            </Link>
                          </div>
                          <div className="font-normal text-secondary">
                            Designation
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
                    <td>{new Date(item.last_login_at).toLocaleString()}</td>
                    <td>
                      {item.active && (
                        <span className="badge text-success">Active</span>
                      )}
                      {!item.active && (
                        <span className="badge text-secondary">Inactive</span>
                      )}
                      {/* {!item.verified && (
                        <span className="badge text-warning">Pending</span>
                      )} */}
                    </td>
                    <td>
                      <UserListingButtons
                        apiBackendURL={apiBackendURL}
                        accessToken={tokens}
                        tenantID={tenantID}
                        user_id={item.user_id}
                        userDetail={item}
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


export const getAllUserRecordsAction1 = async (apiBackendURL, tokens, tenantID) => {


const url = `${apiBackendURL}auth/auth/users/tenant/${tenantID}`;

try {
  const response = await axios.get(url, {
    cache: "no-store",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${tokens}`,
    },
    timeout: 0, // Setting timeout to maximum value
  });

  // Check if the response status is in the range 200-299 (indicating success)
  if (response.status >= 200 && response.status < 300) {
    // Handle success
    return {
      statusCode: response.status,
      returnData: response.data,
      error: "Success",
    };
  } else {
    // Handle error
    return {
      statusCode: response.status,
      returnData: [],
      error: JSON.stringify(response.data), // You can stringify the response data for error message
    };
  }
} catch (error) {
  // Handle network errors or Axios-specific errors
  return {
    statusCode: 400, // or whatever status code you prefer for network errors
    returnData: [],
    error: error.message, // You can stringify the error object for error message
  };
}



};
