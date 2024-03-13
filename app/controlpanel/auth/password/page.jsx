import Breadcrumbs from "@/components/controlpanel/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";

export default async function ChangePassword() {
  let changePassData = [
    { name: 'old_pass', lebal: 'Old Password', value: 'Old Password' },
    { name: 'new_pass', lebal: 'New Password', value: 'New Password' },
    { name: 'confirm_pass', lebal: 'Confirm Password', value: 'Confirm Password' },  
       
  ];

     
  const breadcrumbItems = [
    { label: "Control Penal", href: "/controlpanel" },
    { label: "Change Password", href: "/controlpanel/change-password" },   
  ];

  return (    
      <div className=" w-full">  
        <div className="flex w-full">
          <Breadcrumbs items={breadcrumbItems}/>        
        </div>      
        <form>        
          
          <h3 className="text-black uppercase font-bold text-2xl">Change Password</h3>
          <div className="grid grid-cols-1 gap-10 flex-[2]">        
            {changePassData.map((item, index) => (
              <div className={`mt-0 ${item.name === 'Description' ? 'col-span-2' : ''}`} key={index}>
                <span className=" block text-[#778CA2]">{item.lebal}</span>
                  <input
                    type="password"
                    name={item.name}
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-1/2"
                    value={item.value}                   
                  />
               </div>
            ))}
          </div>
        </form>
       
          <div className="flex-[1] flex flex-col my-5 w-1/2">
            <Link
              href="/controlpanel"
              className="text-white text-center uppercase bg-[#26BADA] py-3 mt-[10px] mb-[18px]] rounded-md"
            >
              Change Password
            </Link>
          </div>
       
      </div>
   
  );
};


