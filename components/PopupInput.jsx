'use client'
import { TextField } from "@mui/material"
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
    Typography, IconButton, Avatar, Button, Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import Image from "next/image";
import { HiOutlineTrash } from "react-icons/hi2";

const PopupInput = ({ label, className, users, onCloseDialog, setAddedContacts, personas }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState('');
    // const [persons, setPersons] = useState(users);
    const [persons, setPersons] = useState([]);
    const [contactKey, setContactKey] = useState("");
    
  

     const handleModalOpen = () => {
        setModalOpen(true);
      };

     const handleModalClose = (person) => {
        setModalOpen(false);
        //onCloseDialog(person); // Call the callback function provided by the parent component
    };

    const handlePersonSelect = (person) => {        
        setAddedContacts((prevContacts) => [...prevContacts, {...person, contact_key: 'rfx', persona_role: contactKey}]);    
        setPersons((prevContacts) => [...prevContacts, {...person, contact_key: 'rfx', persona_role: contactKey}]);    
        onCloseDialog(persons);
        setModalOpen(false);
        setSelectedPerson({...person, contact_key: 'rfx', persona_role: contactKey});       
        setContactKey("")
        //handleModalClose(person);
        console.log('Selected Person:', persons);
    };

    const open = Boolean(anchorEl);

    return (
        <div className={`flex items-center bg-white relative ${className}`}>
            <TextField
                variant="outlined"
                label={contactKey ?? label}
                value={selectedPerson ? selectedPerson.first_name +' '+ selectedPerson.last_name : ''}
                className="w-full  pointer-events-none "
                data_user_id={selectedPerson.user_id}                
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className="right-[30%] left-[50%]" style={{ position: 'absolute' }}>{selectedPerson.persona_role}</span>      
            <IconButton onClick={handleModalOpen} className="right-4 " style={{ position: 'absolute' }}>
                <Image src="/add-blue.svg" width={18} height={21} />
            </IconButton>
            <Dialog open={isModalOpen} onClose={handleModalClose} >
                <div className="p-4 w-[600px]">
                    <DialogTitle className="text-center font-medium text-[26px] mb-4">
                        <div className="fkex jutify-center mb-1 md:grid-cols-2">
                            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Persona Role</label>
                            <select
                                id="persona_role"
                                className="block w-full px-4 py-4 text-sm border rounded-sm border-gray-300 hover:border-black"
                                onChange={(e) => setContactKey(e.target.value)}
                            >
                                <option value={''}>Select Persona</option>
                                {personas?.map((option) =>                  
                                    <option key={option.persona_role} value={option.persona_role}>
                                    {option.persona_role}
                                    </option>                  
                                )}
                            </select>
                            {!contactKey && <label for="first_name" className="block my-2 text-sm font-medium text-red-600 ">Select persona from the above list.</label>}
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="">
                            <div className="px-7 py-3 text-[#778CA2] bg-[#F3F5F6]" >Select Contact</div>
                            <div className="bg-[#F8FAFB] px-7 py-3">
                                {/* List of Persons */}
                                {users?.map((person) => (
                                    <div className="flex justify-between w-full bg-white mb-2 px-2 py-1" key={person.user_id}>
                                        <div className="flex flex-[1] border border-[#E8ECEF] rounded-3xl items-center px-1">
                                            <Avatar className="mr-2">
                                                {
                                                <Image src={person.profile_image ? person.profile_image : '/avatar.png'} width={38} height={38} />
                                                }
                                            </Avatar>
                                            <div className="">
                                                <Typography variant="subtitle1" className="font-medium">{person.first_name + ' ' + person.last_name}</Typography>
                                                <Typography variant="body2" className="text-[#778CA2]">{person.user_role}</Typography>
                                            </div>
                                            <div className="ml-auto py-0.5 px-[10px] text-[10px] bg-[#FE4D9745] text-[#FE4D97] mr-3">E</div>
                                        </div>
                                        <div className="flex flex-[1] items-center justify-between px-2">
                                            <div className=""><HiOutlineTrash className="text-[#778CA2]" /></div>
                                            <div className=""><IoIosAddCircleOutline className="text-[#26BADA] cursor-pointer" onClick={contactKey ? () => handlePersonSelect(person) : ()=>false } /></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleModalClose}>Cancel</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    )
}

export default PopupInput