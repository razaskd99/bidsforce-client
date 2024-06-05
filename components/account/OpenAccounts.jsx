'use client'
import React, { useState } from 'react';
import NewAccounts from './NewAccounts';
import Image from 'next/image';


const OpenAccounts = (props) => {
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
            New Account 
            <Image src="add-blue.svg" width={18} height={21} alt="add" />
        </p> 
      <NewAccounts isOpen={open} handleClose={handleClose} allAccountsTypeRecord={props.allAccountsTypeRecord}  contactsRecords={props.contactsRecords}/>
    </div>
  );
}



export default OpenAccounts
