'use client'
import React,{useState} from "react";
import Image from "next/image";
import Link from "next/link";

export default function TenantListingButtons(props) {
  const[openModal, setOpenModal] = useState(false);

  
  return (    
      <>  
        <button onClick={()=>setOpenModal(true)} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>      

        {openModal && 
        <>
            <div id="authentication-modal" class="show overflow-y-auto overflow-x-hidden fixed top-0 right-0 m-auto z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex">
                <div class="relative p-4 w-1/2 max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Edit User Details
                            </h3>
                            <button onClick={()=>setOpenModal(false)} type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" >
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div class="p-4 md:p-5">
                            <form class="space-y-4 pb-3" action="#">
                                <div className="grid grid-cols-2 gap-10 flex-[2] ">          
                                    <div class="mb-0">
                                    <label for="bid_team" class="block text-gray-600 text-sm font-medium mb-2">Bid Team</label>
                                    <select id="bid_team" name="bid_team" class="border border-gray-200 p-2 outline-1 outline-gray-300 w-full">
                                        <option>Select Bid Team</option>
                                        <option value="team1">Admin</option>
                                        <option value="team2">Bid</option>
                                        <option value="team3">Sales</option>                          
                                    </select>            
                                    </div>

                                    <div class="mb-0">
                                        <label for="designation_id" class="block text-gray-600 text-sm font-medium mb-2">Designation</label>
                                        <select id="designation_id" name="designation_id" class="border border-gray-200 p-2 outline-1 outline-gray-300 w-full" required>
                                            <option>Select Designation</option>
                                            <option value="designation1">Designation 1</option>
                                            <option value="designation2">Designation 2</option>
                                            <option value="designation3">Designation 3</option>                      
                                        </select>
                                    </div>

                                    <div class="mb-0">
                                        <label for="company_id" class="block text-gray-600 text-sm font-medium mb-2">Company Name</label>
                                        <select id="company_id" name="company_id" class="border border-gray-200 p-2 outline-1 outline-gray-300 w-full" required>
                                            <option>Select Company</option>
                                            <option value="company1">Company 1</option>
                                            <option value="company2">Company 2</option>
                                            <option value="company3">Company 3</option>                      
                                        </select>
                                    </div>

                                    <div class="mb-0">
                                        <label for="role_id" class="block text-gray-600 text-sm font-medium mb-2">User Role</label>
                                        <select id="role_id" name="role_id" class="border border-gray-200 p-2 outline-1 outline-gray-300 w-full" required>
                                            <option>Select Role</option>
                                            <option value="role1">Role 1</option>
                                            <option value="role2">Role 2</option>
                                            <option value="ro3e1">Role 3</option>                      
                                        </select>
                                    </div>

                                    <div class="mb-0">
                                        <label for="user_level" class="block text-gray-600 text-sm font-medium mb-2">User Role Level</label>
                                        <select id="user_level" name="user_level" class="border border-gray-200 p-2 outline-1 outline-gray-300 w-full" required>
                                            <option value="level1">Level 1</option>
                                            <option value="level2">Level 2</option>
                                            <option value="level3">Level 3</option>                      
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-10 flex-[2] mt-10 pt-4 border-t">
                                    <div class="mb-0">
                                        <label for="user_name" class="block text-gray-600 text-sm font-medium mb-2">User Name</label>
                                        <input type="text" id="user_name" name="user_name" class="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"  />
                                    </div>

                                    <div class="mb-0">
                                        <label for="email" class="block text-gray-600 text-sm font-medium mb-2">Email</label>
                                        <input type="email" id="email" name="email" class="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"  />
                                    </div>

                                    <div class="mb-0">
                                        <label for="first_name" class="block text-gray-600 text-sm font-medium mb-2">First Name</label>
                                        <input type="text" id="first_name" name="first_name" class="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"  />
                                    </div>

                                    <div class="mb-0">
                                        <label for="middle_name" class="block text-gray-600 text-sm font-medium mb-2">Middle Name</label>
                                        <input type="text" id="middle_name" name="middle_name" class="border border-gray-200 p-2 outline-1 outline-gray-300 w-full" />
                                    </div>

                                    <div class="mb-0">
                                        <label for="last_name" class="block text-gray-600 text-sm font-medium mb-2">Last Name</label>
                                        <input type="text" id="last_name" name="last_name" class="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"  />
                                    </div>

                                    <div class="mb-0">
                                        <label for="password" class="block text-gray-600 text-sm font-medium mb-2">Password</label>
                                        <input type="password" id="password" name="password" class="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"  />
                                    </div>
                                    
                                </div>
                                <div class="flex items-center">
                                    <button type="submit" onClick={()=>setOpenModal(false)} class="w-64 m-auto text-white uppercase bg-[#26BADA] hover:bg-[#32a2ba] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>                            
                                </div>
                            </form>
                        </div>
                    </div>
                </div>            
            </div>
            <div className="fixed inset-0 w-screen h-screen bg-gray-600 opacity-75 z-10"></div>
        </>
        } 
      </>   
  );
};


