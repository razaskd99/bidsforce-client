"use client";

import React from 'react'
import Image from "next/image"
import { FaListOl } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { useState } from "react";
import SelectOpportunity from './SelectOpportunity';


const OpenRfx = (props) => {
    const {
        usersRecords,
        accountRecords,
        oppSalesStagesList,
        salesPursuitProgressList,
        businessLineList,
        oppCommForSalesBudgetList,
        biddingUnitList,
        projectTypeList,
        opportunityTypeList,
        opportunityIndustryList,
    } = props
    
    const [viewMode, setViewMode] = useState('list');
    const [openSelectOpportunity, setOpenSelectOpportunity] = useState(false);

    const handleClickOpen = () => {
        setOpenSelectOpportunity(true);
    };

    const handleClose = () => {
        setOpenSelectOpportunity(false);
    };
    
    const handleViewModeChange = (mode) => {
        setViewMode(mode);
      };
  return (
    <div className="flex flex-row w-full h-auto">
             
             <div className="bg-[#F2F4F6] px-6 h-full relative w-full">
                 <div className=" flex items-center justify-between mt-2 mb-4">
                     <p onClick={handleClickOpen} className="text-md text-[#26BADA] flex items-center gap-2 cursor-pointer" >
                         New RFx
                         <Image src="add-blue.svg" width={18} height={21} alt="add" />
                     </p>
                     <SelectOpportunity 
                        isOpen={openSelectOpportunity} 
                        handleClose={handleClose}
                        usersRecords={usersRecords}
                        accountRecords={accountRecords}
                        oppSalesStagesList={oppSalesStagesList}
                        salesPursuitProgressList={salesPursuitProgressList}
                        businessLineList={businessLineList}
                        oppCommForSalesBudgetList={oppCommForSalesBudgetList}
                        biddingUnitList={biddingUnitList}
                        projectTypeList={projectTypeList}
                        opportunityTypeList={opportunityTypeList}
                        opportunityIndustryList={opportunityIndustryList}
                        />
                     <div className="flex gap-5">
                         {/* <div className="flex items-center gap-2 text-xs font-medium cursor-pointer text-[#778CA2] select-none"
                             onClick={() => handleViewModeChange('list')}
                         >
                             <FaListOl className={`text-lg ${viewMode === 'list' ? 'text-[#26BADA]' : 'text-[#999a9b]' }`} />
                             <span className={`${viewMode === 'list' ? 'text-black' : 'text-[#999a9b]' }`}>LIST</span>
 
                         </div>
                         <div className="flex items-center gap-2 text-xs font-medium cursor-pointer text-[#778CA2] select-none"
                             onClick={() => handleViewModeChange('grid')}
                         >
                             <BsFillGrid3X3GapFill className={`text-lg ${viewMode === 'grid' ? 'text-[#26BADA]' : 'text-[#999a9b]' }`} />
                             <span className={`${viewMode === 'grid' ? 'text-black' : 'text-[#999a9b]' }`}>KANBAN</span>
                         </div> */}
                     </div>
                 </div>
             </div>
         </div>
  )
}

export default OpenRfx
