import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from '@mui/material';
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
import { updateBidOrderAckByOrderIDAction } from '@/app/api/manager/actions/bidorder';


const OrderAcknowledgement = ({ open, handleClose, onYesClick, rfxID, tenantID, apiBackendURL, orderRow, login_user_id, dailogTitle, bidOrderAcknowledgementRow }) => {
  const [acknowledgementNotes, setAcknowledgementNotes] = useState('');
  const [acknowledgementDate, setAcknowledgementDate] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [attachedDocuments, setAttachedDocuments] = useState([]);
  const [selectedFilesMain, setSelectedFilesMain] = useState([]);

  const handleSubmitAcknowledgement = async () => {
    console.log("ORDER ACK DIALOG")
    if (!acknowledgementDate || !acknowledgementNotes) {
      alert("Provide Order Acknowledgemetn date and notes");
    } else {
      const data = {
        "acknowledged_by": login_user_id,
        "acknowledgement_document": 0,
        "acknowledgement_comment": acknowledgementNotes,
        "acknowledgement_date": acknowledgementDate,
        "acknowledged": true
      }
      
      let resp = await updateBidOrderAckByOrderIDAction(data, orderRow.bid_order_id)
      if (resp.statusCode == 200) {
        bidOrderAcknowledgementRow(resp.returnData)
        if (selectedFilesMain && selectedFilesMain?.length) { //upload files  
          uploadFiles(selectedFilesMain, apiBackendURL, tenantID, orderRow.rfx_id, 'order-acknowledgement-', orderRow.bid_order_id)
          for (const item of selectedFilesMain) {
            let file = { name: item.name, size: item.size, type: item.type }
            resp = await createDocUploadAction(orderRow.rfx_id, login_user_id, file, 'order-acknowledgement-' + orderRow.bid_order_id)
          }
        }
        let r1 = await movetoNextStageAction(orderRow.rfx_id)
      }
      setAcknowledgementDate('')
      setAcknowledgementNotes('')
      handleClose(true, acknowledgementDate, acknowledgementNotes)
      onYesClick()
    }
    
  }



  return (
    <Dialog open={open} onClose={handleClose} >
      <div className="min-w-[600px] px-4 py-6">
        <DialogTitle className='text-center mb-3'>{dailogTitle}</DialogTitle>
        <DialogContent>
          
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
          <button className='border border-[#26BADA] text-[#26BADA] min-w-[200px] rounded-md uppercase px-10 py-3  ' onClick={handleClose}>Cancel</button>
          <button className='bg-[#26BADA] text-[#FFFFFF] min-w-[200px] rounded-md uppercase px-10 py-3  ' onClick={() => { handleSubmitAcknowledgement(); }}>YES</button>

        </DialogActions>
      </div>
    </Dialog>
  );
};

export default OrderAcknowledgement;
