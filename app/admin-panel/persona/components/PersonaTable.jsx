"use client";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, {useState} from "react";
import PropTypes from 'prop-types';
import { formatDatetime, hideMainLoader102, showMainLoader102 } from "../../../api/util/utility";
import PersonaInfoModal from "./PersonaInfoModal";
import {deletePersonaRecordAction, getPersonaRecordByIDAction} from '../../../api/admin-panel/actions/persona'


export default function PersonaTable({ allRecords, apiBackendURL, tenantID, tokens}) {
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
      if(itemIDs) {
        showMainLoader102();
        for (const itemID of itemIDs) {
          const r1 = await deletePersonaRecordAction(itemID, apiBackendURL, tokens, tenantID);
        }
        window.location.reload();                  
      }  
    }
  };

  const updateItemButton = async() => {

    if(selectedRows && selectedRows.length == 1) {
      const r1 = await getPersonaRecordByIDAction(selectedRows[0], apiBackendURL, tokens, tenantID);
      setModalData(r1.returnData);  
    }
    setIsOpen(true);
  }


  return (
    <div className="h-full w-full "> 
    { isOpen && 
    <PersonaInfoModal 
        modalData={modalData}
        setOpenPersonaModal={setIsOpen}
        modalType="update"
        id={modalData.persona_id ? modalData.persona_id : ''}        
        tenantID={tenantID}
        tokens={tokens}
        apiBackendURL={apiBackendURL}
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
          <th className="px-2 py-2 font-normal text-left align-middle ">TITLE</th>
          <th className="px-2 py-2 font-normal text-left align-middle ">STATUS</th>
          <th className="px-2 py-2 font-normal text-left align-middle ">CREATED ON</th>

        </tr>
        {allRecords && allRecords?.map((row) => (
          <tr key={row.id} className="relative bg-white text-[#252631] text-sm p-5"  >
            <td className="px-3 py-2">             
              <input 
                type="checkbox"
                value={row.persona_id}
                onChange={(e)=>handleCheckboxChange(e, row.persona_id)}
                checked={(selectedRows.includes(row.persona_id) ? true : false)}
              />
            </td>
                          
            <td className="px-2 py-2 text-small" >{row.persona_role}</td>
            <td className="px-2 py-2 text-small" >{row.is_active ? "Active" : "Inactive"}</td>
            <td className="px-2 py-2 text-small">{formatDatetime(row.created_on)}</td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

PersonaTable.propTypes = {
  rows: PropTypes.array.isRequired,
};
