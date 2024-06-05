'use client'

import React,{useState, useEffect} from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { hideMainLoader102, showMainLoader102 } from "@/app/api/util/utility";
import Image from "next/image";
import { AccordionDetails, Button } from '@mui/material';
import { IoMdAddCircle } from 'react-icons/io';
import { ArrowBigDown, ChevronDown, Edit, Edit2Icon } from "lucide-react";
import NewContact from "@/components/contacts/NewContact";
import { deleteContactsTeamRecordAction, getAllContactsTeamAction, getAllContactsTeamByTitleAction } from "@/app/api/contacts/actions/team";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import SelectTeam from "./SelectTeam";
import CustomPagination from "../CustomPagination";


export default function OpenDetailTeam ( props ) {
    const {contactsRec, personaRecords, userRecords, userTeamRecords} = props;
    const [contactsDetail, setContactsDetail] = useState(contactsRec)
    const [openContact, setOpenContact] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [openTeam, setOpenTeam] = useState(false);
    const [teamList, setTeamList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [contactsTeamList, setcontactsTeamList] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [checkAll, setCheckAll] = useState(false)

    // pagination vars
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = teamList.slice(startIndex, endIndex);
    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
  
    showMainLoader102();

    useEffect(() => {
        setTeamList([...new Set(userTeamRecords?.map(member => member.team_title))]);
        setcontactsTeamList(userTeamRecords);         
    }, []);
    
    const handleCloseTeam =()=> {
        setOpenTeam(false);
        setUsersList([]);
    }

    function toggleCollapse(cid) {
        var element = document.getElementById(cid);
        element.classList.toggle("hidden");
        console.log(cid);
    }

    const handleCheckboxChange = (event, itemID) => {
        const isChecked = event.target.checked;
        if (isChecked) {
          setSelectedRows([...selectedRows, itemID]);
        }
        else {
          setSelectedRows(selectedRows.filter(rowId => rowId !== itemID));             
        }        
    };
    
    const handleCheckboxSelectAll = (event, contentID) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setCheckAll(true)
            let IDs = []
            const listings = document.getElementById(contentID); 
            const checkboxes = listings.querySelectorAll('input[type="checkbox"]');
            
            checkboxes.forEach(checkbox => {
                console.log(checkbox.value)
            if (checkbox.value) {             
                IDs.push(checkbox.value)     
            }
            });
            setSelectedRows(IDs); 
            console.log(IDs)
        }
        else {
            setCheckAll(false)
            setSelectedRows([]);
        }   
    };

    const handleCheckboxDlete = async itemIDs => {
        const validIDs = itemIDs.filter(id => !isNaN(id));
        if(itemIDs.length) {
            const confirmDelete = window.confirm("Are you sure? You want to delete selected records.");
            if(confirmDelete){                
                showMainLoader102();
                for (const itemID of itemIDs) {                    
                    const filteredList = contactsTeamList.filter((contact) => contact.team_title == itemID);
                    for (const item of filteredList) {      
                        const r1 = await deleteContactsTeamRecordAction(item.contacts_team_id);                        
                    }
                }
                window.location.reload();                  
            }        
            hideMainLoader102();
        }
    };


    const handleCheckboxUpdate = async() => {
        showMainLoader102();
        if(selectedRows.length == 1) {
            const r1 = await getAllContactsTeamByTitleAction(selectedRows[0]);
            const records = r1.returnData;
            const mappedData =  records.map((item, index) => ({
                id: item.primary_contacts_id,
                name: item.first_name + ' ' + item.last_name,
                role: item.team_role,
                contacts_team_id: item.contacts_team_id,
                image: item.profile_image ? item.profile_image : '/avatar.png',                
            }));
            setUsersList(mappedData);
            setOpenTeam(true);  
            console.log(records,'dddddddddddddd')          
        }
    };
  
      
    hideMainLoader102();
    return (
        <>  
            <AccordionDetails className='flex justify-center flex-col-reverse items-center-'>                
                <CustomPagination
                    totalItems={teamList.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
                <div id="teams-list" className="w-full">
                {teamList?.map((name, index) => (
                    <>  
                        <div className="bg-white p-4 flex items-center mt-3 mb-1 text-[#000000] w-full" key={name}>
                            <div className="flex gap-2 items-center flex-[1] " >
                                <input 
                                    type="checkbox"
                                    className="mr-2"
                                    value={name}
                                    onChange={(e)=>handleCheckboxChange(e, name)}
                                    checked={(selectedRows.includes(name) ? true : false)}
                                />
                                <span className="text-lg leading-4">{name}</span>
                                <Button onClick={()=>toggleCollapse('teams' + index)}>
                                    <ChevronDown className='flex-[1/2] cursor-pointer text-black' />
                                </Button>
                                <div class="flex -space-x-4 rtl:space-x-reverse" >                                   
                                    {contactsTeamList
                                    .filter(team => team.team_title === name)
                                    ?.map((team, index) => (
        
                                        <img 
                                        class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" 
                                        src={team.profile_image ? team.profile_image : '/avatar.png'} 
                                        />
        
                                    ))}
                                    
                                    <a class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
                                        {
                                            contactsTeamList?.filter(team => team.team_title === name)?.length > 10 
                                                ? '+10' 
                                                : contactsTeamList?.filter(team => team.team_title === name)?.length
                                        }
                                    </a>                                    
                                </div>
                            </div>
                        </div>                        
                        <div className="flex justify-between w-full flex-col-reverse hidden" id={'teams' + index}>                                          
                            {contactsTeamList
                            .filter(team => team.team_title === name)
                            ?.map((team, index) => (
                                <div className="bg-white p-4 flex items-center justify-between mt-3 mb-1 text-[#000000] w-full" key={team.contacts_team_id}>                                    
                                   
                                    <div className="flex gap-3 items-center flex-[1]">
                                        <Image src={team.profile_image ? team.profile_image : '/avatar.png'} width={38} height={38} alt='contact' className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                        <span className="text-sm leading-4">{team.first_name} {team.last_name}</span> 
                                    </div>
                                    <span className="text-sm leading-4 flex-[1]">{team.job_title}</span>
                                    <span className="text-sm leading-4 flex-[1]">{team.email}</span>
                                    <span className="text-sm leading-4 flex-[1]">{team.contact_number}</span>
                                    <span className="bg-[#26BADA] max-w-[120px] mr-4 flex-[1] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center  leading-4 block">{team.team_role}</span>                                    
                                </div>
                            ))}                   
                        </div> 
                        
                    </>
                ))}         
                </div>      

                <div className='flex gap-3 w-full mt-2 h-12 text-gray-500 cursor-pointer flex-start ' > 
                    <div className='flex gap-3 ml-4 items-center text-lg '>
                        <input 
                        type="checkbox"
                        onChange={(e)=>handleCheckboxSelectAll(e, 'teams-list')}
                        /> 
                        <span>Select All</span>
                    </div>                            
                    <div 
                        className='flex gap-1 items-center text-lg'
                        onClick={() => handleCheckboxDlete(selectedRows)}
                    >
                        <AiFillDelete/>Delete
                    </div> 
                    {selectedRows.length == 1 && (
                    <div 
                        className='flex gap-1 items-center text-lg'
                        onClick={handleCheckboxUpdate}
                    >
                        <AiFillEdit/>Edit
                    </div>)}
                    <SelectTeam
                        isOpen={openTeam} 
                        handleClose={handleCloseTeam} 
                        personaRecords={personaRecords} 
                        userRecords={userRecords}
                        selectedUsers={usersList} 
                        teamName={selectedRows.length ? selectedRows[0] : ''}
                        modalType={'edit'}
                    />
                </div>
                
                
            </AccordionDetails>
            

        </>
    )
};


