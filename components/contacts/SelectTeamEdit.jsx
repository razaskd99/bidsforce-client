'use client'
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, Button, IconButton, MenuItem, Alert } from '@mui/material';
import { FaRegTrashCan, FaCirclePlus } from "react-icons/fa6";
import SearchingListInput from '../forms/SearchingListInput';
import { showModalError, showModalSuccess } from '@/app/api/rfx/utility';
import { createContactsTeamAction } from '@/app/api/contacts/actions/team';
import { Close } from '@mui/icons-material';
import { hideMainLoader102, showMainLoader102 } from '@/app/api/util/utility';

const SelectTeamEdit = (props) => {    
    const { isOpen, handleClose, personaRecords, userRecords, selectedUsers, modalType } = props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [personaList, setPersonaList] = useState(personaRecords);
    const [teamMembers, setTeamMembers] = useState(
        selectedUsers?.map((item, index) => ({
            id: item.primary_contacts_id,
            name: `${item.first_name} ${item.last_name}`,
            role: item.job_title,
            image: item.profile_image ? item.profile_image : '/avatar.png'
        }))
    );
    const [teamName, setTeamName] = useState(props.teamName ? props.teamName : "");
    const [isEdit, setIsEdit] = useState(modalType && modalType == 'edit' ? true : false);
    const [contacts, setContacts] = useState(
        userRecords.map((item, index) => ({
            id: item.user_id,
            name: `${item.first_name} ${item.last_name}`,
            role: item.job_title,
            image: item.profile_image ? item.profile_image : '/avatar.png'
        }))
    );


    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };
    const handleCloseDialog = () => {
        setTeamMembers([]); 
        setTeamName('');
        setIsDialogOpen(false);        
    };
    
    // update team member at index
    const updateTeamMemberAtIndex = (index, updatedMember) => {
        // Create a copy of the teamMembers array
        const updatedTeamMembers = [...teamMembers];
   
        // Check if the index is within bounds
        if (index >= 0 && index < updatedTeamMembers.length) {
            // Update the object at the specified index
            updatedTeamMembers[index] = updatedMember;
    
            // Set the state with the updated array
            setTeamMembers(updatedTeamMembers);
        } else {
            console.error('Index out of bounds.');
        }
    };
    
    // Add team members
    const handleAddContactToTeam = (contact) => {        
        const idExists = teamMembers.some(member => member.id === contact.id);
        if(idExists) {
            showModalError("Contact already exists in the list.");
        }
        if(teamName && !idExists){
            contact = {...contact, team_title: teamName, team_role: ''}
            setTeamMembers([...teamMembers, contact]);
        }       
    };

    // Remove team member
    const handleRemoveContactFromTeam =(id) => {
        if(id > 0) {
            const updatedTeamMembers = teamMembers.filter(member => member.id !== id);
            setTeamMembers(updatedTeamMembers);
        }    
    }
    
    // change user persona
    const handleSetUserPersona = (index, persona)=> {
        console.log(index, persona)
        let member = teamMembers[index]
        member = {...member, team_role: persona}
        updateTeamMemberAtIndex(index, member);
    };

    // create bid team
    const handleSubmit = async()=> {
        const roleNotSelected = teamMembers.some(member => member.team_role === "");
        if(!teamName) {
            showModalError("Input Team name to create.");
            return;
        }
        if(!teamMembers || teamMembers.length == 0) {
            showModalError("Contacts not added to the team.");
            return;
        }
        if(roleNotSelected) {
            showModalError("Select role for each contacts in the list.");
            return;
        }
                
        
        if(teamMembers && teamMembers.length > 0 && teamName) {
            showMainLoader102();
            for(let i=0; i< teamMembers.length; i++) {
                let data = {
                    "primary_contacts_id": teamMembers[i].id,
                    "team_title": teamName,
                    "team_role": teamMembers[i].team_role,
                    "status": 'Active'
                }
                let r1 = await createContactsTeamAction(data)
                if(r1.statusCode == 200) {
                    showModalSuccess("Team created successfully.");
                    window.location.reload();
                } else {
                    showModalError(r1.error);
                    return;
                }
            }
            setTeamMembers([]);
            setTeamName("");
            //handleClose();
            hideMainLoader102();
        }        
    };


    hideMainLoader102();    
    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm" >
            <DialogTitle className='text-center p-8 font-semibold text-xl'>
                {isEdit ? 'Edit Team' : 'Create Team'}
            </DialogTitle> {console.log(selectedUsers)}
            <DialogContent>
                <Grid container spacing={3}>
                    
                    <Grid item xs={12} className='mt-2'>
                        <TextField
                            fullWidth
                            name="team_name"
                            label="Team Name *"
                            value={teamName}
                            onChange={(e)=>setTeamName(e.target.value)}
                            className='bg-white'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SearchingListInput 
                            allSearchList={contacts}
                            onListSelect={handleAddContactToTeam}
                            placeHolder={'Select user... *'}
                        />
                    </Grid>
                    <Grid item xs={12}>                        
                        <Grid item xs={12}>
                            {/* Team members */}
                            {teamMembers?.map((member, index) => (
                                <Grid key={index} item xs={12}>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Grid container alignItems="center" className='border border-gray-300 rounded-md p-1'>
                                            <Grid item xs={3} >
                                                <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full" />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <p className="font-medium">{member.name}</p>
                                            </Grid>
                                            {/*<Grid onClick={()=>handleRemoveContactFromTeam(member.id)} item xs={3} className='flex items-center justify-end'>
                                                <IconButton aria-label="delete" size="small">
                                                    <FaRegTrashCan />
                                                </IconButton>
                                            </Grid>*/}
                                        </Grid>
                                        <TextField select fullWidth variant="outlined" 
                                            size="large" 
                                            className='p-2'
                                            onChange={(e)=>{ handleSetUserPersona(index, e.target.value) }}
                                        >
                                            {personaList.map((item) => (
                                                <MenuItem value={item.persona_role}>{item.persona_role}</MenuItem>
                                            ))}
                                        </TextField >
                                        <Close 
                                            className='cursor-pointer'
                                            onClick={()=>handleRemoveContactFromTeam(member.id)}                                            
                                        />
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>                                       
                </Grid>
                {/* Add new member button */}
                {/* <div className="border border-gray-200 rounded-md p-2 text-center">
                    <IconButton aria-label="add" color="primary" onClick={handleOpenDialog}>
                        <FaCirclePlus className='text-4xl text-[#26BADA ]' />
                    </IconButton>
                    <ContactList isOpen={isDialogOpen} handleClose={handleCloseDialog} contacts={contacts} handleAddContactToTeam={handleAddContactToTeam} />
                </div> */}
            </DialogContent>
            <DialogContent>
                <Alert 
                severity="error" 
                id="modalErrorMessageAlert" 
                class="bg-red-100 border border-red-200 text-md text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
                style={{ display: 'none' }}>
                Invalid Operation.
                </Alert>
                <Alert
                severity="success" 
                id="modalSuccessMessageAlert" 
                class="bg-green-200 border border-teal-200 text-md text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
                style={{ display: 'none' }}>
                Operation successful.
                </Alert>
            </DialogContent>
            <DialogActions className='flex items-center justify-center'>
                <button onClick={handleClose} className='bg-[#26BADA] text-white border border-[#26BADA] rounded-md py-2 px-4 min-w-40'>CANCEL</button>
                {isEdit
                ?
                    <button
                        onClick={handleSubmit}
                        className='bg-white text-[#26BADA] border border-[#26BADA] rounded-md py-2 px-4 min-w-40'
                    >EDIT</button>
                :
                    <button
                        onClick={handleSubmit}
                        className='bg-white text-[#26BADA] border border-[#26BADA] rounded-md py-2 px-4 min-w-40'
                    >ADD</button>
                }
            </DialogActions>
        </Dialog>
    );
};

export default SelectTeamEdit;
