"use client";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, {useState} from "react";
import PropTypes from 'prop-types';
import { deleteOppPrereqRecordAction, getOppPrereqByIDAction } from "@/app/api/opportunities/action/OpportunityPrereq";
import OppPrereqInfoModal from "../components/OppPrereqInfoModal"
import { showMainLoader102 } from "@/app/api/util/utility";


export default function OppPrereqTable({ allRecords, tableName}) {

  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  



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
        const r1 = await deleteOppPrereqRecordAction(tableName, itemID);
      }
      window.location.reload();                  
    }
      
    }   
  };

  const updateItemButton = async() => {
console.log(tableName)
    if(selectedRows && selectedRows.length == 1) {
      const r1 = await getOppPrereqByIDAction(tableName, selectedRows[0]);
      setModalData(r1.returnData);  
    }
    setIsOpen(true);
   }


  return (
    <div className="h-full w-full"> 
    { isOpen && 
    <OppPrereqInfoModal 
        modalData={modalData}
        tablename={tableName}
        setOpenOppPrereqModal={setIsOpen}
        id={modalData.bidding_unit_id || modalData.business_line_id || modalData.opp_committed_for_sales_budget_id ||
            modalData.opportunity_sales_stages_id || modalData.opportunity_type_id || 
            modalData.project_type_id || modalData.sales_pursuit_progress_id || modalData.opportunity_industry_id}
    />
    }
    <div className='flex gap-3 w-full h-4 text-gray-500 cursor-pointer '>
      <>        
        { selectedRows.length > 0 && (
          <div 
            className='flex gap-1 items-center text-lg align-center ml-3'
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
      </>
    </div>
    
    <table id='itemsListing' className="table-auto w-full border-separate border-spacing-y-3 bg-[#f2f4f6] mt-2">
      <tbody className='w-full'>
        <tr className="bg-[#F8FAFB] w-full text-[#778CA2] text-sm">
        <th className="w-[50px] text-left align-middle pl-4"><input 
            type="checkbox"
            className=""
            onChange={(e)=>handleCheckboxSelectAll(e)}
          /></th>
          <th className="px-2 py-2 font-normal text-left align-middle w-[500px]">TITLE</th>
          <th className="px-2 py-2 font-normal text-left align-middle">STATUS</th>

        </tr>
        {allRecords && allRecords?.map((row) => (
          <tr key={row.id} className="relative bg-white text-[#252631] text-sm p-5"  >
            <td className="px-3 py-2">             
              <input 
                type="checkbox"
                value={row.bidding_unit_id || row.business_line_id || row.opp_committed_for_sales_budget_id ||
                    row.opportunity_sales_stages_id || row.opportunity_type_id || 
                    row.project_type_id || row.sales_pursuit_progress_id || row.opportunity_industry_id}
                onChange={(e)=>handleCheckboxChange(e, row.bidding_unit_id || row.business_line_id || row.opp_committed_for_sales_budget_id ||
                    row.opportunity_sales_stages_id || row.opportunity_type_id || 
                    row.project_type_id || row.sales_pursuit_progress_id || row.opportunity_industry_id)}
                checked={(selectedRows.includes(row.bidding_unit_id || row.business_line_id || row.opp_committed_for_sales_budget_id ||
                    row.opportunity_sales_stages_id || row.opportunity_type_id || 
                    row.project_type_id || row.sales_pursuit_progress_id || row.opportunity_industry_id) ? true : false)}
              />
            </td>
                          
            <td className="px-2 py-2 text-small" >{row.title}</td>
            <td className="px-2 py-2 text-small">{row.active ? "Active" : "Inactive"}</td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

OppPrereqTable.propTypes = {
  rows: PropTypes.array.isRequired,
};
