// SkipDialog.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const SkipDialog = ({ open, handleClose, handleSkipSubmit, updateParentSkipReason }) => {
  const [skipReason, setSkipReason] = useState('');

  const handleReasonChange = (event) => {
    const newSkipReason = event.target.value;
    setSkipReason(newSkipReason);
    updateParentSkipReason(newSkipReason); // Callback to update parent state
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleSubmit = () => {
    handleSkipSubmit(skipReason);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className='p-5' maxWidth='sm' fullWidth>
      <DialogTitle className='text-center font-medium mb-2'>Reason to Skip?</DialogTitle>
      <DialogContent>
        <TextField
          multiline
          rows={4}
          variant="outlined"
          placeholder="Type reason here..."
          fullWidth
          value={skipReason}
          onChange={handleReasonChange}
        />
      </DialogContent>
      <DialogActions className='flex justify-center gap-5 mb-5'>
        <Button onClick={handleCancel} className='border border-[#26BADA] px-5 py-2 min-w-[200px]' style={{ border: '1px solid #26BADA' }}>Cancel</Button>
        <Button onClick={handleSubmit} className='border border-[#26BADA] text-white bg-[#26BADA] px-5 py-2 min-w-[200px]'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SkipDialog;
