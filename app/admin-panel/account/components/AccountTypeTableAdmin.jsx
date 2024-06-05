"use client";

import { formatDatetime, hideMainLoader102, showMainLoader102 } from "@/app/api/util/utility";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, {useState} from "react";
import PropTypes from 'prop-types';
import { deleteAccountTypeRecordAction, getAccountTypeRecordByIDAction } from "../../../api/accounts/action/accountType";
import AccountTypeInfoModal from "./AccountTypeInfoModal";




export default function AccountTypeTableAdmin({ allRecords}) {
  hideMainLoader102();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  


//   const handleClose = () => {
//     setIsOpen(false);
//   };



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
      //showMainLoader102();
    if(itemIDs) {
      for (const itemID of itemIDs) {
        const r1 = await deleteAccountTypeRecordAction(itemID);
      }
      window.location.reload();                  
    }
      
    }   
  };

  const updateItemButton = async() => {

    if(selectedRows && selectedRows.length == 1) {
      const r1 = await getAccountTypeRecordByIDAction(selectedRows[0]);
      setModalData(r1.returnData);  
    }
    setIsOpen(true);
  }


  return (
    <div className="h-full w-full "> 
    { isOpen && 
    <AccountTypeInfoModal 
        modalData={modalData}
        setOpenAccountTypeModal={setIsOpen}
    />
    }
    <div className='flex gap-3 w-full h-4 text-gray-500 cursor-pointer ml-3'>
      <>        
        { selectedRows.length > 0 && (
          <div 
            className='flex gap-1 items-center text-lg align-center'
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
          <th className="px-2 py-2 font-normal text-left align-middle ">TYPE NAME</th>
          <th className="px-2 py-2 font-normal text-left align-middle ">CREATED ON</th>

        </tr>
        {allRecords && allRecords?.map((row) => (
          <tr key={row.id} className="relative bg-white text-[#252631] text-sm p-5"  >
            <td className="px-3 py-2">             
              <input 
                type="checkbox"
                value={row.account_type_id}
                onChange={(e)=>handleCheckboxChange(e, row.account_type_id)}
                checked={(selectedRows.includes(row.account_type_id) ? true : false)}
              />
            </td>
                          
            <td className="px-2 py-2 text-small" >{row.type_name}</td>
            <td className="px-2 py-2 text-small">{formatDatetime(row.created_at)}</td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

AccountTypeTableAdmin.propTypes = {
  rows: PropTypes.array.isRequired,
};
