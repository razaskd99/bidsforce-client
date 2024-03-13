import React from 'react';
import { Dialog, DialogContent, Typography, IconButton } from '@mui/material';
import { Warning } from '@mui/icons-material';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const Alert = ({ open, onClose, message }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogContent>
                <div className='flex items-start justify-end'>
                    <IconButton onClick={onClose}>
                        <IoMdCloseCircleOutline />
                    </IconButton>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Warning color="warning" style={{ fontSize: 48 }} />
                </div>
                <Typography variant="h6" align="center" gutterBottom>
                    {message}
                </Typography>
                <Typography variant="body2" align="center" color="textSecondary">
                    This is a warning message.
                </Typography>

            </DialogContent>
        </Dialog>
    );
};

export default Alert;
