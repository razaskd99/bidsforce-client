"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  formatDateString,
  formatDatetime,
  hideMainLoader102,
  showMainLoader102,
} from "@/app/api/util/utility";
import { Edit, Edit2Icon } from "lucide-react";
import NewOpportunity from "./NewOpportunity";
import { Edit2, Edit3, LucideEdit3 } from "lucide-react";
import SelectRFx from "@/components/rfx/SelectRFx";
import RFxList from "../rfx/RfxList";


const OpportunityDetail = ({ 
  data,
  accountRec,
  usersRecords,
  ownerRec,
  oppSalesStages, 
  salesPursuitProgress, 
  businessLine, 
  oppCommForSalesBudget,
  biddingUnit,
  projectType,
  opportunityType ,
  opportunityIndustry,
  rfxBidValidity,
  rfxType,
  rfxContentSubmission,
  rfxSubmissionMode,
  rfxStage,
  rfxList,
  oppID,
}) => {
  const [open, setOpen] = useState(false);
  const [rFxList, setRFxList] = useState(false);
  const [rfxOption, setRfxOption] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickRFx = () => {
    let canCreateRfx = true;    
    if(rfxList.length > 0){
      const filteredRfx = rfxList.filter(rfx =>
        rfx.rfx_status.toLowerCase().includes('closed') || rfx.rfx_status.toLowerCase().includes('cancelled')
      );
      if(filteredRfx.length !== rfxList.length) canCreateRfx = false
    }

    if(canCreateRfx){
      setRfxOption(true);
    } else {
      alert("Cannot create a new RFx for this opportunity because there are already active RFx in progress!")
    }    
  };
  const handleCloseRFx = () => {
    setRfxOption(false);
  };

  hideMainLoader102();

  const router = useRouter();

  let date = new Date().toLocaleDateString();

  const [opportunityData, setOpportunityData] = useState([
 

    { name: "Opportunity Number", value: data.opp_number, id: "opp_number", style: { color: "#26BADA" } },
    { name: "Opportunity Name", value: data.opp_title, id: "opp_title" },

    { name: "End User Project", value: data.enduser_project, id: "end_user_project",},
    { name: "", value: "empty", id: "empty" },

    { name: "Customer", value: data.customer_name, id: "customer" },
    { name: "Sales Persuit Progress", value: data.opp_pursuit_progress, id: "opp_pursuit_progress", },

    { name: "End User ", value: data.enduser_name, id: "end_user" },
    { name: "Opportunity Type", value: data.opp_type, id: "opportunity_type" },

    { name: "Region", value: data.region, id: "region" },
    { name: "Opportunity Industry", value: data.opp_industry, id: "opp_industry", },

    { name: "Business Line", value: data.opp_business_line, id: "opp_business_line", },
    { name: "Project Type", value: data.project_type, id: "project_type" },

    { name: "Opportunity Value", value: data.opp_value, id: "opp_value", },
    { name: "Opportunity Currency", value: data.opp_currency, id: "opp_currency ", },
    
    { name: "Bidding Unit", value: data.bidding_unit, id: "bidding_unit", },
    { name: "Opportunity Committed for Sales Budget", value: data.opp_comm_sales_budget, id: "opp_comm_sales_budget", },
        
    {
      name: "Description",
      value: data.description,
      id: "description",
    },

  ]);
  
  const handleOpenRFxList = () => {
    showMainLoader102();
    setRFxList(true);
  };
  
  const handleCloseRFxList = () => {
    setRFxList(false);
      
  };

  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: 'CRM Opportunities', href: "/opportunities",activeClass: "text-[#26BADA]"},
    { label: data["opp_title"], href: "/opportunities/add/" + data.opportunity_id,  inactiveClass: "text-[#26BADA]" },
  ];

  const handleRowClick = () => {
    router.push(`/opportunities`);
  
};
  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      <div className="bg-white p-8 ">
      <p className="ml-4 text-md text-[#26BADA] flex items-center gap-1 cursor-pointer" onClick={handleClickOpen} >
            Edit Opportunity
            <Edit/>
        </p> 
      <NewOpportunity isOpen={open} handleClose={handleClose} 
        accountRecords={accountRec}
        usersRecords={usersRecords}
        modalData={data}  
        modalType='edit'
        oppSalesStagesList={oppSalesStages} 
        salesPursuitProgressList={salesPursuitProgress}
        businessLineList={businessLine} 
        oppCommForSalesBudgetList={oppCommForSalesBudget}
        biddingUnitList={biddingUnit}
        projectTypeList={projectType}
        opportunityTypeList={opportunityType}
        opportunityIndustryList={opportunityIndustry}
      />

        <div className="flex w-full">
          <form className="grid grid-cols-2 gap-4  p-4 flex-[2]">
          {opportunityData.map((item, index) => (
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
                  item.id === "opp_number" 
                  ?
                  (<span
                    className="outline-1 outline-gray-300 w-full cursor-pointer"
                    style = {item.style ? {color: item.style.color} : {color:""} }
                    onClick={handleRowClick}
                  >{item.value}</span>
                  ) : (
                    item.id === "empty"
                    ? 
                    <span
                      className="outline-1 outline-gray-300 w-full"
                      style = {item.style ? {color: item.style.color} : {color:""} }
                    > </span>
                    :
                    <span
                      className="outline-1 outline-gray-300 w-full"
                      style = {item.style ? {color: item.style.color} : {color:""} }
                    >{item.value}</span>
                  )

                )}
              </div>
            ))}
          </form>
          <div className="flex-[1] flex flex-col">
            <Link
              onClick={handleClickRFx}
              href="#"
              // /rfx/newfx
              className="text-white text-center bg-[#26BADA] py-3 mt-[10px] mb-[18px]] rounded-md"
            >
              LOG RFx
            </Link>
            <SelectRFx 
              open={rfxOption}
              handleCloseRFx={handleCloseRFx}
              preRfxData={data}
              rfxBidValidity={rfxBidValidity}
              rfxType={rfxType}
              rfxContentSubmission={rfxContentSubmission}
              rfxSubmissionMode={rfxSubmissionMode}
              rfxStage={rfxStage}
              data={data}
              usersRecords={usersRecords}
              rfxRecordCount={rFxList.length}
            />            
            
            <div className="border mt-[18px] mb-3 rounded-md">
              <div className="bg-[#00000005] py-2 px-[14px] ">
                Opportunity RFx records
              </div>
              <div className="bg-[#F4FCFD] px-4 py-5 ">
                <span className="text-[#778CA2] block">
                  {rfxList.length} RFx records under this Opportunity.
                </span>
                <span
                  className="outline-1 outline-gray-300 w-full cursor-pointer text-[#26BADA]"
                  onClick={handleOpenRFxList}
                >Show Records</span>
              </div>
              <RFxList 
              open={rFxList} 
              close={handleCloseRFxList}
              oppID={oppID}
              oppNum={data?.opp_number} 
            />
              <div className="border-b border-[#E8ECEF] w-[90%] m-auto"></div>
              
            </div>

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
                Opportunity Owner
              </div>
              <div className="bg-[#F4F5F6] px-4 py-5 flex  items-center gap-4">
                <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center">
                  <img
                    src={ownerRec.profile_image ? ownerRec.profile_image : '/avatar.png'}
                    width={38}
                    height={38}
                    alt="man"
                    className="rounded-[100%] object-cover w-[38px] h-[38px]"
                  />
                  <div className="">
                    <span className="text-sm leading-4">{ownerRec.first_name + ' ' + ownerRec.last_name}</span>
                    <span className="text-sm leading-4 text-[#778CA2] block">
                     {ownerRec.job_title}
                    </span>
                  </div>
                </div>
                {/* <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 ">
                  Sales Person
                </div>
                <div className="flex flex-[1]"></div> */}
              </div>              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpportunityDetail;
