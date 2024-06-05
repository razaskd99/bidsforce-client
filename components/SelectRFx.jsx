"use client";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
  } from "@mui/material";
import Link from "next/link";
import NewRFx from "./forms/NewRfx";
import { useState } from "react";



const SelectRFx = (props) => {

  const {
    open,
    handleCloseRFx,
    preRfxData
} = props;

    const [isRevisionRFx, setIsRevisionRFx] = useState(false);
    const [newRfx, setNewRfx] = useState(false);
    const [revisionRfx, setRevisionRfx] = useState(false);

    const handleOpenNew = () => {
      setNewRfx(true);
        
    };
    const handleCloseNew = () => {
      handleCloseRFx();
      setNewRfx(false);
        
    };

    const handleOpenRevision = () => {
      setRevisionRfx(true);
    };
    const handleCloseRevision = () => {
      handleCloseRFx();
      setRevisionRfx(false);
        
    };



  return (
    <>
      <Dialog open={open} onClose={handleCloseRFx} maxWidth="sm" fullWidth>
        <DialogTitle>What Kind of RFx Request would you like to create?</DialogTitle>
        <DialogContent>
          <Link
          href="#"
          onClick={handleOpenNew}   
          className=" flex justify-center items-center text-[#26BADA] border-[#26BADA] bg-white border rounded-md py-3 mt-[10px] mb-[18px]"
          >
            NEW REQUEST
          </Link>

          <Link
          onClick={handleOpenRevision}
          href="#"    
          className="flex justify-center items-center text-[#26BADA] border-[#26BADA] bg-white border rounded-md py-3 mt-[10px] mb-[18px]"
          >
          REVISION REQUEST
          </Link>

          <NewRFx isOpen={revisionRfx} isClose={handleCloseRevision} preRfxData={preRfxData}/>

        </DialogContent>
      </Dialog>   
    </>
  );
}
export default SelectRFx;
