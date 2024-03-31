'use client'
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, Button, IconButton, MenuItem } from '@mui/material';
import { FaRegTrashCan, FaCirclePlus } from "react-icons/fa6";
import ContactList from './ContactList';
import { useGridStrategyProcessing } from '@mui/x-data-grid/hooks/core/strategyProcessing';
import { createBidTeamAction } from '@/app/api/rfx/actions/bidTeam';

const SelectTeam = (props) => {
    const { isOpen, handleClose, personaRecords } = props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [personaList, setPersonaList] = useState(personaRecords);
    const [teamMembers, setTeamMembers] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [contacts, setContacts] = useState(
        props.userRecords.map((item, index) => ({
            id: item.user_id,
            name: `${item.first_name} ${item.last_name}`,
            role: item.designation_title,
            image: item.user_profile_photo ? item.user_profile_photo : '/avatar.png'
        }))
    );

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };
    const handleCloseDialog = () => {
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
        setTeamMembers([...teamMembers, contact]);
    };
    
    // change user persona
    const handleSetUserPersona = (index, persona)=> {
        console.log(index, persona)
        let member = teamMembers[index]
        member = {...member, persona: persona}
        updateTeamMemberAtIndex(index, member);
    };

    // create bid team
    const handleSubmit = async()=> {
        if(teamMembers && teamMembers.length > 0 && teamName) {
            for(let i=0; i< teamMembers.length; i++) {
                let data = {
                    "user_id": teamMembers[i].id,
                    "index": 0,
                    "title": teamName,
                    "persona": teamMembers[i].persona,
                }
                let r1 = await createBidTeamAction(data)
            }
            setTeamMembers([]);
            setTeamName("");
            handleClose();
        }        
    };

    const companies = [
        { id: 1, name: 'Company A' },
        { id: 2, name: 'Company B' },
        { id: 3, name: 'Company C' },
    ];
    /*const contacts = [
        { id: 1, name: 'Bryan C', role: 'requester', image: '/bryan.jpg' },
        { id: 2, name: 'Chand Kumar', role: 'requester', image: '/chand.jpg' },
        { id: 3, name: 'James Bell', role: 'requester', image: '/james.jpg' },
        { id: 4, name: 'Lin Chau', role: 'requester', image: '/lin.jpg' },
        { id: 5, name: 'Maha Khan', role: 'requester', image: '/maha.jpg' },
        { id: 6, name: 'Marvin Lambert', role: 'requester', image: '/marvin.jpg' },
        { id: 7, name: 'Ravi K.', role: 'requester', image: '/ravi.png' },
        { id: 8, name: 'Rose Peters', role: 'requester', image: '/rose.jpg' },
    ];*/
    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle className='text-center p-8 font-semibold text-xl'>Make Team</DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    {/*<Grid item xs={12} className='mt-2'>
                        <TextField select fullWidth label="Select Company">
                            {companies.map((company) => (
                                <MenuItem key={company.id} value={company.name}>
                                    {company.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>*/}
                    <Grid item xs={12} className='mt-2'>
                        <TextField
                        fullWidth
                        name="team_name"
                        label="Team Name *"
                        onChange={(e)=>setTeamName(e.target.value)}
                        className='bg-white'
                        />
                        {!teamName && <p class="text-red-600/100 mb-3">Input the team name.</p>}

                    </Grid>
                    {/* Team members */}
                    {teamMembers.map((member, index) => (
                        <Grid key={member.id} item xs={12}>
                            <div className="flex items-center space-x-2 mb-2">
                                <Grid container alignItems="center" className='border border-gray-300 rounded-md p-1'>
                                    <Grid item xs={3} >
                                        <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <p className="font-medium">{member.name}</p>
                                    </Grid>
                                    <Grid item xs={3} className='flex items-center justify-end'>
                                        <IconButton aria-label="delete" size="small">
                                            <FaRegTrashCan />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <TextField select fullWidth variant="outlined" 
                                    size="large" 
                                    className='p-2'
                                    onChange={(e)=>{ handleSetUserPersona(index, e.target.value) }}
                                >
                                    {personaList.map((item) => (
                                        <MenuItem value={item.persona_role}>{item.persona_role}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </Grid>
                    ))}
                </Grid>
                {/* Add new member button */}
                <div className="border border-gray-200 rounded-md p-2 text-center">
                    <IconButton aria-label="add" color="primary" onClick={handleOpenDialog}>
                        <FaCirclePlus className='text-4xl text-[#26BADA ]' />
                    </IconButton>
                    <ContactList isOpen={isDialogOpen} handleClose={handleCloseDialog} contacts={contacts} handleAddContactToTeam={handleAddContactToTeam} />
                </div>
            </DialogContent>
            <DialogActions className='flex items-center justify-center'>
                <button onClick={handleClose} className='bg-[#26BADA] text-white border border-[#26BADA] rounded-md py-2 px-4 min-w-40'>CANCEL</button>
                <button
                    onClick={handleSubmit}
                    className='bg-white text-[#26BADA] border border-[#26BADA] rounded-md py-2 px-4 min-w-40'
                >DONE</button>
            </DialogActions>
        </Dialog>
    );
};

export default SelectTeam;
