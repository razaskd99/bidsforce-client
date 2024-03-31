'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import NewContact from './NewContact';

const OpenContact = ({designationRecords, companyRecords, teamRecords}) => {
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
            New Contact
            <Image src="add-blue.svg" width={18} height={21} alt="add" />
        </p> 
      <NewContact isOpen={open} handleClose={handleClose} designationRecords={designationRecords} companyRecords={companyRecords} teamRecords={teamRecords}/>
    </div>
  );
}
export default OpenContact
