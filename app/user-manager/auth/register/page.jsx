import Breadcrumbs from "@/components/usermanager/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";

export default async function NewUser()  {
 
  const breadcrumbItems = [
    { label: "User Manager", href: "/user-manager/auth/Users" },
    { label: "Register User", href: "/user-manager/auth/register" },   
  ];

  return (
      <div className=" w-full">  
        <div className="flex w-full">
          <Breadcrumbs items={breadcrumbItems}/>        
        </div>      
          
          <h3 className="text-black uppercase font-bold text-2xl my-5">Organization Details</h3>
          <div className="w-full">  
            <form>
              <div className="grid grid-cols-2 gap-10 flex-[2]">          
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

              <h3 className="text-black uppercase font-bold text-2xl my-5">Personal Details</h3>
              <div className="grid grid-cols-2 gap-10 flex-[2]">          

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
                            
          </form>

          </div>
     
       
          <div className="flex-[1] flex flex-col mb-[30px] w-full content-center">
            <Link
              href="/dashboard/auth/members"
              className="text-white text-center uppercase bg-[#26BADA] hover:bg-[#32a2ba] py-3 mt-[25px] mb-[25px]] mx-auto rounded-md w-96"
            >
              Register User
            </Link>
          </div>
       
      </div>
  );
};

