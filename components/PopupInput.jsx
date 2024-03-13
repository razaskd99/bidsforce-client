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

const PopupInput = ({ label, className, users, onCloseDialog, setAddedContacts }) => {
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
        setAddedContacts((prevContacts) => [...prevContacts, {...person, contact_key: contactKey}]);    
        setPersons((prevContacts) => [...prevContacts, {...person, contact_key: contactKey}]);    
        onCloseDialog(persons);
        setModalOpen(false);
        setSelectedPerson({...person, contact_key: contactKey});       
        
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
            <IconButton onClick={handleModalOpen} className="right-4 " style={{ position: 'absolute' }}>
                <Image src="/add-blue.svg" width={18} height={21} />
            </IconButton>
            <Dialog open={isModalOpen} onClose={handleModalClose} >
                <div className="p-4 w-[600px]">
                    <DialogTitle className="text-center font-medium text-[26px] mb-4">
                        <div class="fkex jutify-center mb-6 md:grid-cols-2">
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Key</label>
                            <input 
                                type="text" 
                                name="contact_key" 
                                onChange={(e)=>setContactKey(e.target.value)}
                                style={{ border: !contactKey ? '1px solid red' : '1px solid #ccc' }} 
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="RFx Contact Key" 
                                required 
                            />
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
                                                {person?.user_profile_photo ?
                                                    <Image src="/man.jpeg" width={38} height={38} />
                                                    : <Image src="/images/users/profile.jpg" width={38} height={38} />

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