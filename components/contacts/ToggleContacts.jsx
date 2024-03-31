'use client'
import React, { useState } from 'react';
import TeamSection from './TeamSection';
import ContactTable from './ContactTable';

const ToggleContacts = () => {
    const [activeContact, setActiveContact] = useState(true);
    const [activeTeam, setActiveTeam] = useState(false);

    const handleContactClick = () => {
        setActiveContact(true);
        setActiveTeam(false);
    };

    const handleTeamClick = () => {
        setActiveContact(false);
        setActiveTeam(true);
    };
    const contacts = [
        { id: 1, name: 'Bryan C', role: 'requester', designation: 'Buyer', email:'mail@google.com', company: 'i6 Tech', rfxID: '548-6523', image: '/bryan.jpg' },
        { id: 2, name: 'Chand Kumar', role: 'requester', designation: 'Sr. Buyer', email:'mail@google.com', company: 'i6 Tech', rfxID: '548-6523', image: '/chand.jpg' },
        { id: 3, name: 'James Bell', role: 'requester', designation: 'Manager', email:'mail@google.com', company: 'i6 Tech', rfxID: '548-6523', image: '/james.jpg' },
        { id: 4, name: 'Lin Chau', role: 'requester', designation: 'Sales', email:'mail@google.com', company: 'i6 Tech', rfxID: '548-6523', image: '/lin.jpg' },
        { id: 5, name: 'Maha Khan', role: 'requester', designation: 'Buyer', email:'mail@google.com', company: 'i6 Tech', rfxID: '548-6523', image: '/maha.jpg' },
        { id: 6, name: 'Marvin Lambert', role: 'requester', designation: 'Buyer', email:'mail@google.com', company: 'i6 Tech', rfxID: '548-6523', image: '/marvin.jpg' },
        { id: 7, name: 'Ravi K.', role: 'requester', designation: 'Buyer', email:'mail@google.com', company: 'i6 Tech', rfxID: '548-6523', image: '/ravi.png' },
        { id: 8, name: 'Rose Peters', role: 'requester', designation: 'Buyer', email:'mail@google.com', company: 'i6 Tech', rfxID: '548-6523', image: '/rose.jpg' },
      ];

    return (
        <div className='mt-8'>
            <div className='flex items-center gap-4 mb-4'>
                <span
                    className={`cursor-pointer ${activeContact ? 'text-[#26BADA] border-b-4 border-[#26BADA]' : 'text-black border-b-4 border-transparent'}`}
                    onClick={handleContactClick}
                >
                    Contacts
                </span>
                <span
                    className={`cursor-pointer ${activeTeam ? 'text-[#26BADA] border-b-4 border-[#26BADA]' : 'text-black border-b-4 border-transparent'}`}
                    onClick={handleTeamClick}
                >
                    Teams
                </span>
            </div>
            {activeContact ? <ContactTable rows={contacts} /> : <TeamSection />}
        </div>
    );
};

export default ToggleContacts;
