import React, { useState, useEffect } from 'react';
import { getUsers } from "@/app/api/rfx/actions/rfx";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  InputAdornment,
} from '@mui/material';
import { Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';

let contacts = [
  { id: 1, name: 'Bryan C', image: '/bryan.jpg' },
  { id: 2, name: 'Chand Kumar', image: '/chand.jpg' },
  { id: 3, name: 'James Bell', image: '/james.jpg' },
  { id: 4, name: 'Lin Chau', image: '/lin.jpg' },
  { id: 5, name: 'Maha Khan', image: '/maha.jpg' },
  { id: 6, name: 'Marvin Lambert', image: '/marvin.jpg' },
  { id: 7, name: 'Ravi K.', image: '/ravi.png' },
  { id: 8, name: 'Rose Peters', image: '/rose.jpg' },
];


const ContactDialog = ({ isOpen, handleClose, handleContactSelect, users }) => {
  const [searchText, setSearchText] = useState('');
  const [usersData, setUsersData] = useState([]);
  
    
  contacts = users && users.map((user) => ({
    user_id: user.user_id,
    name: `${user.first_name} ${user.last_name}`,
    designation: user.designation_title,
    image: user.user_profile_photo,
  })); 
      
  

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