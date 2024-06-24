'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import NewOpportunity from './NewOpportunity';
// import OpenDialogButton from './OpenDialogButton';

const OpenOpportunity = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
       <p className="text-md text-[#26BADA] flex items-center gap-1 cursor-pointer" onClick={handleClickOpen} >
            New Opportunity
            <Image src="add-blue.svg" width={18} height={21} alt="add" />
        </p> 
      <NewOpportunity isOpen={open} handleClose={handleClose}
        accountRecords={props.accountRecords}
        usersRecords={props.usersRecords}
        oppSalesStagesList={props.oppSalesStages}
        salesPursuitProgressList={props.salesPursuitProgress}
        businessLineList={props.businessLine}
        oppCommForSalesBudgetList={props.oppCommForSalesBudget}
        biddingUnitList={props.biddingUnit}
        projectTypeList={props.projectType}
        opportunityTypeList={props.opportunityType}
        opportunityIndustryList={props.opportunityIndustry}
      />
    </div>
  );
}



export default OpenOpportunity
