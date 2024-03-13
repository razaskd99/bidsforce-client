import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextareaAutosize, FormControl } from '@mui/material';
// import PopupInput1 from './PopupInput1';
import PopupInputtest from './PopupTest';


const BidDialog = ( props) => {
  return (
    <Dialog open={props.openBid} onClose={props.handleBidClose}>
      <div className="min-w-[600px] px-4 py-6">
        <DialogTitle className='text-center mb-3'>Assign Bid Request</DialogTitle>
        <DialogContent>
          <div className="border mb-3 rounded-md">
            <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Submit to</div>
            <div className="bg-[#F4F5F6] p-6 flex items-center flex-col gap-3">
              <PopupInputtest
                label={"Select Contact or Select Team "}
                className="w-full"
                keyContactsRec={props?.keyContactsRec}
                onPersonSelect={props?.onPersonSelect} // Pass down the function to update selected person
                setPersonAssignTo={props?.setPersonAssignTo}
             />
            </div>
          </div>
        </DialogContent>
        <DialogActions className='flex justify-center gap-3 my-5'>
          <button className='border border-[#26BADA] text-[#26BADA] min-w-[200px] rounded-md uppercase px-10 py-3  ' onClick={props.handleBidClose}>Cancel</button>
          <button className='bg-[#26BADA] text-[#FFFFFF] min-w-[200px] rounded-md uppercase px-10 py-3  ' onClick={() => { props?.handleBidClose(); props?.onYesButtonClick();}}>YES</button>

        </DialogActions>
      </div>
    </Dialog>
  );
};

export default BidDialog;
