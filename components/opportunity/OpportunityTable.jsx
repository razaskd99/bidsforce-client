"use client";
import { usePathname, useRouter } from "next/navigation";
import { formatDatetime, hideMainLoader102, showMainLoader102 } from "@/app/api/util/utility";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, {useState} from "react";
import PropTypes from 'prop-types';
import NewOpportunity from "./NewOpportunity";
import CustomPagination from "../CustomPagination"
import { deleteOpportunityRecordByIdAction, getOpportunityByID } from "@/app/api/opportunities/action/opportunity";
import Pagination from "../pageniation-util/pagination";
import Image from 'next/image';
import { PlusIcon } from "lucide-react";


export default function OpportunityTable({ 
  rows, 
  accountRecords,
  contactsRecords,
  totalPages,
  oppSalesStages, 
  salesPursuitProgress, 
  businessLine, 
  oppCommForSalesBudget,
  biddingUnit,
  projectType,
  opportunityType
}) {

  hideMainLoader102();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
 
  // Claculate paging
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = rows.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const handleCloseOpportunity = () => {
    setIsOpen(false);
  };

  const handleCheckboxChange = (event, itemID) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedRows([...selectedRows, itemID]);
    }
    else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== itemID));             
    }    
  };

  const handleCheckboxSelectAll = (event,) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckAll(true)
      let IDs = []
      const listings = document.getElementById('itemsListing'); 
      const checkboxes = listings.querySelectorAll('input[type="checkbox"]');
      
      checkboxes.forEach(checkbox => {
        if (checkbox.value) {             
          IDs.push(parseInt(checkbox.value))     
        }
      });
      setSelectedRows(IDs); 
    }
    else {
      setCheckAll(false)
      setSelectedRows([]);
    }   
  };


  const deleteItemsButton = async itemIDs => {
    const confirmDelete = window.confirm("Are you sure? You want to delete selected records.");
    if(confirmDelete){
      showMainLoader102();
      if(itemIDs) {
        for (const itemID of itemIDs) {
          const r1 = await deleteOpportunityRecordByIdAction(itemID);
        }
        window.location.reload();                  
      }      
    }   
  };


  const updateItemButton = async() => {
    if(selectedRows && selectedRows.length == 1) {
      const r1 = await getOpportunityByID(selectedRows[0]);
      setModalData(r1.returnData);  
    }
    setIsOpen(true);
  }

  const router = useRouter();
  const pathname = usePathname();
  const isManager = pathname.includes("/manager/");

  const handleRowClick = (row) => {
    const rowId = row.opportunity_id;
    showMainLoader102();
    if (isManager) {
      router.push(`/manager/opportunities/add/${rowId}`);
    } else {
      router.push(`/opportunities/add/${rowId}`);
    }
  };

  return (
    <div className="h-full w-full"> 
    <NewOpportunity         
      isOpen={isOpen} 
      handleClose={handleCloseOpportunity} 
      modalType='edit'
      modalData={modalData}
      accountRecords={accountRecords}
      contactsRecords={contactsRecords}
      oppSalesStagesList={oppSalesStages} 
      salesPursuitProgressList={salesPursuitProgress}
      businessLineList={businessLine} 
      oppCommForSalesBudgetList={oppCommForSalesBudget}
      biddingUnitList={biddingUnit}
      projectTypeList={projectType}
      opportunityTypeList={opportunityType}
    />
    <div className='flex gap-3 w-full mt-2 h-4 text-gray-500 cursor-pointer mr-1'>
      <>
        
        { selectedRows.length > 0 && (
          <div 
            className='flex gap-1 items-center text-lg ml-3'
            onClick={() => deleteItemsButton(selectedRows)}
          >
            <AiFillDelete/>Delete
          </div>)
        }

        {selectedRows.length === 1 && (
          <div 
            className='flex gap-1 items-center text-lg'
            onClick={updateItemButton}
          >
            <AiFillEdit/>Edit
          </div>)

        }
        {selectedRows.length === 1 && (
          <div 
            className='flex gap-1 items-center text-lg'
          >
           <PlusIcon className='text-sm' />
            Create New RFx
          </div>)
          
        }
      </>
    </div>
    
    <table id='itemsListing' className="table-auto w-full border-separate border-spacing-y-3 bg-[#f2f4f6] mt-4">
      <tbody className='w-full'>
        <tr className="bg-[#F8FAFB] w-full text-[#778CA2] text-sm ">
          <th className="w-[30px]">
            <input 
              type="checkbox"
              onChange={(e)=>handleCheckboxSelectAll(e)}
            />
          </th>
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
        {currentItems.map((row) => (
          <tr key={row.id} className="relative bg-white text-[#252631] text-sm p-5 hover:bg-neutral-200 cursor-pointer"  >
            <td className="px-3 py-2">          
              <div
                onClick={() => handleRowClick(row)}
                className="absolute top-0 left-[50px] w-full h-full bg-transparent hover:pointer"
                style={{ maxWidth: `calc(100% - 50px)` }} 
              >
                {/* clickable container*/}
              </div>
              
              {/* Checkbox */}
              <input 
                type="checkbox"
                value={row.opportunity_id}
                onChange={(e)=>handleCheckboxChange(e, row.opportunity_id)}
                checked={(selectedRows.includes(row.opportunity_id) ? true : false)}
              />
            </td>
                          
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
    <div className="flex justify-center	mt-20">
      <Pagination totalPages={totalPages} />
    </div>  
  </div>
);
};

OpportunityTable.propTypes = {
  rows: PropTypes.array.isRequired,
};
