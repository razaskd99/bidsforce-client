'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ContactTable from './ContactTable';
import SelectTeam from './SelectTeam';
import { IoIosSearch } from 'react-icons/io';
import { useRouter, usePathname } from "next/navigation";
import OpenDetailTeam from './OpenDetailTeam';
import Breadcrumbs from '../Breadcrumbs';
import SearchSection from '../SearchSection';

const OpenContact = ({userRecords, personaRecords, userTeamRecords}) => {
  const [openContact, setOpenContact] = useState(false);
  const [openContactUpdate, setOpenContactUpdate] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const router = useRouter();


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');  
    setActiveTab(mode ? mode : 'users');
  }, []);


  const handleClickOpenContact = () => {
    setOpenContact(true);
  };
  const handleCloseContact = () => {
    setOpenContact(false);
    setOpenContactUpdate(false); 
  };
  

  const handleClickOpenTeam = () => {
    setOpenTeam(true);
  };
  const handleCloseTeam = () => {
    setOpenTeam(false);
  };

  
  const handleTabClick = (tabId) => {
      setActiveTab(tabId);
      window.location.href = '/users?mode=' + tabId;
      //router.push('/users?mode=' + tabId);      
  };


  const breadcrumbItems = [
    { label: "Home", href: "/"},
    { label: 'Users', href: "/users" },
    
  ];  

  return (
    <div>
        <Breadcrumbs items={breadcrumbItems} />
        <div className='flex gap-3'>          
          <p className="text-md text-slate-400 flex items-center gap-1 cursor-pointer" >
              New User
              {/* <Image src="add-blue.svg" width={18} height={21} alt="add"/> */}
          </p>
          <p className="text-md text-[#26BADA] flex items-center gap-1 cursor-pointer" onClick={handleClickOpenTeam} >
              New Team
              <Image src="add-blue.svg" width={18} height={21} alt="add" />
          </p>
          <SearchSection />
        </div> 
        <SelectTeam isOpen={openTeam} handleClose={handleCloseTeam} personaRecords={personaRecords} userRecords={userRecords} />

        <div className="mb-4 mt-4 border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
              <li className="me-2" role="presentation">
              <button className={`inline-block px-4 py-1 border-b-4 rounded-t-lg ${activeTab === 'users' ? 'border-[#26bada]' : 'hover:text-[#26bada] hover:border-gray-0 dark:hover:text-[#26bada]'}`} id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected={activeTab === 'users'} onClick={() => handleTabClick('users')}>
                  Users
              </button>
              </li>
              <li className="me-2" role="presentation">
              <button className={`inline-block px-4 py-1 border-b-4 rounded-t-lg ${activeTab === 'teams' ? 'border-[#26bada]' : 'hover:text-[#26bada] hover:border-gray-0 dark:hover:text-[#26bada]'}`} id="teams-tab" data-tabs-target="#teams" type="button" role="tab" aria-controls="teams" aria-selected={activeTab === 'teams'} onClick={() => handleTabClick('teams')}>
                  Teams
              </button>
              </li>        
          </ul>
          <div id="default-tab-content">
            <div className={`p-4 rounded-lg bg-gray-0 dark:bg-gray-0 ${activeTab !== 'users' ? 'hidden' : ''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <ContactTable rows={userRecords}  />          
            </div>
            <div className={`py-4 rounded-lg bg-gray-0 dark:bg-gray-0 ${activeTab !== 'teams' ? 'hidden' : ''}`} id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
              <OpenDetailTeam personaRecords={personaRecords} userRecords={userRecords} userTeamRecords={userTeamRecords}/>
            </div>        
          </div>
        </div>
    </div>
  );
}
export default OpenContact
