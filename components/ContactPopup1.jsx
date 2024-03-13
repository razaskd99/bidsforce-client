import React, { useState } from 'react';
import {Dialog,DialogTitle,DialogContent,TextField,IconButton,List,ListItem,  ListItemAvatar,  Avatar,  ListItemText,  InputAdornment  } from '@mui/material';
import { Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';

const ContactDialog = ({ isOpen, handleClose,handleContactSelect, contacts }) => {
  const [searchText, setSearchText] = useState('');

  const filteredContacts = contacts?.filter(contact =>
    contact.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchChange = event => {
    setSearchText(event.target.value);
  };
  const handleContactClick = contact => {
    handleContactSelect(contact);
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Contacts
        <IconButton aria-label="close" onClick={handleClose} style={{ position: 'absolute', right: 0 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Search"
          variant="outlined"
          className='mt-2'
          fullWidth
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {filteredContacts?.map(contact => (
            <ListItem key={contact.id} className='border-b border-gray-200 cursor-pointer' onClick={() => handleContactClick(contact)}>
              <ListItemAvatar>
                <Avatar alt={contact.name} src={contact.image} />
              </ListItemAvatar>
              <ListItemText primary={contact.name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
