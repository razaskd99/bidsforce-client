'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import SelectTeam from './SelectTeam';

const OpenTeamDailog = ({personaRecords, userRecords}) => {
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
            New Team
            <Image src="add-blue.svg" width={18} height={21} alt="add" />
        </p> 
      
    </div>
  );
}
export default OpenTeamDailog
