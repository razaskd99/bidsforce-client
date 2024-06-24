"use client";
import { usePathname, useRouter } from "next/navigation";
import { formatDatetime, hideMainLoader102, showMainLoader102 } from "@/app/api/util/utility";
import React, {useState} from "react";
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid
  } from "@mui/material";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import NewOpportunity from "../opportunity/NewOpportunity"




export default function OpportunitySearch(props) {
    const {
        open,
        close,
        oppRecords,
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
    } = props;

  hideMainLoader102()
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [openNewOpportunity, setOpenNewOpportunity] = useState(false);
 

  
  const handleCloseOpportunity = () => {
    setOpenNewOpportunity(false);
  };

  const handleOpenOpportunity = () => {
    setOpenNewOpportunity(true);
  };



  const router = useRouter();
  
  const handleRowClick = (row) => {
    const rowId = row.opportunity_id;
    showMainLoader102();    
    router.push(`/opportunities/add/${rowId}`);
    
  };

  return (
    <>
      <Dialog open={open} onClose={close} maxWidth="xl" fullWidth>
        <DialogContent>
            <div className='w-full mt-2 h-4 text-[#26BADA] text-xl flex justify-end'>
            <Link href='#' onClick={handleOpenOpportunity}>
                ADD NEW OPPORTUNITY
            </Link>
            {openNewOpportunity &&
            <NewOpportunity 
              isOpen={openNewOpportunity} 
              handleClose={handleCloseOpportunity}
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
            }
            </div>

            <div className='w-full mt-2 h-4 text-gray-800 text-xl'>
            <p>
                {oppRecords.length} Opportunities Found
            </p>
            </div>
    
    <table id='itemsListing' className="table-auto w-full border-separate border-spacing-y-3 bg-[#f2f4f6] mt-4">
      <tbody className='w-full'>
        <tr className="bg-[#F8FAFB] w-full text-[#778CA2] text-sm ">
          {/* <th className="w-[30px]">
            <input 
              type="checkbox"
              onChange={(e)=>handleCheckboxSelectAll(e)}
            />
          </th> */}
          <th className="px-2 py-2 font-light text-left align-middle w-[150px]">OPPORTUNITY NO.</th>
          <th className="px-2 py-2 font-light text-left align-middle w-[200px]">OPPORTUNITY NAME</th>
          <th className="px-2 py-2 font-light text-left align-middle">CUSTOMER</th>
          <th className="px-2 py-2 font-light text-left align-middle">END USER</th>
          <th className="px-2 py-2 font-light text-left align-middle">OPPORTUNITY VALUE</th>
          <th className="px-2 py-2 font-light text-left align-middle">BUSINESS LINE</th>
          <th className="px-2 py-2 font-light text-left align-middle">OPPORTUNITY OWNER</th>
          <th className="px-2 py-2 font-light text-left align-middle">EXPECTED AWARD DATE</th>
          <th className="px-2 py-2 font-light text-left align-middle">OPPORTUNITY CREATION DATE</th>

        </tr>
        {oppRecords.map((row) => (
          <tr key={row.id} className="relative bg-white text-[#252631] text-sm p-5 hover:bg-neutral-200 cursor-pointer" onClick={() => handleRowClick(row)} >
            {/* <td className="px-3 py-2">          
              <div
                onClick={() => handleRowClick(row)}
                className="absolute top-0 left-[50px] w-full h-full bg-transparent hover:pointer"
                style={{ maxWidth: `calc(100% - 50px)` }} 
              >
              </div>
              
            </td> */}
                          
            <td className="px-2 py-2 text-small text-[#26BADA] cursor-pointer" >{row.opp_number}</td>
            <td className="px-2 py-2 text-small">{row.opp_title}</td>
            <td className="px-2 py-2 text-small">{row.customer_name}</td>
            <td className="px-2 py-2 text-small">{row.enduser_name}</td>
            <td className="px-2 py-2 text-small">{row.opp_currency + ' ' + row.opp_value}</td>
            <td className="px-2 py-2 text-small">{row.opp_business_line}</td>
            <td className="px-2 py-2 text-small">{row.owner_name}</td>
            <td className="px-2 py-2 text-small">{row.expected_award_date}</td>
            <td className="px-2 py-2 text-small">{formatDatetime(row.created_at)}</td>
            
          </tr>
        ))}
      </tbody>
    </table> 


        </DialogContent>
        </Dialog>
        </>
    
);
};

OpportunitySearch.propTypes = {
  rows: PropTypes.array.isRequired,
};
