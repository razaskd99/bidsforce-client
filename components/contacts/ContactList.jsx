import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, TextField, Grid } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';

const ContactList = ({ isOpen, handleClose, contacts, handleAddContactToTeam }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter contacts based on search term
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleAddContact = (contact) => {
        handleAddContactToTeam(contact);
        handleClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Contacts
                <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 0, top: 0 }}>
                    <IoClose />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {/* Search bar */}
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    sx={{ mb: 2 }}
                    className='mt-2'
                />
                {/* List of contacts */}
                {filteredContacts.map(contact => (
                    <div key={contact.id} className='flex items-center justify-start gap-4  p-2 cursor-pointer border-b border-gray-300' onClick={() => handleAddContact(contact)}>
                        <img src={contact.image} alt={contact.name} width={30} height={30} className='rounded-full object-cover' />
                        <p style={{ textAlign: 'center' }}>{contact.name}</p>
                    </div>
                ))}
            </DialogContent>
        </Dialog>
    );
};

export default ContactList;
