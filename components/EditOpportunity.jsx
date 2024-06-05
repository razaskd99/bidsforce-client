"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LuRefreshCcw, LuBackpack, LuSkipBack, LuStepBack } from "react-icons/lu";
import DatePickerInput from "@/components/DatePickerInput";
import { useRouter } from "next/navigation";
import { loadPostData } from "@/app/api/rfx/actions/rfx";
import { redirect } from "next/navigation";
import {
  formatDatetime,
  hideMainLoader102,
  showErrorMessageAlertMain,
  showMainLoader102,
  successMessageAlertMain,
} from "@/app/api/util/utility";
import { updateOpportunityAction } from "@/app/api/opportunities/action/opportunity";

const EditOpportunity = ({ data ,accountRecords}) => {

  hideMainLoader102();
  const [endUserId, setEndUserId] = useState(data.company_id);
  const [customerId, setCustomerId] = useState(data.customer_id);
  const [customerName, setCustomerName] = useState(data.customer_name);
  const [endUserName, setEndUserName] = useState(data.end_user_name);
  const [customerList, setCustomerList] = useState(
    accountRecords.filter((record) => record.company_type === "Customer")
  );
  const [endUserList, setEndUserList] = useState(
    accountRecords.filter((record) => record.company_type === "End User")
  );
  const [
    opportunityCommittedForSalesBudget,
    setOpportunityCommittedForSalesBudget,
  ] = useState(true);

  const [errorMessage, setErrorMessage] = useState(false);


  const router = useRouter();

  let date = new Date().toLocaleDateString();

  const handleChangeCompany = (e) => {
    if (e.target.name == "customer_id") {
      const company = companyRecords.find(
        (company) => company.company_id === parseInt(e.target.value)
      );
      if(company){
        setCustomerName(company.company_name);
        setCustomerId(company.company_id);      
      }
    }
    if (e.target.name == "enduser_id") {
      const company = companyRecords.find(
        (company) => company.company_id === parseInt(e.target.value)
      );
   
      if(company){
        setEndUserName(company.company_name);
        setEndUserId(company.company_id);
      }
    }
  };


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

  const handleUpdate = async(e) => {
    e.preventDefault();
    //showMainLoader102();
    //alert()
    let rfxTempData = {
        company_id: endUserId ? endUserId : '',
        customer_id: customerId ? customerId : '',
        customer_name: customerName ? customerName : '',
        end_user_name: endUserName ? endUserName : '',

      crm_id: document.getElementById("crm_id").value,
      title: document.getElementById("title").value,
      stage: document.getElementById("stage").value,
      type: document.getElementById("type").value,
      region: document.getElementById("region").value,
      industry_code: document.getElementById("industry_code").value,
      business_unit: document.getElementById("business_unit").value,
      project_type: document.getElementById("project_type").value,
      total_value: document.getElementById("total_value").value,
      forecasted: opportunityCommittedForSalesBudget,
      description: document.getElementById("description").value,
      
      end_user_project: document.getElementById("end_user_project").value,
      opportunity_currency: document.getElementById("opportunity_currency").value,
      sales_persuit_progress: document.getElementById("sales_persuit_progress").value,
      opportunity_owner: document.getElementById("opportunity_owner").value,
      bidding_unit: document.getElementById("bidding_unit").value,
      status:data.status,
      opportunity_id: data.opportunity_id,
      expected_award_date: getPickerValue("expected_award_date"),
      expected_rfx_date: getPickerValue("expected_rfx_date"),
    };

    function getPickerValue(pickerId) {
      let datePickerContainer = document.getElementById(pickerId);
      let inputElement = datePickerContainer.querySelector("input");
      return inputElement.value;
    }
    console.log(rfxTempData.expected_award_date)
    if(!rfxTempData.company_id || !rfxTempData.customer_id || !rfxTempData.title || !rfxTempData.forecasted){
        showErrorMessageAlertMain("Please Filled Required Fields","Error")  
        return
    }

    let res = await updateOpportunityAction(rfxTempData, data.opportunity_id)
    if(res.statusCode == 200){
        successMessageAlertMain("Uploaded","Success")
        router.push("/opportunities/add/"+ data.opportunity_id);

    }
    else{
        showErrorMessageAlertMain(res.error,"Error")  

    }
     
  };

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="bg-white p-8">
        
        <Link href={"/opportunities/add/" + data.opportunity_id} className="flex text-[#26BADA] font-bold py-2 px-4 w-20 "><LuStepBack style={{width: '40px', height: '40px'}}/>    </Link>

        <div className="flex w-full">

         <form className="grid grid-cols-2 gap-4  p-4 flex-[2]">     
          <div className={`mt-1`}>                 
          <span className=" block text-[#778CA2]">Opportunity Number</span>

                <input
                    type="text"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    name='crm_id'
                    id='crm_id'
                    value={data.crm_id}
                    disabled={true}
                />
                </div>
                <div className={`mt-1`}> 
                <span className=" block text-[#778CA2]">Opportunity Name *</span>

                <input
                    type="text"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    name='title'
                    id='title'
                    defaultValue={data.title}
                />
                </div>

            <div className={`mt-3`}>              
                <span className=" block text-[#778CA2]">Customer Name *</span>
                <select
                    name="customer_id"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    onChange={handleChangeCompany}                    >
                    <option value={0}>Select Customer</option>
                    {customerList?.map((option) =>               
                        <option key={option.company_name} value={option.company_id} selected={option.company_name == data.customer_name}>
                            {option.company_name}
                        </option>               
                    )}
                </select>
            </div>

            <div className={`mt-3`}> 
            <span className=" block text-[#778CA2]">Opportunity Sales Stage</span>

                <input
                    type="text"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    name='stage'
                    id='stage'
                    defaultValue={data.stage}
                />
                </div>

            <div className={`mt-3`}>              
                <span className=" block text-[#778CA2]">End User *</span>
                <select
                    name="enduser_id"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    onChange={handleChangeCompany}
                    >
                    <option value={0}>Select End User</option>
                    {endUserList?.map((option) =>               
                        <option key={option.company_name} value={option.company_id} selected={option.company_id == endUserId}>
                            {option.company_name}
                        </option>               
                    )}
                </select>
            </div>
            <div className={`mt-3`}> 
            <span className=" block text-[#778CA2]">Opportunity Type</span>

                <input
                    type="text"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    name='type'
                    id='type'
                    defaultValue={data.type}
                />
                </div>

                <div className={`mt-3`}> 
                <span className=" block text-[#778CA2]">Region</span>

                <input
                    type="text"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    name='region'
                    id='region'
                    defaultValue={data.region}
                />
                </div>

                <div className={`mt-3`}> 
                <span className=" block text-[#778CA2]">Opportunity Industry</span>

                <input
                    type="text"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    name='industry_code'
                    id='industry_code'
                    defaultValue={data.industry_code}
                />
                </div>
                <div className={`mt-3`}>
                <span className=" block text-[#778CA2]">Opportunity Business Line</span>
 
                <input
                    type="text"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    name='business_unit'
                    id='business_unit'
                    defaultValue={data.business_unit}
                />
                </div>
                <div className={`mt-3`}>
                <span className=" block text-[#778CA2]">Project Type</span>

                <input
                    type="text"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    name='project_type'
                    id='project_type'
                    defaultValue={data.project_type}
                />
                </div>
                <div className={`mt-3`}>
                <span className=" block text-[#778CA2]">Total Opportunity Value ($)</span>

                <input
                    type="text"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    name='total_value'
                    id='total_value'
                    defaultValue={data.total_value}
                />
                </div>

            <div className={`mt-3`}>              
                <span className=" block text-[#778CA2]">Opportunity Committed for Sales Budget *</span>
                <select
                    id="forcasted"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    onChange={(e) => setOpportunityCommittedForSalesBudget((e.target.value))}
                    >
                    <option value={0}></option>
                                 
                        <option  value={true} selected={data.forcasted ? true : false}>
                            Yes
                        </option>    
                        <option  value={false} selected={!data.forcasted ? true : false}>
                            No
                        </option>                          
                    
                </select>
            </div>

            <div className={`mt-3`}>
            <span className=" block text-[#778CA2]">End User Project</span>

                <input
                    type="text"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    name='end_user_project'
                    id='end_user_project'
                    defaultValue={data.end_user_project}
                />
                </div>
           
                <div className={`mt-3`}> 
                <span className=" block text-[#778CA2]">Opportunity Currency</span>

                <input
                    type="text"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    name='opportunity_currency'
                    id='opportunity_currency'
                    defaultValue={data.opportunity_currency}
                />
                </div>

                <div className={`mt-3`}> 
                <span className=" block text-[#778CA2]">Sales Persuit Progress</span>

                <input
                    type="text"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    name='sales_persuit_progress'
                    id='sales_persuit_progress'
                    defaultValue={data.sales_persuit_progress}
                />
                </div>
                <div className={`mt-3`}> 
                <span className=" block text-[#778CA2]">Opportunity Owner</span>

                <input
                    type="text"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    name='opportunity_owner'
                    id='opportunity_owner'
                    defaultValue={data.opportunity_owner}
                />
                </div>
                <div className={`mt-3`}> 
                <span className=" block text-[#778CA2]">Bidding Unit</span>

                <input
                    type="text"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    name='bidding_unit'
                    id='bidding_unit'
                    defaultValue={data.bidding_unit}
                />
                </div>
                <div></div>
                <div className={`mt-3`}> 
                <span className=" block text-[#778CA2]">Description</span>

                <textarea
                    type="text"
                    className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                    name='description'
                    id='description'
                    defaultValue={data.description}
                />
                </div>  

                
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
                handleUpdate(e);
              }}
              href="#"
              // /rfx/newfx
              className="text-white text-center bg-[#26BADA] py-3 mt-[10px] mb-[18px]] rounded-md"
            >
              UPDATE OPPORTUNITY
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

export default EditOpportunity;