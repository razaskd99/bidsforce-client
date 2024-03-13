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
import { uploadFiles } from '@/app/api/util/utility';
import { movetoNextStageAction } from '@/app/api/rfx/stages';
import { createDocUploadAction } from '@/app/api/rfx/actions/rfx';
import { createBidClarificationAction, getBidClarificationRecordsByIdAction } from '@/app/api/manager/actions/bidclarifications';
import { getRfxContactsByKey } from '@/app/api/rfx/actions/rfx';
import { GetRfxDocumentsBy_RfxID_Key_Action } from '@/app/api/rfx/actions/rfx';
import { createContactsAction } from '@/app/api/rfx/actions/rfx';
import { getAllBidClarificationRecordsBy_RfxID_Action } from '@/app/api/manager/actions/bidclarifications';


const RevisionDialog = ({ open, handleClose, onYesClick, rfxID, tenantID, apiBackendURL, rows, dailogTitle, login_user_id , setBidClarificationRows, setBidRevisionRows}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [attachedDocuments, setAttachedDocuments] = useState([]);
  const [selectedFilesMain, setSelectedFilesMain] = useState([]);
  const [selectedIDList, setSelectedIDList] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  

  const handleSubmitRevision = async () => {
console.log(selectedIDList)
    if (selectedIDList.length == 0) {
      alert("Please select a bid clarification for revision.");
    } else if (!notes || !dueDate) {
      alert("Provide the due date and notes");
    } else {
      
      for(let i=0; i<selectedIDList.length; i++){
        // get bid clarif record
        let r1 = await getBidClarificationRecordsByIdAction(selectedIDList[i])
        let bidrec = r1.returnData
        // create bid clarif r1 record
        const data = {
          "rfx_id": bidrec?.rfx_id,
          "submitted_by": bidrec?.submitted_by,
          "assigned_to": bidrec?.assigned_to,
          "reference_num": bidrec?.reference_num,
          "title": bidrec?.title + ' R1',
          "type": bidrec?.type,
          "status": 'Revision',
          "description": notes,
          "issued_date": bidrec?.issued_date,
          "due_date": dueDate,
          "completed": false,
        }
        const r2 = await createBidClarificationAction(data)
        const bid_clarif_id_r1 = r2.returnData?.bid_clarification_id        
        
        if(bid_clarif_id_r1){          
          // get bid clarif contacts
          const r3 = await getRfxContactsByKey(bidrec.rfx_id, 'bid-clarifications-' + selectedIDList[i])
          let contacts = r3.rfxData
          // create bid clarif r1 contacts
          for (var i = 0; i < contacts.length; i++) {
            let r4 = await createContactsAction(bidrec.rfx_id, contacts[i].contact_user_id, 'bid-clarifications-' + bid_clarif_id_r1)
          }
          // create bid clarif r1 docs
          if (selectedFilesMain.length > 0) {
            uploadFiles(selectedFilesMain, apiBackendURL, tenantID, bidrec.rfx_id, 'bid-clarifications')
            for (var i = 0; i < selectedFilesMain.length; i++) {
                const file = {
                    name: selectedFilesMain[i].name,
                    type: selectedFilesMain[i].type,
                    size: selectedFilesMain[i].size,
                };
                let r5 = await createDocUploadAction(bidrec.rfx_id, login_user_id, file, 'bid-clarifications-' + bid_clarif_id_r1)
            }
          }
          // get bid clarif records
          let r6 = await getAllBidClarificationRecordsBy_RfxID_Action(bidrec.rfx_id)
          let bidrows = r6.returnData
          setBidClarificationRows(
            bidrows && bidrows.map((calr, index) => ({
              id: calr.bid_clarification_id,
              Title: calr.title,
              Type: calr.type,
              RefrenceNum: calr.reference_num,
              IssuedDate: calr.issued_date,
              DueDate: calr.due_date,
              Status: calr.status
            }))
          );
          // set bid revision 
          setBidRevisionRows(
            bidrows
            .filter((calr) => calr.status === 'Revision')
            .map((calr, index) => ({
                id: calr.bid_clarification_id,
                Title: calr.title,
                Type: calr.type,
                RefrenceNum: calr.reference_num,
                IssuedDate: calr.issued_date,
                DueDate: calr.due_date,
                Status: calr.status
            }))
          );
          handleReset();
        }
        
        
      }     
      handleClose(true, dueDate, notes)      
    }
  }
  
  
  const handleReset =()=>{
    setAttachedDocuments([])
    setSelectedFilesMain([])
    setDueDate('')
    setNotes('')
    setSelectedIDList([])
  }

  const handleChangeCheckBox = (id)=> {
    
    if (selectedIDList.includes(id)) {
      setSelectedIDList(selectedIDList.filter((item) => item === id));
    } else {
      setSelectedIDList([...selectedIDList, id]);
    }
    console.log(selectedIDList.length)
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
                  <div className='w-[10%] p-1 flex items-center'>
                    <input type="checkbox" value={row.id} onChange={()=>handleChangeCheckBox(row.id)} />
                  </div>
                  <div className='w-[30%] p-1 truncate overflow-hidden text-[#778CA2]'>{row.RefrenceNum}</div>
                  <div className='w-[30%] p-1 truncate overflow-hidden'>{row.Title}</div>
                  <div className='w-[30%] p-1 truncate overflow-hidden'>{row.Type}</div>
                </div>
              ))}
            </div>
          )}



          <TextareaAutosize
            minRows={3}
            placeholder="Notes *"
            className="w-full border rounded p-2 mb-4"
            onChange={(e) => setNotes(e.target.value)}
          />
          <FormControl fullWidth className="mb-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker onChange={(date) => setDueDate(new Date(date).toISOString().slice(0, 10))} label="Due Date *" className='max-w-[80%]' />
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>
          {/* <FileUpload /> */}
          <DragDrop setSelectedFilesMain={setSelectedFilesMain} setSelectedFiles={setSelectedFiles} setAttachedDocuments={setAttachedDocuments} storedDocuments={[]} />
        </DialogContent>
        <DialogActions className='flex justify-center gap-3 my-5'>
          <button className='border border-[#26BADA] text-[#26BADA] min-w-[200px] rounded-md uppercase px-10 py-3  ' onClick={handleClose}>Cancel</button>
          <button className='bg-[#26BADA] text-[#FFFFFF] min-w-[200px] rounded-md uppercase px-10 py-3  ' onClick={() => { handleSubmitRevision();   }}>YES</button>

        </DialogActions>
      </div>
    </Dialog>
  );
};

export default RevisionDialog;
