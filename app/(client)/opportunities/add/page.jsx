'use client'
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";

const DrpAutomation = () => {
  const [opportunityData, setOpportunityData] = useState([
    { name: 'RFx ID', value: 'Not Assigned' },
    { name: 'BID ID', value: 'Not Assigned' },

    { name: 'CRM ID', value: '75121' },
    { name: 'Opportunity Title', value: 'DRP Refinery Automation' },

    { name: 'Customer', value: 'Galaxy Petroleum Company' },
    { name: 'Stage', value: 'Budgetary' },

    { name: 'End User', value: 'Galaxy Petroleum Company' },
    { name: 'Opportunity Type', value: 'System' },

    { name: 'Region', value: 'Angola' },
    { name: 'Industry Code', value: 'O&G - Downstream' },

    { name: 'Business Unit', value: 'Energy Systems' },
    { name: 'Project Type', value: 'Upgrade' },

    { name: 'Competition', value: 'Sigma Systems, AWB Automation' },
    { name: 'Total Opportunity Value ($)', value: '$1,200,000' },
    { name: 'Gross Profit (%)', value: '8.7%' },
    { name: 'Opportunity Probability', value: 'A - 80%' },

    { name: 'Delivery Duration', value: 'Technical, Commercial, Commercial (Un-priced)' },
    { name: 'Gross Profit Value', value: '$105,000' },
    { name: 'Opportunity Forecasted', value: 'Yes' },
    {
      name: 'Description',
      value: 'Please address the technical and commercial (unpriced) bid to Sara Andrews. And can you please address the commercial bid to John Smith.',
    },
  ])
  const handleValueChange = (index, newValue) => {
    const updatedData = [...opportunityData];
    updatedData[index].value = newValue;
    setOpportunityData(updatedData);
  };

  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "CRM Opportunities", href: "/opportunities" },
    { label: " DRP Refinery Automation", href: "/opportunities/drp" },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="bg-white p-8">
        <div className="flex w-full">
          <form className="grid grid-cols-2 gap-4  p-4 flex-[2]">
            {opportunityData.map((item, index) => (
              <div className={`mt-3 ${item.name === 'Description' ? 'col-span-2' : ''}`} key={index}>
                <span className=" block text-[#778CA2]">{item.name}</span>
                {item.name === 'Description' ? (
                  <textarea
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    value={item.value}
                    rows={4}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    value={item.value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                  />
                )}
              </div>
            ))}
          </form>
          <div className="flex-[1] flex flex-col">
            <div className="flex items-center gap-3 mt-[-16px]">
              <span className="text-[#778CA2]">Last Updated: 26 Jul, 2021</span>
              <span className="text-[#778CA2]">10:00 AM</span>
              <span className="text-[#26BADA]">
                <LuRefreshCcw />
              </span>
            </div>
            <Link
              href="/rfx/newfx"
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
                <span>20 June 2021</span>
              </div>
              <div className="border-b border-[#E8ECEF] w-[90%] m-auto"></div>
              <div className="bg-[#F4FCFD] px-4 py-5">
                <span className="text-[#778CA2] block">Expected RFx date</span>
                <span>4 July 2021</span>
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

export default DrpAutomation;
