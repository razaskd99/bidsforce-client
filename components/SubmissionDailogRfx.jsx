import { useState } from 'react';
import {Dialog,DialogTitle,DialogContent,DialogActions,Button,TextareaAutosize,FormControl,InputLabel,  Input,InputAdornment,  IconButton,} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FileUpload from './FileUpload';
import DragDrop from '@/components/FileInput';
import { updateAcknowledgementAction } from '@/app/api/rfx/actions/rfx';
import { uploadFiles } from '@/app/api/util/utility';
import { movetoNextStageAction } from '@/app/api/rfx/stages';
import { createDocUploadAction } from '@/app/api/rfx/actions/rfx';
import { updateBidSubmissionAckBySubIDAction } from '@/app/api/manager/actions/bidsubmissionack';


const SubmissionDialogRfx = ({ open, handleClose, rfxID, tenantID, apiBackendURL, rows,dailogTitle, bid_submission_id, login_user_id , bidBubmissionRow, setSubmissionAcknowledgement, handleChangeStatus}) => {
  const [acknowledgementNotes, setAcknowledgementNotes] = useState('');
  const [acknowledgementDate, setAcknowledgementDate] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [attachedDocuments, setAttachedDocuments] = useState([]);
  const [selectedFilesMain, setSelectedFilesMain] = useState([]);

  const handleSubmitAcknowledge = async()=> {
    if (!acknowledgementDate || !acknowledgementNotes) {
      alert("Provide the date and notes");
      return;
    } else {
      const data = {
        "bid_submission_id": bidBubmissionRow.bid_submission_id,
        "acknowledgement_deadline": "2024-03-08",
        "acknowledgement_comment": acknowledgementNotes,
        "acknowledged_by": login_user_id,
        "acknowledgement_date": acknowledgementDate,
        "acknowledged": true
      }
      let r1 = await updateBidSubmissionAckBySubIDAction(data, bidBubmissionRow.bid_submission_id)
      setSubmissionAcknowledgement(r1.returnData)
      // create documents
      if (r1.statusCode == 200 && selectedFilesMain.length > 0) {
        uploadFiles(selectedFilesMain, apiBackendURL, tenantID, bidBubmissionRow.rfx_id, 'bid-submission-acknowledgement-' + bidBubmissionRow.bid_submission_id)
        for (var i = 0; i < selectedFilesMain.length; i++) {
            const file = {
                name: selectedFilesMain[i].name,
                type: selectedFilesMain[i].type,
                size: selectedFilesMain[i].size,
            };
            let clarif_post_id = r1.returnData.rfx_clarification_post_id
            let r2 = await createDocUploadAction(bidBubmissionRow.rfx_id, login_user_id, file, 'bid-submission-acknowledgement-' + bidBubmissionRow.bid_submission_id)            
        }
        //move stage
        let r3 = await movetoNextStageAction(bidBubmissionRow.rfx_id)
        handleChangeStatus()
      }
    }    

    handleClose()
    setAcknowledgementDate('')
    setAcknowledgementNotes('')
  }


  return (
    <Dialog open={open} onClose={handleClose} >
      <div className="min-w-[600px] px-4 py-6">
        <DialogTitle className='text-center mb-3'>{dailogTitle}</DialogTitle>
        <DialogContent>
          {rows && (
            <div className="flex flex-col">
              <p className='text-[#778CA2] text-sm'>Please select proposal(s) for revision</p>
              {rows.map((row, index) => (
                <div key={index} className="flex mb-4 shadow-md p-1 text-sm w-full">
                  <div className='w-[10%] p-1 flex items-center'><input type="checkbox" value={row.id} /></div>
                  <div className='w-[30%] p-1 truncate overflow-hidden text-[#778CA2]'>{row.RefrenceNum}</div>
                  <div className='w-[30%] p-1 truncate overflow-hidden'>{row.Title}</div>
                  <div className='w-[30%] p-1 truncate overflow-hidden'>{row.Type}</div>
                </div>
              ))}
            </div>
          )}



          <TextareaAutosize
            minRows={3}
            placeholder="Notes"
            className="w-full border rounded p-2 mb-4"
            onChange={(e) => setAcknowledgementNotes(e.target.value)}
          />
          <FormControl fullWidth className="mb-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker onChange={(date) => setAcknowledgementDate(new Date(date).toISOString().slice(0, 10))} label="Acknowledgement Date" className='max-w-[80%]' />
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>
          {/* <FileUpload /> */}
          <DragDrop setSelectedFilesMain={setSelectedFilesMain} setSelectedFiles={setSelectedFiles} setAttachedDocuments={setAttachedDocuments} storedDocuments={[]} />
        </DialogContent>
        <DialogActions className='flex justify-center gap-3 my-5'>
          <button className='uppercase p-[10px] min-w-[200px] w-[50%] border border-[#26BADA] text-[#26BADA] bg-white  rounded-md ' onClick={handleClose}>Cancel</button>
          <button className='uppercase p-[10px] min-w-[200px] w-[50%] bg-[#26BADA] text-white  rounded-md ' onClick={() => { handleSubmitAcknowledge();  }}>YES</button>

        </DialogActions>
      </div>
    </Dialog>
  );
};

export default SubmissionDialogRfx;
