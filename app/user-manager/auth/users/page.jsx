import Breadcrumbs from "@/components/usermanager/Breadcrumbs";
import UsersListingButtons from "@/components/usermanager/UsersListingButtons";

import Image from "next/image";
import Link from "next/link";


export default async function UserManagerHome() {
  const actionData = [
    { value: 'Inactive', selected: false },
    { value: 'Delete', selected: false }, 
  ];

  let userData = [
    { first_name:'Muhammad', 
      last_name:'Zubair', 
      email:'zubair@zubair.com', 
      designation: 'Bid Manager',
      user_role:'123-123-1234', 
      created_on:'12/11/2024', 
      last_login_at: '3/15/2024 6:30 PM',
      active:true, 
       },

       { first_name:'Muhammad', 
       last_name:'Raza', 
       email:'raza@raza.com', 
       designation: 'Tech Manager',
       user_role:'123-123-1234', 
       created_on:'12/11/2024', 
       last_login_at: '3/15/2024 6:30 PM',
       active:true, 
        },
      
     
  ];
  
  
  const breadcrumbItems = [
    { label: "Home", href: "/dashboard/auth/members" },
    { label: "Manage Users", href: "/dashboard/auth/members" },   
  ];

  const closeModal = (e)=>{
    
  }

  return (
      <div className=" w-full">  
        <div className="flex w-full">
          <Breadcrumbs items={breadcrumbItems}/>        
        </div>      
        <div className="grid grid-cols-1 gap-10 flex-[2]"> 
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-[#F2F4F6] dark:bg-gray-900">
                    <div>                        
                        <select className="text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                          <option>Select Action</option>
                          {actionData.map((item, index) => (
                            <option value={item.value} selected={item.selected ? true : ''} key={index}>{item.value}</option>
                          ))}
                        </select>
                    </div>
                    <label for="table-search" class="sr-only">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                    </div>
                </div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-black-700 uppercase bg-[#F8FAFB] dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-5">
                                <div class="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                              User
                            </th>
                              <th scope="col" class="px-6 py-3">
                              Designation
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Role
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Last Login At
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      {userData.map((item, index) => (                            
                          
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                            <td class="w-4 p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <div class="">
                                    <div class="text-base font-semibold"><Link href={'/dashboard/auth/register'}>{item.first_name + ' ' + item.last_name}</Link></div>
                                    <div class="font-normal text-gray-500">{item.email}</div>
                                </div>  
                            </th>   
                            <td class="px-6 py-4">
                              {item.designation}
                            </td>
                            <td class="px-6 py-4">
                              {item.user_role}
                            </td>
                            <td class="px-6 py-4">
                              {item.last_login_at}
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">                                    
                                    {item.active === true 
                                    ?                                  
                                    (<div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> ) 
                                    : 
                                    <div class="h-2.5 w-2.5 rounded-full bg-gray-400 me-2"></div> 
                                      
                                    }
                                    {item.tenant_status}
                                </div>
                            </td>
                            <td class="px-6 py-4">
                               <UsersListingButtons />
                            </td>
                        </tr>
                      ))}                    
                      
                    </tbody>
                </table>
            </div>
          </div>
       
      </div>
  );
};

