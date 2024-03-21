"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import DatePickerInput from "@/components/DatePickerInput";
import { useRouter } from "next/navigation";
import { loadPostData } from "@/app/api/rfx/actions/rfx";
import { redirect } from "next/navigation";
import {
  formatDatetime,
  hideMainLoader102,
  showMainLoader102,
} from "@/app/api/util/utility";

const CreateRfx = ({ data }) => {
  hideMainLoader102();

  const router = useRouter();

  let date = new Date().toLocaleDateString();

  const [opportunityData, setOpportunityData] = useState([
    { name: "RFx ID", value: "Not Assigned", id: "rfx_id" },
    { name: "BID ID", value: "Not Assigned", id: "bid_id" },

    { name: "CRM ID", value: data.crm_id, id: "crm_id" },
    { name: "Opportunity Title", value: data.title, id: "opportunity_title" },

    { name: "Customer", value: data.customer_name, id: "customer" },
    { name: "Stage", value: data.stage, id: "stage" },

    { name: "End User", value: data.end_user_name, id: "end_user" },
    { name: "Opportunity Type", value: data.type, id: "opportunity_type" },

    { name: "Region", value: data.region, id: "region" },
    { name: "Industry Code", value: data.industry_code, id: "industry_code" },

    { name: "Business Unit", value: data.business_unit, id: "business_unit" },
    { name: "Project Type", value: data.project_type, id: "project_type" },

    { name: "Competition", value: data.competition, id: "competition" },
    {
      name: "Total Opportunity Value ($)",
      value: data.total_value,
      id: "total_opportunity_value",
    },
    {
      name: "Gross Profit (%)",
      value: data.gross_profit_percent,
      id: "gross_profit_percent",
    },
    {
      name: "Opportunity Probability",
      value: data.probability,
      id: "opportunity_probability",
    },

    {
      name: "Delivery Duration",
      value: data.delivery_duration,
      id: "delivery_duration",
    },
    {
      name: "Gross Profit Value",
      value: data.gross_profit_value,
      id: "gross_profit_value",
    },
    {
      name: "Opportunity Forecasted",
      value: data.forcasted,
      id: "opportunity_forecasted",
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
    console.log(opportunityData);
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
    //alert()
    let rfxTempData = {
      rfx_id: document.getElementById("rfx_id").value,
      bid_id: document.getElementById("bid_id").value,
      crm_id: document.getElementById("crm_id").value,
      opportunity_title: document.getElementById("opportunity_title").value,
      customer: document.getElementById("customer").value,
      stage: document.getElementById("stage").value,
      end_user: document.getElementById("end_user").value,
      opportunity_type: document.getElementById("opportunity_type").value,
      region: document.getElementById("region").value,
      industry_code: document.getElementById("industry_code").value,
      business_unit: document.getElementById("business_unit").value,
      project_type: document.getElementById("project_type").value,
      competition: document.getElementById("competition").value,
      total_opportunity_value: document.getElementById(
        "total_opportunity_value"
      ).value,
      gross_profit_percent: document.getElementById("gross_profit_percent")
        .value,
      opportunity_probability: document.getElementById(
        "opportunity_probability"
      ).value,
      delivery_duration: document.getElementById("delivery_duration").value,
      gross_profit_value: document.getElementById("gross_profit_value").value,
      opportunity_forecasted: document.getElementById("opportunity_forecasted")
        .value,
      description: document.getElementById("description").value,
      expected_award_date: getPickerValue("expected_award_date"),
      expected_rfx_date: getPickerValue("expected_rfx_date"),
      opportunity_id: data.opportunity_id,
    };

    function getPickerValue(pickerId) {
      let datePickerContainer = document.getElementById(pickerId);
      let inputElement = datePickerContainer.querySelector("input");
      return inputElement.value;
    }

    loadPostData(rfxTempData);
    router.push("/rfx/newfx");
  };

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="bg-white p-8">
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
                  <textarea
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    value={item.value}
                    rows={4}
                    name={item.name}
                    id={item.id}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    value={item.value}
                    name={item.name}
                    id={item.id}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                  />
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
                  <DatePickerInput
                    data={[
                      {
                        label: "Expected award date",
                        predate: data,
                        id: "expected_award_date",
                      },
                    ]}
                    className="w-full"
                  />
                </span>
              </div>
              <div className="border-b border-[#E8ECEF] w-[90%] m-auto"></div>
              <div className="bg-[#F4FCFD] px-4 py-5">
                <span className="text-[#778CA2] block">Expected RFx date</span>
                <span>
                  <DatePickerInput
                    data={[
                      {
                        label: "Expected RFx date",
                        predate: data,
                        id: "expected_rfx_date",
                      },
                    ]}
                    className="w-full"
                  />
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
