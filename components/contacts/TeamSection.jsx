import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import { MoreHoriz } from '@mui/icons-material';

const teamMembers = [
    { id: 1, name: 'John Doe', designation: 'Software Engineer', email: 'john.doe@example.com', rfxId: 'RFX123', role: 'Developer', image: '/man.jpeg' },
    { id: 2, name: 'Jane Smith', designation: 'UI/UX Designer', email: 'jane.smith@example.com', rfxId: 'RFX456', role: 'Designer', image: '/man2.png' },
    { id: 3, name: 'Smith Jhon', designation: 'UI/UX Designer', email: 'jane.smith@example.com', rfxId: 'RFX456', role: 'Designer', image: '/ravi.png' },
    { id: 4, name: 'Sara', designation: 'Manager', email: 'sara.smith@example.com', rfxId: 'RFX456', role: 'Designer', image: '/rose.jpg' },
];
const TeamSection = () => {
    return (
        <div className="w-full mx-auto mt-8">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="team1-content"
                    id="team1-header"
                    className="flex items-center justify-between"
                >
                    <div className="flex items-center">
                        <Typography variant="h6" className="mr-4 text-lg font-bold">Team 1</Typography>
                        {/* Overlapping user images */}
                        <div className="flex -space-x-3">
                            {teamMembers.slice(0, 3).map((member) => (
                                <img key={member.id} src={member.image} alt={member.name} width={32} height={32} className="w-8 h-8 rounded-full ring-2 ring-white "/>
                            ))}
                            <div className="w-8 h-8 rounded-full bg-gray-100 text-[#98A9BC] text-xs text-center flex items-center justify-center">+ {teamMembers.length - 3}</div>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails className="flex flex-wrap gap-4 bg-gray-100">
                    {teamMembers.map((member) => (
                        <div key={member.id} className="grid grid-cols-6 items-center w-full bg-white text-[#98A9BC] p-2 gap-x-4">
                            <span className='flex items-center gap-2 text-black font-semibold'>
                                <img src={member.image} alt={member.name} width={40} height={40} className="w-10 h-10 rounded-full" />
                                <Typography variant="subtitle1">{member.name}</Typography>
                            </span>
                            <Typography variant="body2">{member.designation}</Typography>
                            <Typography variant="body2">{member.email}</Typography>
                            <Typography variant="body2">{member.rfxId}</Typography>
                            <Typography variant="body2">{member.role}</Typography>
                            <MoreHoriz />
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
        </div >
    )
}

export default TeamSection