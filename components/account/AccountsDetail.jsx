"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loadPostData } from "@/app/api/rfx/actions/rfx";
import {
  formatDateString,
  hideMainLoader102,
  showMainLoader102,
} from "@/app/api/util/utility";
import NewAccounts from "./NewAccounts";
import { Edit, Edit2Icon } from "lucide-react";

const AccountsDetail = ({ data, allAccountsTypeRecord, contactsRecords, accountTypeEntries }) => {

  hideMainLoader102();

  const router = useRouter();

  let date = new Date().toLocaleDateString();

  const [accountData, setAccountData] = useState([
 

    { name: "Account ID", value: data.account_number, id: "account_number", style: { color: "#26BADA" } },
    { name: "Account Name", value: data.account_name, id: "account_name" },

    { name: "Account Type", value: accountTypeEntries.map(entry => entry.name).join(' , '), id: "type_name" },
    { name: "Street", value: data.street, id: "street" },

    { name: "State", value: data.state, id: "state" },
    { name: "City", value: data.city, id: "city" },
    { name: "Postal Code", value: data.postal_code, id: "postal_code" },

    { name: "Country", value: data.country, id: "country" },
   
  ]);
  

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" }, 
    { label: "Accounts", href: "/accounts"},
    { label: data.account_name, href: "/accounts/edit/" + data.account_id },
    
  ];

  const handleUpdateAccount =()=>{
    
  }
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

   
  const handleRowClick = () => {
      router.push(`/accounts`);
    
  };

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      <div className="bg-white p-8">
      <p className="text-md text-[#26BADA] flex items-center gap-1 cursor-pointer w-[150px]" onClick={handleClickOpen} >
            Edit Account <Edit/>
        </p>
        <NewAccounts isOpen={open} handleClose={handleClose} modalData={data} allAccountsTypeRecord={allAccountsTypeRecord} contactsRecords={contactsRecords} accountTypeEntries={accountTypeEntries} modalType='edit'/> 
        <div className="flex w-full">
          <form className="grid  gap-4 p-4 flex-[2]">
            {accountData.map((item, index) => (
              item.value && <div
                className={`mt-3 ${
                  item.name === "Description" ? "col-span-2" : ""
                }`}
                key={index}
              >
                <span className=" block text-[#778CA2]">{item.name}</span>
                {item.name === "Description" ? (
                  <p
                    className="outline-1 outline-gray-300 w-full"
                    rows={4}
                  >{item.value}</p>
                ) : (
                  item.id === "account_number" 
                  ?
                  <span
                    className="outline-1 outline-gray-300 w-full cursor-pointer"
                    style = {item.style ? {color: item.style.color} : {color:""} }
                    onClick={handleRowClick}
                  >{item.value}</span>
                  :
                  <span
                    className="outline-1 outline-gray-300 w-full"
                    style = {item.style ? {color: item.style.color} : {color:""} }
                  >{item.value}</span>

                )}
              </div>
            ))}
          </form>
          <div className="flex-[1] flex flex-col">
            
            <div className="border mt-[18px] mb-3 rounded-md">
              <div className="bg-[#00000005] py-2 px-[14px] ">
                {" "}
                Critical Dates
              </div>
              <div className="bg-[#F4FCFD] px-4 py-5 ">
                <span className="text-[#778CA2] block">
                  Account Created
                </span>
                <span>
                  {formatDateString(data.created_at)}
                </span>
              </div>
              
            </div>
            <div className="border mb-3 rounded-md">
              <div className="bg-[#00000005] py-2 px-[14px] ">
                Account Owner
              </div>
              <div className="bg-[#F4F5F6] px-4 py-5 flex  items-center gap-4">
                <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center">
                  <img
                    src={data.profile_image ? data.profile_image : "/avatar.png"} 
                    width={38}
                    height={38}
                    alt="man"
                    className="rounded-[100%] object-cover w-[38px] h-[38px]"
                  />
                  <div className="">
                    <span className="text-sm leading-4">{data.owner_name}</span>
                    <span className="text-sm leading-4 text-[#778CA2] block">
                      {data.job_title}
                    </span>
                  </div>
                </div>
                
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountsDetail;