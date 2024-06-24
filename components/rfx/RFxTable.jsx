"use client";
import { usePathname, useRouter } from "next/navigation";
import { formatDatetime, hideMainLoader102, showMainLoader102 } from "@/app/api/util/utility";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, {useState} from "react";
import PropTypes from 'prop-types';
import NewRfx from "./NewRfx"
import Pagination from "../pageniation-util/pagination";
import { deleteRfxRecordAction, getRfxByIdAction } from "@/app/api/rfx/actions/rfx";



export default function RFxTable({
    rows, 
    usersRecords,
    totalPages,
    rfxBidValidity,
    rfxType,
    rfxContentSubmission,
    rfxSubmissionMode,
    rfxStage
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
 
  
  
  const handleCloseRfx = () => {
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
          const r1 = await deleteRfxRecordAction(itemID);
        }
        window.location.reload();                  
      }      
    }   
  };


  const updateItemButton = async() => {
    if(selectedRows && selectedRows.length == 1) {
      const r1 = await getRfxByIdAction(selectedRows[0]);
      setModalData(r1.rfxData);  
    }
    setIsOpen(true);
  }

  const router = useRouter();

  const handleRowClick = (row) => {
    const rowId = row.id;
    showMainLoader102();   
    router.push(`/rfx/detail/${rowId}`);  
  };

  
  return (
    <div className="h-full w-full"> 
    <NewRfx         
      open={isOpen} 
      close={handleCloseRfx} 
      modalType='edit'
      modalData={modalData}
      rfxBidValidityList={rfxBidValidity}
      rfxTypeList={rfxType}
      rfxContentSubmissionList={rfxContentSubmission}
      rfxSubmissionModeList={rfxSubmissionMode}
      rfxStageList={rfxStage}
      usersRecords={usersRecords}
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
          <th className="px-2 py-2 font-light text-left align-middle w-[110px]">RFX ID</th>
          <th className="px-2 py-2 font-light text-left align-middle w-[210px]">RFX TYPE</th>
          <th className="px-2 py-2 font-light text-left align-middle">OPPORTUNITY NAME</th>
          <th className="px-2 py-2 font-light text-left align-middle">CUSTOMER</th>
          <th className="px-2 py-2 font-light text-left align-middle">END USER</th>
          <th className="px-2 py-2 font-light text-left align-middle">RFX CREATION DATE</th>
          <th className="px-2 py-2 font-light text-left align-middle">DUE DATE</th>
          <th className="px-2 py-2 font-light text-left align-middle">RFX OWNER</th>
          <th className="px-2 py-2 font-light text-left align-middle">RFX STATUS</th>

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
                value={row.id}
                onChange={(e)=>handleCheckboxChange(e, row.id)}
                checked={(selectedRows.includes(row.id) ? true : false)}
              />
            </td>
                          
            <td className="px-2 py-2 text-small text-[#26BADA] cursor-pointer" >{row.rfx_id}</td>
            <td className="px-2 py-2 text-small">{row.rfx_type}</td>
            <td className="px-2 py-2 text-small">{row.opp_title}</td>
            <td className="px-2 py-2 text-small">{row.customer_name}</td>
            <td className="px-2 py-2 text-small">{row.enduser_name}</td>
            <td className="px-2 py-2 text-small">{formatDatetime(row.created_at)}</td>
            <td className="px-2 py-2 text-small">{row.due_date}</td>
            <td className="px-2 py-2 text-small">{row.rfxowner_name}</td>
            <td className="px-2 py-2 text-small">{row.rfx_status}</td>

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

RFxTable.propTypes = {
  rows: PropTypes.array.isRequired,
};
