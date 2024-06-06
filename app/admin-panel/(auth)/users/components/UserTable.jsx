'use client'
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomPagination from '@/components/CustomPagination';
import { usePathname, useRouter } from 'next/navigation';
import { hideMainLoader102, showMainLoader102 } from '@/app/api/util/utility';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import UserInfoModal from './UserInfoModal';
import { deleteUserRecordAction, getUserRecordByIDAction } from '@/app/api/users/action/user';

const UserTable = ({ rows, tenantDetails, functionaGroupRecs, usersRecords }) => {
  hideMainLoader102();
  const [isOpen, setIsOpen] = useState(false);
  const [usersData, setUsersData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const router = useRouter();
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Calculate the index of the first and last item to be displayed on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page of items
  const currentItems = rows.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCloseUser = () => {
    setIsOpen(false);
  };

  const updateItemButton = async() => {

    if(selectedRows && selectedRows.length == 1) {
      // console.log(selectedRows,"selectedRows id")   
      const r1 = await getUserRecordByIDAction(selectedRows[0]);
      setUsersData(r1.returnData);
      // console.log(usersData,"after update click")   
    }
    setIsOpen(true);
  }

  const deleteItemsButton = async itemIDs => {
    const confirmDelete = window.confirm("Are you sure? You want to delete selected records.");
    if(confirmDelete){
      if(itemIDs) {
        showMainLoader102()
        for (const itemID of itemIDs) {
          const r1 = await deleteUserRecordAction(itemID);
        }
        window.location.reload()
      }
    }   
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

  
  const handleRowClick = (row) => {
    showMainLoader102();
    const rowId = row.user_id;
    if (rowId) {      
      router.push(`/admin-panel/users/detail/${rowId}`);
    }
  };
  

  return (
    <div className="h-600 w-full  overflow-auto"> 
      <div className='flex items-center gap-3 w-full h-full mt-2 h-4 text-gray-500 cursor-pointer' >
        {
          <>
          <div className='flex gap-3 ml-2 items-center text-lg '>
            <input 
              type="checkbox"
              onChange={(e)=>handleCheckboxSelectAll(e)}
            /> <span>Select All</span>
          </div>
         { selectedRows.length > 0 && (
            <div 
              className='flex gap-1 items-center text-lg'
              onClick={() => deleteItemsButton(selectedRows)}
            >
              <AiFillDelete/>Delete
            </div>)}

          {selectedRows.length == 1 && (
            <div 
              className='flex gap-1 items-center text-lg'
              onClick={updateItemButton}
            >
              <AiFillEdit/>Edit
            </div>)}
            </>
      }
      </div>

      <UserInfoModal         
        isOpen={isOpen} 
        handleClose={handleCloseUser} 
        modalType='edit'
        modalData={usersData}
        //usersRecords = {rows}    
        tenantDetails={tenantDetails}     
        functionaGroupRecs={functionaGroupRecs}
        usersRecords ={usersRecords}
      />
      
      <table id='itemsListing' className="table-auto w-full border-separate border-spacing-y-3 bg-[#f2f4f6] mt-4">
        <tbody>
          {currentItems.map((row) => (
            <tr key={row.id} className="relative bg-white p-5 w-1/4 hover:bg-neutral-200 cursor-pointer" >
             <td className="px-2 py-2">
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
                  value={row.user_id}
                  onChange={(e)=>handleCheckboxChange(e, row.user_id)}
                  checked={(selectedRows.includes(row.user_id) ? true : false)}
                />
              </td>
              <td className="px-2 py-2">
{
                <img src={row.profile_image} width={40} height={40} className="rounded-full" />
}
              </td>
              
              <td className="px-0 py-2 font-medium ">{row.first_name +' '+ row.last_name}</td>
              <td className="px-2 py-2 font-light">{row.company_name}</td>
              <td className="px-2 py-2 font-light">{row.job_title}</td>
              <td className="px-2 py-2 font-light">{row.email}</td>
              <td className="px-2 py-2 font-light">{row.contact_number}</td>
              <td className="px-4 py-2 mt-3 bg-[#26BADA] max-w-[120px] mr-4 flex-[1] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center  leading-4 block">{row.functional_group}</td>

            </tr>
          ))}
        </tbody>
      </table>
      <CustomPagination
        totalItems={rows.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

UserTable.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default UserTable;
