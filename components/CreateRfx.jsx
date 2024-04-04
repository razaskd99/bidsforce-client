"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuRefreshCcw, LuFileEdit } from "react-icons/lu";
import DatePickerInput from "@/components/DatePickerInput";
import { useRouter } from "next/navigation";
import { loadPostData } from "@/app/api/rfx/actions/rfx";
import { redirect } from "next/navigation";
import {
  formatDateString,
  formatDatetime,
  hideMainLoader102,
  showMainLoader102,
} from "@/app/api/util/utility";
import { Label } from "@mui/icons-material";

const CreateRfx = ({ data }) => {
  hideMainLoader102();

  const router = useRouter();

  let date = new Date().toLocaleDateString();

  const [opportunityData, setOpportunityData] = useState([
 

    { name: "Opportunity Number", value: data.crm_id, id: "crm_id" },
    { name: "Opportunity Name", value: data.title, id: "opportunity_title" },

    { name: "Customer", value: data.customer_name, id: "customer" },
    { name: "Opportunity Sales Stage", value: data.stage, id: "stage" },

    { name: "End User", value: data.end_user_name, id: "end_user" },
    { name: "Opportunity Type", value: data.type, id: "opportunity_type" },

    { name: "Region", value: data.region, id: "region" },
    {
      name: "Opportunity Industry",
      value: data.industry_code,
      id: "industry_code",
    },

    {
      name: "Opportunity Business Line",
      value: data.business_unit,
      id: "business_unit",
    },
    { name: "Project Type", value: data.project_type, id: "project_type" },

    {
      name: "Total Opportunity Value ($)",
      value: data.total_value,
      id: "total_opportunity_value",
    },
    
    {
      name: "Opportunity Committed for Sales Budget",
      value: data.forcasted  == false ? "No" : "Yes",
      id: "opportunity_forecasted",
    },
    {
      name: "End User Project",
      value: data.end_user_project,
      id: "end_user_project",
    },
    {
      name: "Opportunity Currency",
      value: data.opportunity_currency,
      id: "opportunity_currency ",
    },
    {
      name: "Sales Persuit Progress",
      value: data.sales_persuit_progress,
      id: "sales_persuit_progress",
    },
    {
      name: "Opportunity Owner",
      value: data.opportunity_owner,
      id: "opportunity_owner",
    },
    {
      name: "Bidding Unit",
      value: data.bidding_unit,
      id: "bidding_unit",
    },
    {
      name: "Description",
      value: data.description,
      id: "description",
    },
  ]);
  const handleValueChange = (index, newValue) => {
    const updatedData = [...opportunityData];
    updatedData[index].value = newValue;
    setOpportunityData(updatedData);
  };

  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "CRM Opportunities", href: "/opportunities" },
    {
      label: data["title"],
      href: "#",
      inactiveClass: "text-black cursor-default",
    },
  ];

  const postValues = (e) => {
    e.preventDefault();
    showMainLoader102();


    loadPostData(data.opportunity_id);
    router.push("/rfx/newfx");
  };

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      <div className="bg-white p-8">
      <Link href={"/opportunities/edit/" + data.opportunity_id} className="flex text-[#26BADA] font-bold py-2 px-4 w-20 "><LuFileEdit style={{width: '40px', height: '40px'}}/>   </Link>

        <div className="flex w-full">
          <form className="grid grid-cols-2 gap-4  p-4 flex-[2]">
            {opportunityData.map((item, index) => (
              <div
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
                  <span
                    className="outline-1 outline-gray-300 w-full"
                    //onChange={(e) => handleValueChange(index, e.target.value)}
                  >{item.value}</span>

                )}
              </div>
            ))}
          </form>
          <div className="flex-[1] flex flex-col">
            <div className="flex items-center gap-3 mt-[-16px]">
              <span className="text-[#778CA2]">
                Last Updated: {formatDatetime(data.last_updated_at)}
              </span>
              <span className="text-[#26BADA]">
                <LuRefreshCcw />
              </span>
            </div>
            <Link
              onClick={(e) => {
                postValues(e);
              }}
              href="#"
              // /rfx/newfx
              className="text-white text-center bg-[#26BADA] py-3 mt-[10px] mb-[18px]] rounded-md"
            >
              LOG FX
            </Link>
            <div className="border mt-[18px] mb-3 rounded-md">
              <div className="bg-[#00000005] py-2 px-[14px] ">
                {" "}
                Critical Dates
              </div>
              <div className="bg-[#F4FCFD] px-4 py-5 ">
                <span className="text-[#778CA2] block">
                  Expected award date
                </span>
                <span>
                  {formatDateString(data.expected_award_date)}
                </span>
              </div>
              <div className="border-b border-[#E8ECEF] w-[90%] m-auto"></div>
              <div className="bg-[#F4FCFD] px-4 py-5">
                <span className="text-[#778CA2] block">Expected RFx date</span>
                <span>
                  {formatDateString(data.expected_rfx_date)}
                </span>
              </div>
            </div>
            <div className="border mb-3 rounded-md">
              <div className="bg-[#00000005] py-2 px-[14px] ">
                Opportunity Contacts
              </div>
              <div className="bg-[#F4F5F6] px-4 py-5 flex  items-center gap-4">
                <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center">
                  <Image
                    src="/man.jpeg"
                    width={38}
                    height={38}
                    alt="man"
                    className="rounded-[100%] object-cover w-[38px] h-[38px]"
                  />
                  <div className="">
                    <span className="text-sm leading-4">Michael Gates</span>
                    <span className="text-sm leading-4 text-[#778CA2] block">
                      Account Manager
                    </span>
                  </div>
                </div>
                <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 ">
                  Sales Person
                </div>
                <div className="flex flex-[1]"></div>
              </div>

              <div className="bg-[#F4F5F6] px-4 py-5 flex  items-center gap-4">
                <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center ">
                  <Image
                    src="/man.jpeg"
                    width={38}
                    height={38}
                    alt="man"
                    className="rounded-[100%] object-cover w-[38px] h-[38px]"
                  />
                  <div className="">
                    <span className="text-sm leading-4 w-8">John Smith</span>
                    <span className="text-sm leading-4 text-[#778CA2] block">
                      Buyer
                    </span>
                  </div>
                  <div className="bg-red-300 text-xs px-1 ml-2 text-white">
                    E
                  </div>
                </div>
                <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 ">
                  Buyer
                </div>
                <div className="flex flex-[1]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRfx;
