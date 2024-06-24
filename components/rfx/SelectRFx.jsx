"use client";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
  } from "@mui/material";
import Link from "next/link";
import RevisionRFx from "./RevisionRFx"
import NewRFx from "./NewRfx"
import { useState } from "react";



const SelectRFx = ({
  open,
  handleCloseRFx,
  preRfxData,
  rfxBidValidity,
  rfxType,
  rfxContentSubmission,
  rfxSubmissionMode,
  rfxStage,
  data,
  usersRecords,
}) => {

    const [newRfx, setNewRfx] = useState(false);
    const [revisionRfx, setRevisionRfx] = useState(false);

    const handleOpenNewRFx = () => {
      setNewRfx(true);
        
    };
    const handleCloseNewRFx = () => {
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
      <Dialog open={open} onClose={handleCloseRFx} maxWidth="sm" fullWidth  PaperProps={{
        style: {
          minHeight: '300px' // Set your desired height here
        }
      }}>
        <DialogTitle><span className='text-2xl font-semibold text-center my-8' >What Kind of RFx Request would you like to create?</span></DialogTitle>
        <DialogContent>
          <Link
          href="#"
          onClick={handleOpenNewRFx}   
          className=" flex justify-center items-center text-[#26BADA] border-[#26BADA] bg-white border rounded-md py-3 mt-[10px] mb-[18px]"
          >
            NEW REQUEST
          </Link>

          <NewRFx 
            open={newRfx}
            close={handleCloseNewRFx}
            rfxRecordType = "New"          
            rfxBidValidityList={rfxBidValidity}
            rfxTypeList={rfxType}
            rfxContentSubmissionList={rfxContentSubmission}
            rfxSubmissionModeList={rfxSubmissionMode}
            rfxStageList={rfxStage} 
            usersRecords={usersRecords}
            oppData={data}
          />

          <Link
          onClick={handleOpenRevision}
          href="#"    
          className="flex justify-center items-center text-[#26BADA] border-[#26BADA] bg-white border rounded-md py-3 mt-[10px] mb-[18px]"
          >
          REVISION REQUEST
          </Link>

          <NewRFx 
          open={revisionRfx}
          close={handleCloseRevision} 
          rfxRecordType = "Revision" 
          rfxBidValidityList={rfxBidValidity}
          rfxTypeList={rfxType}
          rfxContentSubmissionList={rfxContentSubmission}
          rfxSubmissionModeList={rfxSubmissionMode}
          rfxStageList={rfxStage} 
          usersRecords={usersRecords}
          oppData={data}
          />

        </DialogContent>
      </Dialog>   
    </>
  );
}
export default SelectRFx;
