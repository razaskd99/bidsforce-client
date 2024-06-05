"use client";
import CustomPagination from '../CustomPagination';
import PropTypes from 'prop-types';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, {useState, useTransition} from "react";
import { formatDateString, formatDatetime, hideMainLoader102, showMainLoader102 } from "@/app/api/util/utility";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import NewAccounts from './NewAccounts';
import { deleteAccountAction, getAccountRecordByIDAction } from '@/app/api/accounts/action/account';
import { getAllAccountTypeEntriesAction } from '@/app/api/accounts/action/accountTypeEntries';

import Pagination from '../pageniation-util/pagination';


export default function AccountTable({ rows, totalCount, limit, allAccountsTypeRecord, contactsRecords}) {
  hideMainLoader102();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [accountTypeEntries, setAccountTypeEntries] = useState([]);
  const [isPending, startTransition] = useTransition();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Calculate the index of the first and last item to be displayed on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(totalCount / limit)

  // Get the current page of items
  const currentItems = rows.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCloseAccount = () => {
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


  const router = useRouter();
  const pathname = usePathname();

  const handleRowClick = (row) => {
    const rowId = row.account_id;
    showMainLoader102();
    if (rowId){
      router.push(`/accounts/edit/${rowId}`);
    }
  };


  const deleteItemsButton = async itemIDs => {
    const confirmDelete = window.confirm("Are you sure? You want to delete selected records.");
    if(confirmDelete){
      showMainLoader102();
      if(itemIDs) {
        for (const itemID of itemIDs) {
          const r1 = await deleteAccountAction(itemID);
        }
        window.location.reload();                  
      }      
    }   
  };


  const updateItemButton = async() => {
    if(selectedRows && selectedRows.length == 1) {
      const r1 = await getAccountRecordByIDAction(selectedRows[0]);
      setModalData(r1.returnData); 
      const r2 = await getAllAccountTypeEntriesAction(selectedRows[0]) ;
      const records = r2.returnData
      setAccountTypeEntries(
        records.map((item, index) => ({
          id: item.account_type_id,
          name: item.type_name,	
        }))
      );       
    }
    setIsOpen(true); 
  };

  return (
    <>
    <div className="h-full w-full "> 
      <NewAccounts         
        isOpen={isOpen} 
        handleClose={handleCloseAccount} 
        modalType='edit'
        modalData={modalData}
        allAccountsTypeRecord={allAccountsTypeRecord} 
        contactsRecords={contactsRecords}
        accountTypeEntries={accountTypeEntries}
      />
      <div className='flex gap-3 w-full mt-2 ml-4 h-4 text-gray-500 cursor-pointer'>
        <>
                     
          { selectedRows.length > 0 && (
            <div 
              className='flex gap-1 items-center text-lg'
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
          <tr className="bg-[#F8FAFB] w-full text-[#778CA2] text-sm">
            <th className="w-[100px] text-left align-middle pl-5"><input 
              type="checkbox"
              onChange={(e)=>handleCheckboxSelectAll(e)}
            /></th>
            <th className="px-2 py-2 font-normal text-left align-middle w-[128px]">ACCOUNT ID</th>
            <th className="px-0 py-2 font-normal text-left align-middle">ACCOUNT NAME</th>
            <th className="px-2 py-2 font-normal text-left align-middle">ACCOUNT TYPE</th>
            <th className="px-2 py-2 font-normal text-left align-middle">CREATED DATE</th>
            <th className="px-2 py-2 font-normal text-left align-middle">ACCOUNT OWNER</th>
            <th className="px-2 py-2 font-normal text-left align-middle">PRIMARY ADDRESS</th>
          </tr>
          {currentItems.map((row) => (
            <tr key={row.id} className="relative bg-white text-[#252631] text-sm p-5 hover:bg-neutral-200 cursor-pointer"  >
              <td className=" flex justify-around pl-2 py-2">          
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
                  value={row.account_id}
                  onChange={(e)=>handleCheckboxChange(e, row.account_id)}
                  checked={(selectedRows.includes(row.account_id) ? true : false)}
                />
                <img src={row.account_image} style={{width:40, height:40, borderRadius: '50%'}} className="rounded-full" />
              </td>
                            
              <td className="px-2 py-2 text-small text-[#26BADA] cursor-pointer" >{row.account_number}</td>
              <td className="px-2 py-2 text-small">{row.account_name}</td>
              <td className="px-2 py-2 text-small">{row.type_list}</td>
              <td className="px-2 py-2 text-small">{formatDatetime(row.created_at)}</td>
              <td className="px-2 py-2 text-small">{row.owner_name}</td>
              <td className="px-2 py-2 text-small">{row.street + ", " + row.city + " " + row.postal_code+ ", " + row.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center	mt-20">
        <Pagination totalPages={totalPages} />
      </div>  
    </div>
    
  </>
  );
};

AccountTable.propTypes = {
  rows: PropTypes.array.isRequired,
};
