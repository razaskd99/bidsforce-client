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


const UploadDialog = ({ open, handleClose, onYesClick, rfxID, tenantID, apiBackendURL, rows,dailogTitle }) => {
  const [acknowledgementNotes, setAcknowledgementNotes] = useState('');
  const [acknowledgementDate, setAcknowledgementDate] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [attachedDocuments, setAttachedDocuments] = useState([]);
  const [selectedFilesMain, setSelectedFilesMain] = useState([]);

  const handleSubmitAcknowledgement = async () => {

    if (!acknowledgementDate || !acknowledgementNotes) {
      alert("Provide the date and notes");
    } else {
      let resp = await updateAcknowledgementAction(rfxID, acknowledgementNotes, acknowledgementDate)
      if (resp.statusCode == 200) {
        setAcknowledgementDate(acknowledgementDate)

        if (selectedFilesMain && selectedFilesMain.length) { //upload files  
          uploadFiles(selectedFilesMain, apiBackendURL, tenantID, rfxID, 'rfx-acknowledgement')
          for (const item of selectedFilesMain) {
            let file = { name: item.name, size: item.size, type: item.type }
            resp = await createDocUploadAction(rfxID, 0, file, 'rfx-acknowledgement')
          }
        }
      }
      handleClose(true, acknowledgementDate, acknowledgementNotes)
    }
  }
  console.log(rows)


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
          <button className='border border-[#26BADA] text-[#26BADA] min-w-[200px] rounded-md uppercase px-10 py-3  ' onClick={handleClose}>Cancel</button>
          <button className='bg-[#26BADA] text-[#FFFFFF] min-w-[200px] rounded-md uppercase px-10 py-3  ' onClick={() => { handleSubmitAcknowledgement(); onYesClick() }}>YES</button>

        </DialogActions>
      </div>
    </Dialog>
  );
};

export default UploadDialog;
