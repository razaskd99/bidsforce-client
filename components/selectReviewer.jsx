import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DynamicDatePicker from '@/components/DatePickerInput';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Input, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from "dayjs";

const SelectReviewerDialog = ({ open, onClose, onDone, usersRec }, props) => {
    const [issuedDate, setIssuedDate] = useState(new Date().toISOString().slice(0, 10));
    const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
    const [users, setUsers] = useState([
        { name: '', role: '', date: null, duedate: new Date().toISOString().slice(0, 10), issueddate: new Date().toISOString().slice(0, 10) },        
    ]);
    const datePickerLabels = ["Issue Date", "Due Date"]
    const teamMembers = usersRec?.map((contact) => ({
        id: contact.user_id,
        name: `${contact.first_name} ${contact.last_name}`,
        designation: contact.designation_title,
        image: contact.user_profile_photo ? contact.user_profile_photo : '/avatar.jpg',
    }));
    const typeInput = [
        { id: 1, role: 'Reviewer' },
        { id: 2, role: 'Approver' },
    ]
    const [selectedUserIndex, setSelectedUserIndex] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event, index) => {
        setAnchorEl(event.currentTarget);
        setSelectedUserIndex(index);
    };

    const handleMenuItemClick = (selectedUser) => {        
        setUsers((prevUsers) =>
            prevUsers.map((user, index) =>
                index === selectedUserIndex ? { ...user, name: selectedUser.name, image: selectedUser.image, id: selectedUser.id } : user
            )
        );
        handleClose();  
    };

    const handleMenuItemChangeRole = (e, index) => {
        const updateRole = users
        if(updateRole[index].name && updateRole[index].name != null) {
            updateRole[index].role = e.target.value
            updateRole[index].duedate = dueDate
            updateRole[index].issueddate = issuedDate
        }
        setUsers(updateRole)        
        
    }

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedUserIndex(null);
    };

    const handleUserChange = (index, field, value) => {
        setUsers((prevUsers) =>
            prevUsers.map((user, i) =>
                i === index ? { ...user, [field]: value } : user
            )
        );
    };

    const handleAddRow = () => {
        setUsers((prevUsers) => [...prevUsers, { name: '', role: '', date: null }]);
    };

    const handleDone = () => {
        // Implement your logic to handle the selected users
        onDone(users);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth style={{ padding: '20px' }}>
            <DialogTitle>Select Reviewer / Approver</DialogTitle>
            {/*<TextField label="Name" className='max-w-[90%] ml-[5%]' />*/}
            <DialogContent className='flex gap-4 items-start justify-center'>
                <div className='flex-[2]'>
                    {users.map((user, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <TextField
                                label="Name"
                                value={user.name}
                                onClick={(e) => handleClick(e, index)}
                                className='flex-[1]'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            {user.image && (
                                <Image
                                    src={user.image}
                                    width={24}
                                    height={24}
                                    className="rounded-full"
                                />)}
                            <TextField
                                select
                                label="Role"
                                className="bg-white w-full flex-[1] "
                                onChange={(e)=>handleMenuItemChangeRole(e, index)}
                            >
                                {typeInput.map((option) => (
                                    <MenuItem key={option.id} value={option.role} >
                                        {option.role}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </div>
                    ))}
                    <Button onClick={handleAddRow} startIcon={<AddCircleOutlineIcon />} className='w-full border border-gray-700'>
                        Add
                    </Button>
                </div>

                <div className="border mt-[18px] mb-3 rounded-md flex-[1]">
                    <div className="bg-[#00000005] py-2 px-[14px] " > Critical Dates</div>
                    <div className="bg-[#F4FCFD] px-4 py-5">
                        <DynamicDatePicker labels={datePickerLabels} />
                    </div>

                    <LocalizationProvider
                    key={"issued_date"}
                    dateAdapter={AdapterDayjs}
                    className="w-full bg-white "
                    >
                        <DemoContainer components={["DatePicker"]}>
                            <div id={"issued_date"} >
                            <DatePicker
                                label={"Issued Date"}
                                value={dayjs(issuedDate)}
                                onChange={(date) => setIssuedDate(new Date(date).toISOString().slice(0, 10))}
                            />
                            </div>
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider
                    key={"due_date"}
                    dateAdapter={AdapterDayjs}
                    className="w-full bg-white "
                    >
                        <DemoContainer components={["DatePicker"]}>
                            <div id={"due_date"}>
                            <DatePicker
                                label={"Due Date"}
                                value={dayjs(dueDate)}
                                onChange={(date) => setDueDate(new Date(date).toISOString().slice(0, 10))}
                            />
                            </div>
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
                    {teamMembers?.map((teamMember, index) => (
                        <MenuItem key={index} onClick={() => handleMenuItemClick(teamMember)}>
                            <Image
                                src={teamMember.image}
                                width={24}
                                height={24}
                                className="rounded-full"
                            />
                            <span className="ml-2">{teamMember.name}</span>
                        </MenuItem>
                    ))}
                </Menu>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleDone}>Done</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SelectReviewerDialog;
