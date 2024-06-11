import Breadcrumbs from "@/components/Breadcrumbs";
import { IoIosSearch, IoMdAddCircleOutline } from "react-icons/io";
import OpenOpportunity from "@/components/opportunity/OpenOpportunity";
const axios = require('axios');
import getConfig from "next/config";
import Image from "next/image"
import Link from "next/link";
// import NewOpportunity from "@/components/forms/NewOpportunity";

import { redirect } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";
import { API_BACKEND_SERVER } from '../../setup';
import { getToken } from "@/app/api/util/script";
import { generateUniqueSixDigitNumber } from "@/app/api/util/utility";
import { getAllOppotunitiesRecords, getMaxOpportunityByID } from "@/app/api/opportunities/action/opportunity";
import { getAllAccountRecordsAction } from "@/app/api/accounts/action/account";
import { getAllOppPrereqRecordsAction } from "@/app/api/opportunities/action/OpportunityPrereq";
import { getAllUserRecordsAction } from "@/app/api/admin-panel/actions/user";
import { CornerDownLeft } from "lucide-react";
import OpportunityTable from "@/components/opportunity/OpportunityTable";
import SearchSection from "@/components/SearchSection"


const Opportunitues = async ({searchParams}) => {
  // search terms
  let searchTermValue=searchParams?.searchterm
  if(!searchTermValue)searchTermValue=""

  // pagination
  let numberOfRecords=5
  const currentPage = Number(searchParams?.page) || 1
  const limit = Number(searchParams?.limit) || numberOfRecords
  const offset = (currentPage - 1) * limit

  let userEncrptedData = await getCookieValue('userPrivateData')
  let tenant_ID = await getCookieValue('TENANT_ID')

  // get env variables
  let apiBackendURL = API_BACKEND_SERVER
  let username = userEncrptedData.user
  let password = userEncrptedData.pass
  let tenantID = tenant_ID

  // get token
  let res = await getToken(apiBackendURL, username, password)
  let tokens = res?.tokenData?.access_token

  let response = {}

  // get opportunities 
  res = await getAllOppotunitiesRecords(searchTermValue, offset, limit)
  const opportunitiesRecords = res?.returnData?.data || [];
  const total_count = res?.returnData?.total_count || 0;
  const totalPages = Math.ceil(total_count / limit)
  
  //**** Start getting opportunity pre-requisite

  // get all opportunity sales stages
  res = await getAllOppPrereqRecordsAction('opportunity_sales_stages', "", 0, 1000);
  let oppSalesStages = res?.returnData?.data || [];

  // get all opportunity sales pursuit progress stages
  res = await getAllOppPrereqRecordsAction('sales_pursuit_progress', "", 0, 1000);
  let salesPursuitProgress = res?.returnData?.data || [];

  // get all business line stages
  res = await getAllOppPrereqRecordsAction('business_line', "", 0, 1000);
  let businessLine = res?.returnData?.data || [];

  // get all opportunity Committed For Sales Budget
  res = await getAllOppPrereqRecordsAction('opp_committed_for_sales_budget', "", 0, 1000);
  let oppCommForSalesBudget = res?.returnData?.data || [];

  // get all bidding unit
  res = await getAllOppPrereqRecordsAction('bidding_unit', "", 0, 1000);
  let biddingUnit = res?.returnData?.data || [];

  // get all project type
  res = await getAllOppPrereqRecordsAction('project_type', "", 0, 1000);
  let projectType = res?.returnData?.data || [];

  // get all opp type
  res = await getAllOppPrereqRecordsAction('opportunity_type', "", 0, 1000);
  let opportunityType = res?.returnData?.data || [];

  // get all opp industry
  res = await getAllOppPrereqRecordsAction('opportunity_industry', "", 0, 1000);
  let opportunityIndustry = res?.returnData?.data || [];

  //**** Start getting opportunity accounts,users
  
  // get all accounts
  response = await getAllAccountRecordsAction('', 0, 1000)
  let accountRecords = response.returnData.data

  // get all users
  response = await getAllUserRecordsAction('')
  let contactsRecords = response.returnData 

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },      
    { label: "Opportunities", href: "/opportunities" },
  ];

  // check user is login
  let isLogin = await getCookieValue('loginStatus')
  if (isLogin == true || isLogin == 'true') {
  }
  else {
    { redirect("/login") }
  }

 
  return (

    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex items-center">
        <OpenOpportunity 
          accountRecords={accountRecords} 
          contactsRecords={contactsRecords}
          oppSalesStages={oppSalesStages}
          salesPursuitProgress={salesPursuitProgress}
          businessLine={businessLine}
          oppCommForSalesBudget={oppCommForSalesBudget}
          biddingUnit={biddingUnit}
          projectType={projectType}
          opportunityType={opportunityType}
          opportunityIndustry={opportunityIndustry}
        />
       
        <SearchSection />
    </div>

      {
          opportunitiesRecords.length
          ?
          <OpportunityTable 
            rows={opportunitiesRecords}  
            accountRecords={accountRecords} 
            contactsRecords={contactsRecords} 
            totalPages={totalPages}       
            oppSalesStages={oppSalesStages}
            salesPursuitProgress={salesPursuitProgress}
            businessLine={businessLine}
            oppCommForSalesBudget={oppCommForSalesBudget}
            biddingUnit={biddingUnit}
            projectType={projectType}
            opportunityType={opportunityType}
            opportunityIndustry={opportunityIndustry}
          />
          :
          <div className="p-4 text-center text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
            Opportunity records are not found.
          </div>
      }

    </div>
  );
};

export default Opportunitues;


