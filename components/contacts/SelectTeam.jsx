'use client'
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, Button, IconButton, MenuItem, Alert } from '@mui/material';
import { FaRegTrashCan, FaCirclePlus } from "react-icons/fa6";
import SearchingListInput from '../forms/SearchingListInput';
import { showModalError, showModalSuccess } from '@/app/api/rfx/utility';
import { createContactsTeamAction, deleteContactsTeamRecordAction, getAllContactsTeamByTitleAction } from '@/app/api/users/action/team';
import { Close } from '@mui/icons-material';
import { hideMainLoader102, showMainLoader102 } from '@/app/api/util/utility';

const SelectTeam = (props) => {    
    const { isOpen, handleClose, personaRecords, userRecords, selectedUsers, modalType } = props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [personaList, setPersonaList] = useState(personaRecords);
    const [teamMembers, setTeamMembers] = useState(selectedUsers ? selectedUsers : []);
    const [teamName, setTeamName] = useState(props.teamName ? props.teamName : "");
    const [isEdit, setIsEdit] = useState(modalType && modalType == 'edit' ? true : false);
    const [isFormDataChanged, setIsFormDataChanged] = useState(false);
    const [contacts, setContacts] = useState(
        userRecords.map((item, index) => ({
            id: item.user_id,
            name: `${item.first_name} ${item.last_name}`,
            role: item.job_title,
            image: item.profile_image ? item.profile_image : '/avatar.png'
        }))
    );


    useEffect(() => {
        // Initialize team members when selectedUsers prop changes
        if (selectedUsers) {
            setTeamMembers(selectedUsers);
        }
    }, [selectedUsers]);



    const handleOpenDialog = () => {
        setIsDialogOpen(true);a
    };
    const handleCloseDialog = () => {        
        setIsDialogOpen(false); 
        handleClose();            
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
        let idExists = {};
        if(isEdit && !isFormDataChanged) {
            idExists = teamMembers.some(member => member.id === contact.id);
        } else {
            idExists = teamMembers.some(member => member.id === contact.id);
        }
        if(idExists) {
            showModalError("Contact already exists in the list.");
        }        
        if((props?.teamName || teamName) && !idExists){
            if(isEdit && !isFormDataChanged) {
                contact = {...contact, team_title: teamName, role: ''}
                setTeamMembers([...teamMembers, contact]);
            } else {
                contact = {...contact, team_title: teamName, role: ''}
                setTeamMembers([...teamMembers, contact]);
            }  
            setIsFormDataChanged(true); 
        }   
                   
    };

    // Remove team member
    const handleRemoveContactFromTeam =(id) => {
        if(id > 0) {
            if(!isFormDataChanged) {
                const updatedTeamMembers = teamMembers.filter(member => member.id !== id);
                setTeamMembers(updatedTeamMembers);
            } else {
                const updatedTeamMembers = teamMembers.filter(member => member.id !== id);
                setTeamMembers(updatedTeamMembers);
            }
            setIsFormDataChanged(true);
        }            
    }
    
    // change user persona
    const handleSetUserPersona = (index, persona)=> {
        console.log(index, persona)
        let member = teamMembers[index]
        member = {...member, role: persona}
        updateTeamMemberAtIndex(index, member);
        setIsFormDataChanged(true);

    };

    // create users team
    const handleSubmit = async()=> {
        const roleNotSelected = teamMembers.some(member => member.role === "");        
        if(isEdit && !isFormDataChanged) {
            showModalError("You have not changed the team.");
            return
        }
        if(!isEdit && !teamName) {
            showModalError("Provide team name to create.");
            return;
        }
        if(!teamMembers || teamMembers.length == 0) {
            showModalError("No users added to the team.");
            return;
        }
        if(roleNotSelected) {
            showModalError("Assign role for each user in the list.");
            return;
        }                
        
        if(teamMembers && teamMembers.length > 0 && (teamName || props.teamName)) {
            showMainLoader102();
            const name = isEdit ? props.teamName : teamName;

            // check if team exists
            if(!isEdit){
                let r1 = await getAllContactsTeamByTitleAction(name);
                console.log(r1)
                if(r1.statusCode == 200) {
                    hideMainLoader102();
                    showModalError("Team with the name already exists.");
                    return; 
                }
            }           
            
            // first remove team
            if(isEdit && selectedUsers?.length) {
                for(let i=0; i< selectedUsers?.length; i++) {                   
                    const r2 = await deleteContactsTeamRecordAction(selectedUsers[i].contacts_team_id);                                   
                }  
            }
            // second add team
            for(let i=0; i< teamMembers.length; i++) {
                let data = {
                    "primary_contacts_id": teamMembers[i].id,
                    "team_title": name,
                    "team_role": teamMembers[i].role,
                    "status": 'Active'
                }
                let r3 = await createContactsTeamAction(data)                
                if(r3.statusCode == 200) {
                    // hideMainLoader102();
                    // handleClose();   
                    window.location.reload();                                  
                } else {
                    hideMainLoader102();
                    showModalError('Error: ' + r3.error);
                    return;
                }
            }
            //setTeamMembers([]);
            //setTeamName("");
            //hideMainLoader102(); 
        }        
    };


    hideMainLoader102();    
    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth PaperProps={{
            className: 'w-4/5 h-4/5'
          }}>
            <DialogTitle className='text-center p-8 font-semibold text-xl'>
                {isEdit ? 'Edit Team' : 'Create Team'}
            </DialogTitle> 
            <DialogContent>
                <Grid container spacing={3}>
                    
                    <Grid item xs={12} className='mt-2'>
                        <TextField
                            fullWidth
                            name="team_name"
                            label="Team Name *"
                            value={props.teamName ? props.teamName : teamName}
                            onChange={(e)=>setTeamName(e.target.value)}
                            className='bg-white'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SearchingListInput 
                            allSearchList={contacts}
                            onListSelect={handleAddContactToTeam}
                            placeHolder={'Select user... *'}
                            onlySelect={true}
                        />
                    </Grid>
                    <Grid item xs={12}>                        
                        <Grid item xs={12}>
                            {/* Team members */}
                            {!isFormDataChanged && selectedUsers?.length
                            ?
                            selectedUsers?.map((member, index) => (
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
                                            defaultValue={member.role}                                            
                                            onChange={(e)=>{ handleSetUserPersona(index, e.target.value) }}
                                        >
                                            {personaList.map((item) => (
                                                <MenuItem 
                                                    key={item.persona_role}
                                                    value={item.persona_role}
                                                    selected={item.persona_role === member.role}
                                                >{item.persona_role}</MenuItem>
                                            ))}
                                        </TextField >
                                        <Close 
                                            className='cursor-pointer'
                                            onClick={()=>handleRemoveContactFromTeam(member.id)}                                            
                                        />
                                    </div>
                                </Grid>
                            ))
                            :                            
                            teamMembers?.map((member, index) => (
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
                                            defaultValue={member.role}
                                            onChange={(e)=>{ handleSetUserPersona(index, e.target.value) }}
                                        >
                                            {personaList.map((item) => (
                                                <MenuItem 
                                                    key={item.persona_role}
                                                    value={item.persona_role}
                                                    selected={item.persona_role === member.role}
                                                >{item.persona_role}</MenuItem>
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
            <div className='flex justify-center items-center gap-3 py-3'>
                
                {isEdit
                ?
                    <button
                        onClick={handleSubmit}
                        className='bg-[#26BADA]  
                        text-white rounded-md px-4 py-2 min-w-[120px] uppercase'
                    >SAVE</button>
                :
                    <button
                        onClick={handleSubmit}
                        className='bg-[#26BADA]  
                        text-white rounded-md px-4 py-2 min-w-[120px] uppercase'
                    >ADD</button>
                }
                <button onClick={handleCloseDialog} className='bg-[#E8ECEF]  text-[#778CA2] rounded-md px-4 py-2 min-w-[120px] uppercase'>CANCEL</button>
            </div>
        </Dialog>
    );
};

export default SelectTeam;
