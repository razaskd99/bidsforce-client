import React from "react";
import { TextField, Popper, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import { FiPlusCircle } from "react-icons/fi";

const ContactInput = ({ open, setOpen, anchorEl, setAnchorEl, selectedContact, setSelectedContact, label }) => {
  const handleInputClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setOpen(false);
  };

  const contacts = [
    { name: "John Doe", image: "/man.jpeg" },
    { name: "Jane Smith", image: "man2.png" },
    { name: "Michael Johnson", image: "girl.jpg" }
  ];

  return (
    <div className="my-4">
      <TextField
        variant="outlined"
        label={label}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <div className="flex items-center w-full justify-between">
              {selectedContact && (
                <Avatar alt={selectedContact.name} src={selectedContact.image} style={{ marginRight: "8px" }} />
              )}
              <span>{selectedContact ? selectedContact.name : ""}</span>
              <FiPlusCircle onClick={handleInputClick} className="mr-2 cursor-pointer text-lg text-[#26BADA]" />
            </div>
          )
        }}
        className="bg-white w-full"
      />
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        className="z-[1500] absolute"
      >
        <Paper>
          <List>
            {contacts.map((contact, index) => (
              <ListItem key={index} button onClick={() => handleContactSelect(contact)}>
                <ListItemAvatar>
                  <Avatar alt={contact.name} src={contact.image} />
                </ListItemAvatar>
                <ListItemText primary={contact.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
    </div>
  );
};

export default ContactInput;
