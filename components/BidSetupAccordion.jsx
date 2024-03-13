import * as React from 'react';
import { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaCaretDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { AiFillMinusCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { FaFile } from "react-icons/fa";
import ContactDialog from './ContactPopup1';
import Image from 'next/image';
import { FormControlLabel, MenuItem, Switch, TextField } from '@mui/material';
import { FaChevronLeft, FaRegCalendarDays } from "react-icons/fa6";
import { CalendarMonth } from '@mui/icons-material';
import CalendarTimeline from './CalendarTimeline';
import SearchTable from './SearchTable';
import { IoMdAddCircleOutline } from "react-icons/io";
import TimePickerValue from './TimePicker';
import DynamicDatePicker from './DatePickerInput';
import { getAllKoffMeetingAction, getKoffMeetingByIDAction, createKoffMeetingAction} from '@/app/api/manager/actions/kickoff';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import RfxDetail from './RfxDetail';
import SearchTableNew from './SearchTableNew';
import { createContactsAction, getRfxContactsByKey } from '@/app/api/rfx/actions/rfx';
import { createDeliverablesAction, getAllDeliverablesAction, getDeliverablesByIDAction } from '@/app/api/manager/actions/deliverables';
import { getPages, getpage } from '@/app/api/user-templates/API';


export default function ControlledAccordions({
        rfxRecord,
        allUsersRec,
        login_user_id,
        koffRec,
        deliverablesRec,
        bidteamRec,
        tenantID
    }) {
    
    const [isContactDialogOpen, setContactDialogOpen] = useState(false);
    const [selectedContact, setSelectedContacts] = useState(
        bidteamRec.map((bid, index) => ({
            id: bid.user_id,
            designation: bid.designation_title,
            email: bid.email,
            name: `${bid.first_name} ${bid.last_name}`,
            role: bid.team_role,
            image: bid.user_profile_photo ? bid.user_profile_photo : '/avatar.jpg'
        }))
    );
    const [selectedAttendee, setSelectedAttendees] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [templateOption, setTemplateOption] = useState('');
    const [selectedTemplateQuestions, setSelectedTemplateQuestions] = useState([]);
    const [loadTemplate, setloadTemplate] = useState(false);
    const [loadTechTemplate, setloadTechTemplate] = useState(false);
    const [loadKOMTemplate, setloadKOMTemplate] = useState(false);
    const [showBidDelTable, setshowBidDelTable] = useState(deliverablesRec?.length ? true : false);
    const [delivRows, setDelivRows] = useState(
        deliverablesRec.map((deliv, index) => ({
            id: deliv.bid_deliverables_id,
            Title: deliv.title,
            Type: deliv.template_type,
            Template: deliv.template
        }))
    );
    const [meetingTableRows, setMeetingTableRows] = useState(
        koffRec.map((koff, index) => ({
            id: koff.bid_kickoff_meeting_id,
            Title: koff.title,
            Date: koff.date,
            StartTime: new Date(koff.start_time).toLocaleTimeString(undefined, { hour12: true }),
            EndTime: new Date(koff.end_time).toLocaleTimeString(undefined, { hour12: true }),
            Location: koff.location,
            Description: koff.description
        }))
    );
    const [showMeetingDetails, setShowMeetingDetails] = useState(false);
    const [showMeetingTable, setShowMeetingTable] = useState(true);
    const [showSubmittedMeetingDetails, setShowSubmittedMeetingDetails] = useState(false);
    const [isMeetingDialogOpen, SetMeetingDialogOpen] = useState(false);
    const [koffTitle, setKoffTitle] = useState('');
    const [koffLocation, setKoffLocation] = useState('');
    const [koffDate, setKoffDate] = useState(new Date().toISOString().split('T')[0]);
    const [koffStartTime, setKoffStartTime] = useState(new Date().toLocaleTimeString());
    const [koffEndTime, setKoffEndTime] = useState(new Date().toLocaleTimeString());
    const [koffDescription, setKoffDescription] = useState('');
    const [koffType, setKoffType] = useState('');
    const [koffTemplateData, setKoffTemplateData] = useState('');
    const [koffSelectedRow, setKoffSelectedRow] = useState({});

    const [delivType, setDelivType] = useState('');
    const [delivTemplateData, setDelivTemplateData] = useState('');
    const [delivSelectedRow, setDelivSelectedRow] = useState({});

    const [templatesAll, setTemplatesAll] = useState([])
    const [templateHTMLDeliverChanged, settemplateHTMLDeliverChanged] = useState('')
    const [templateHTMLDeliver, settemplateHTMLDeliver] = useState('')
    const [templateHTMLKoff, settemplateHTMLKoff] = useState('')
    const [templateCSS, setTemplateCSS] = useState('')


    function applyDynamicCSS(css) {
        useEffect(() => {
            const styleElement = document.createElement('style');
            styleElement.appendChild(document.createTextNode(css));
            document.head.appendChild(styleElement);
            return () => {
                document.head.removeChild(styleElement);
            };
        }, [templateHTMLDeliver, templateHTMLKoff]); // Re-run the effect whenever the CSS changes
    }

    applyDynamicCSS(templateCSS);


    const handleContactSelect = async (contact) => {                
        // get bid team
        const r2 = await getRfxContactsByKey(rfxRecord.rfx_id, 'bid-team-' + rfxRecord.rfx_id)
        const records = r2.rfxData
        const mappeddata = records.map((item) => ({
            id: item.user_id,
            designation: item.designation_title,
            name: `${item.first_name} ${item.last_name}`,
            email: item.email,
            image: item.user_profile_photo ? item.user_profile_photo : '/avatar.jpg',
            role: item.team_role
        }));
        setSelectedContacts(mappeddata) 

        // check contact exists
        const filteredData = records.filter(item => {
            return item.contact_user_id === contact.id && item.conatct_key === 'bid-team-' + rfxRecord.rfx_id;
        });

        // add bid team if not added
        if(!filteredData.length) {            
            const r3 = await createContactsAction(rfxRecord.rfx_id, contact.id, 'bid-team-' + rfxRecord.rfx_id)        
            setSelectedContacts((prevContacts) => [...prevContacts, contact]);
        }

        // refresh contacts
        
        setContactDialogOpen(false);
    };
    const handleAttendeeSelect = (attendee) => {
        setSelectedAttendees((prevAttendee) => [...prevAttendee, attendee]);
        SetMeetingDialogOpen(false);
        console.log(selectedAttendee)
        console.log(attendee)
    };
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleAddTeam = () => {
        setContactDialogOpen(true);

    };
    const handleAddAttendee = () => {
        SetMeetingDialogOpen(true);

    };
    const handleSelectChangeT1 = async (event) => {
        const selectedValue = event.target.value;
        // setshowTemplateSelect(selectedValue);
        setloadTemplate(true)
        setDelivType(event.target.value)
        // setButtonActive(!!selectedValue);

        // load template/css
        let pageContent = await getpage(event.target.value, tenantID)
        try {
            pageContent = JSON.parse(pageContent);
        } catch (err) {
            // Handle parsing error if needed
        }

        let pageHTML = pageContent?.['mycustom-html'] ?? '';
        let pageCSS = pageContent?.['mycustom-css'] ?? '';

        settemplateHTMLDeliver(pageHTML)
        setTemplateCSS(pageCSS)
    };
    const handleSelectChangeT2 = (event) => {
        const selectedValue = event.target.value;
        // setshowTemplateSelect(selectedValue);
        setloadTechTemplate(true)

        // Check if the selected option is not empty and activate the button
        // setButtonActive(!!selectedValue);
    };
    
    const handleSelectChangeT3 = async (event) => {
        const selectedValue = event.target.value;
        // setshowTemplateSelct(selectedValue);
        setloadKOMTemplate(true)
        setKoffType(event.target.value)
        
        // load template/css
        let pageContent = await getpage(event.target.value, tenantID)
        try {
            pageContent = JSON.parse(pageContent);
        } catch (err) {
            // Handle parsing error if needed
        }

        let pageHTML = pageContent?.['mycustom-html'] ?? '';
        let pageCSS = pageContent?.['mycustom-css'] ?? '';

        settemplateHTMLKoff(pageHTML)
        setTemplateCSS(pageCSS)
    };

    useEffect(() => {
        getPages(tenantID)
            .then((list) => {
                setTemplatesAll(list)
            })
            .catch((err) => console.log(err));
    }, []);

    const templateOptions = [
        { value: "Bid", label: "Bid / No Bid Review" },
        { value: "ECR", label: "Export Compliance Review" },
        { value: "TSR", label: "Technical Solution Review" },
        { value: "PRR", label: "Preliminary Risk Review" },
    ];
    const templateQuestions = [
        "Can’t afford not to participate in this opportunity?",
        "This Opportunity is business critical strategically / financially?",
        "The scope of work fits well into our core portfolio/business.",
        "We can meet the minimum requirements of the RFx?",
        "We have the resources and time to produce a quality bid/bid?",
        "The podtential revenue/profits from this opportunity are well known to us?",
        "The direct and indirect costs associated with the bidding are known to us?",
        "We are well aware of customer's business needs, their reason to request bids, and expectations?",
        "Are we the incumbent's supplier?",
        "We have credible experience in the scope requested?",
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
    const contacts = allUsersRec.map((user, index) => ({
        id: user.user_id,
        name: `${user.first_name} ${user.last_name}`,
        designation: user.designation_title,
        role: user.team_role,
        image: user.user_profile_photo ? user.user_profile_photo : '/avatar.jpg'
    }));
    const dateData = [
        { id: 1, label: 'Select Date', preData: '2023-01-01' },
    ];
    useEffect(() => {
        const selectedTemplate = templateOptions.find((option) => option.value === templateOption);
        if (selectedTemplate) {
            setSelectedTemplateQuestions(templateQuestions.map((question) => ({
                question,
                switchState: false,
            })));
        } else {
            setSelectedTemplateQuestions([]);
        }
         
    }, [templateOption]);
    useEffect(() => {
        // This code will run every time meetingTableRows changes
        console.log('Meeting table rows updated:', meetingTableRows);
    }, [meetingTableRows]);

    const handleOptionChange = (option) => {
        setSelectedTemplateQuestions((prevOptions) => ({
            ...prevOptions,
            [option]: !prevOptions[option],
        }));
    };
    const handleMeetingTableRow = () => {
        setShowSubmittedMeetingDetails(true);
        setShowMeetingTable(false);

    }
    const addMeetingTableRow = async () => {
        const newRow = { id: meetingTableRows.length + 1, description: 'New Opportunity', refrenceNumber: '12345666', issueDate: 'New Date', dueDate: 'New Salesperson', status: 'New Status', };
        setMeetingTableRows((prevRows) => [...prevRows, newRow]);
    }
    
    
    
    const handleDelivSubmit = async() => {
        //const newRow = { id: setBidRows.length + 1, checkbox: 'dddd.png', description: 'New Opportunity', crmId: 'newCrmId', customer: 'New Customer', issueDate: 'New Date', salePerson: 'New Salesperson', status: 'New Status', };
        //setBidRows((prevRows) => [...prevRows, newRow]);

        const data = {
            "rfx_id": rfxRecord.rfx_id,
            "title": delivType,
            "description": "",
            "template": templateHTMLDeliver,
            "template_type": delivType,
            "created_by": login_user_id            
        }
        const r1 = await createDeliverablesAction(data)
        if(r1.statusCode == 200) {
            // get deliv list
            const r2 = await getAllDeliverablesAction(rfxRecord.rfx_id)
            if(r2.statusCode == 200){
                console.log(r2)
                let delivRows = r2.returnData
                const mappedData = delivRows.map((deliv, index) => ({
                    id: deliv.bid_deliverables_id,
                    Title: deliv.title,
                    Type: deliv.template_type,
                    Template: deliv.template
                }));
                setDelivRows(mappedData)
            }
        }
    };
    
    const handleDelivRowClick = async (rowId) => {
        const targetRow = delivRows.find(item => item.id === rowId)    
        setshowBidDelTable(false)    
        setloadTemplate(false)

        settemplateHTMLDeliver(targetRow.Template)        
    }
    
    
    const handleBackToListMeeting = () =>{
        setShowMeetingTable(true);
        setShowMeetingDetails(false);
        setShowSubmittedMeetingDetails(false);

    }
    const handleMeetingSubmit = async () => {
        
        const data = {
            "rfx_id": rfxRecord.rfx_id,
            "title": koffTitle,
            "description": koffDescription,
            "template": templateHTMLKoff,
            "template_type": koffType,
            "location": koffLocation,
            "date": koffDate,
            "start_time": koffStartTime,
            "end_time": koffEndTime
        }
        
        const r1 = await createKoffMeetingAction(data)
        if(r1.statusCode == 200) {
            // add contacts
            const koff_id = r1.returnData.bid_kickoff_meeting_id
            let r2 = {}
            selectedAttendee && selectedAttendee.map((item, index) => (
                r2 = createContactsAction(rfxRecord.rfx_id, item.id, 'koff-' + koff_id)
            ))
            // get koff list
            const r3 = await getAllKoffMeetingAction(rfxRecord.rfx_id)
            if(r3.statusCode == 200){
                let koffRows = r3.returnData
                const mappedData = koffRows.map((koff, index) => ({
                    id: koff.bid_kickoff_meeting_id,
                    Title: koff.title,
                    Date: koff.date,
                    StartTime: new Date(koff.start_time).toLocaleTimeString(undefined, { hour12: true }),
                    EndTime: new Date(koff.end_time).toLocaleTimeString(undefined, { hour12: true }),
                    Location: koff.location,
                    Description: koff.description
                }));
                setMeetingTableRows(mappedData)
            }
        }
        
        settemplateHTMLKoff('')
        setSelectedAttendees([])
        setShowMeetingTable(true);
        setShowMeetingDetails(false);
        setShowSubmittedMeetingDetails(false);
    }

    const handleKoffRowClick = async (rowId) => {
        const targetRow = meetingTableRows.find(item => item.id === rowId)
        setKoffSelectedRow(targetRow)   
        settemplateHTMLKoff('')

        // get contacts
        const r1 = await getRfxContactsByKey(rfxRecord.rfx_id, 'koff-' + rowId)        
        const contactRows = r1.rfxData
        const mappedrow = contactRows?.map((user, index) => ({
            id: user.user_id,
            name: `${user.first_name} ${user.last_name}`,
            designation: user.designation,
            role: user.user_role,
            image: user.user_profile_photo ? user.user_profile_photo : '/avatar.jpg'
        }))
        setSelectedAttendees(mappedrow)

        // get template
        let r2 = await getKoffMeetingByIDAction(rowId)
        let record = r2.returnData
        settemplateHTMLKoff(record.template)
        
        setShowSubmittedMeetingDetails(true);
        setShowMeetingTable(false);   
    }


    const handleHtmlChange = (e) => {
        //settemplateHTMLDeliverChanged(e.target.innerHTML)
    }

    

    return (
        <div className='max-w-full'>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className='mb-1'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className='flex justify-between w-full bid-accordion bg-[#EFF3F5]'
                >
                    <Typography sx={{ width: '50%', flexShrink: 0 }} className='flex gap-3'>
                        <span className='font-bold text-sm'> Bid Team</span>
                        <FaCaretDown className='text-gray-500' />
                        <FaUser className='text-gray-500 text-lg' />
                        <span className='text-[#26BADA] text-sm'>{selectedContact?.length} members</span>
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }} className='flex justify-end w-full gap-3'>
                        <AiFillMinusCircle />
                        <BsThreeDots />
                    </Typography>
                </AccordionSummary>
                <AccordionDetails className='border border-gray-300 flex justify-center flex-col-reverse items-center py-3'>
                    <IoMdAddCircle className='text-4xl text-[#26BADA] cursor-pointer' onClick={handleAddTeam} />
                    {selectedContact?.map((selectedContact, index) => (
                        <div className="border border-gray-300 px-4 py-1 flex items-center justify-between my-1 text-[#98A9BC] w-full" key={index}>
                            <div className="flex gap-2 items-center flex-[1]">
                                <Image src={selectedContact.image} width={38} height={38} alt='contact' className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                <span className="text-sm leading-4">{selectedContact.name}</span>
                            </div>
                            <span className="text-sm leading-4 flex-[1]">{selectedContact.email}</span>
                            <span className="text-sm leading-4 flex-[1]">{selectedContact.designation}</span>
                            <span className="bg-[#26BADA] max-w-[120px] mr-4 flex-[1] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center  leading-4 block">{selectedContact.role ? selectedContact.role : 'requester'}</span>
                            < BsThreeDots className='flex-[1/2]' />
                        </div>
                    ))}
                </AccordionDetails>
                <ContactDialog contacts={contacts} isOpen={isContactDialogOpen} handleClose={() => setContactDialogOpen(false)} handleContactSelect={handleContactSelect}  />

            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className='flex justify-between w-full bid-accordion bg-[#EFF3F5]'
                >
                    <Typography sx={{ width: '50%', flexShrink: 0 }} className='flex gap-3'>
                        <span className='font-bold text-sm'>Bid Deliverables</span>
                        <FaCaretDown className='text-gray-500' />
                        <FaFile className='text-gray-500 text-lg' />
                        <span className='text-[#26BADA] text-sm'>{delivRows.length} Technical Deliverables</span>
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }} className='flex justify-end w-full gap-3'>
                        <AiFillMinusCircle />
                        <BsThreeDots />
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='flex gap-4 flex-col'>
                        {!showBidDelTable && <div className='flex flex-col gap-4 mt-5'>
                            <TextField select label="Select a commercial template" onChange={handleSelectChangeT1} className="bg-white w-full max-w-[360px] min-w-[300px]" >
                                {templatesAll.map(option => (
                                    <MenuItem key={option.id} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {loadTemplate && (
                                <div className="flex">
                                    <div className="text-end">
                                        <div>                                            
                                            <div className="mt-4">
                                            
                                                <div dangerouslySetInnerHTML={{ __html: templateHTMLDeliver }}  />

                                                {/*templateQuestions.map((option, index) => (
                                                    <div key={index} className="flex items-center shadow-md p-4 mb-2 bg-white">
                                                        <FormControlLabel
                                                            className='flex items-center justify-between w-full flex-row-reverse'
                                                            label={<Typography variant="body1">{option}</Typography>}
                                                            control={
                                                                <Switch
                                                                    color="primary"
                                                                    checked={selectedTemplateQuestions[option]}
                                                                    onChange={() => handleOptionChange(option)}
                                                                />
                                                            }
                                                        />
                                                    </div>
                                                        ))*/}
                                            </div>
                                        </div>
                                        <button className={`upprecase my-5 uppercase rounded-md p-3 min-w-[200px] text-center  bg-[#00AAEC] text-white cursor-pointer`} onClick={() => { setshowBidDelTable(true); handleDelivSubmit(); setloadTemplate(false) }} disabled={false} >Save</button>
                                    </div>
                                </div>
                            )}
                        </div>}
                        {showBidDelTable &&
                            <>
                                <div className="flex items-center gap-1 text-[#26BADA]" onClick={() => { setshowBidDelTable(false); }} >
                                    <span>New Bid Deliverable</span>
                                    <IoMdAddCircleOutline />
                                </div>
                                <SearchTableNew handleRowClick={handleDelivRowClick} rows={delivRows} />
                            </>
                        }

                        {(!showBidDelTable && !loadTemplate) &&
                            <>
                                <div className="flex items-center gap-1text-[#26BADA] cursor-pointer mb-1" onClick={() => { setshowBidDelTable(true); setloadTemplate(false) }}>
                                    <FaChevronLeft />
                                    <span >Back to list</span>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: templateHTMLDeliver }} />
                            </>
                        }

                        {/* <div className="flex-[1]"><div className='flex flex-col gap-4 mt-5'>
                            <TextField
                                select
                                label="Select Technical deliverable template"
                                onChange={handleSelectChangeT2}
                                className="bg-white w-full max-w-[360px]"
                            >
                                {templateOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {loadTechTemplate && (
                                <div className="flex">
                                    <div className="">
                                        <div>
                                            <Typography variant="h6">Template: Technical Delieverables</Typography>
                                            <div className="mt-4">
                                                {templateQuestions.map((option, index) => (
                                                    <div key={index} className="flex items-center shadow-md p-4 mb-2 bg-white">
                                                        <FormControlLabel
                                                            className='flex items-center justify-between w-full flex-row-reverse'
                                                            label={<Typography variant="body1">{option}</Typography>}
                                                            control={
                                                                <Switch
                                                                    color="primary"
                                                                    checked={selectedTemplateQuestions[option]}
                                                                    // onChange={() => handleOptionChange(option)}
                                                                />
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        </div> */}
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className='flex justify-between w-full bid-accordion bg-[#EFF3F5]'
                >
                    <Typography sx={{ width: '50%', flexShrink: 0 }} className='flex gap-3'>
                        <span className='font-bold text-sm'> Bid Schedule</span>
                        <FaCaretDown className='text-gray-500' />
                        <FaRegCalendarDays className='text-gray-500 text-lg' />
                        <span className='text-[#26BADA] text-sm'>20/06/21 - 05/08/21</span>
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }} className='flex justify-end w-full gap-3'>
                        <AiFillMinusCircle />
                        <BsThreeDots />
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CalendarTimeline />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className='flex justify-between w-full bid-accordion bg-[#EFF3F5]'
                >
                    <Typography sx={{ width: '50%', flexShrink: 0 }} className='flex gap-3'>
                        <span className='font-bold text-sm'> Bid Kick Off Meeting</span>
                        <FaCaretDown className='text-gray-500' />
                        <FaRegCalendarDays className='text-gray-500 text-lg' />
                        <span className='text-[#26BADA] text-sm'>KOM {meetingTableRows.length} Agenda Items</span>
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }} className='flex justify-end w-full gap-3'>
                        <AiFillMinusCircle />
                        <BsThreeDots />
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {showMeetingTable && <div>
                        <span className='flex gap-2 text-[#26BADA] items-center mb-3 cursor-pointer' onClick={() => { setShowMeetingDetails(true); setShowMeetingTable(false) }}>Add Meeting <IoMdAddCircle /></span>
                        <SearchTableNew rows={meetingTableRows} handleRowClick={handleKoffRowClick} />
                    </div>}
                    {showMeetingDetails && (
                        <div className="flex gap-4">
                            <div className='flex-[1]'>
                                <div className="flex flex-col bg-white shadow-md p-4">
                                <span className='flex items-center gap-1 cursor-pointer' onClick={handleBackToListMeeting}><FaCaretDown className='transform rotate-[90deg] inline-block'/> Back to List</span>
                                    <div className="border-b border-gray-300 p-5 text-[#98A9BC]">Meeting  details</div>
                                    <div className="p-5 flex flex-col gap-1 text-sm">
                                        <span className='text-[#98A9BC] text-[10px]]'>Meeting Title</span>
                                        <input type='text' onChange={(e)=>setKoffTitle(e.target.value)} className='border border-gray-400 p-2 outline-0' />
                                    </div>
                                    <div className=" p-5 flex flex-col gap-1 text-sm">
                                        <span className='text-[#98A9BC] text-[10px]]'>Location</span>
                                        <input type='text' onChange={(e)=>setKoffLocation(e.target.value)} className='border border-gray-400 p-2 outline-0' />
                                    </div>
                                    <div className=" p-5 flex flex-col gap-1 text-sm">
                                        <span className='text-[#98A9BC] text-[10px]]'>Date</span>
                                        <LocalizationProvider
                                            key={"koff_date"}
                                            dateAdapter={AdapterDayjs}
                                            className="w-full bg-white "
                                        >
                                            <DemoContainer components={["DatePicker"]}>
                                                <div id={"clarification_issued_date"}>
                                                    <DatePicker
                                                        label={"Koff Meeting Date *"}
                                                        value={dayjs(koffDate)}
                                                        onChange={(date) => setKoffDate(new Date(date).toISOString().slice(0, 10))}
                                                    />
                                                </div>
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                    <div className="flex justify-between  py-2 ">
                                        <div className=" p-5 flex flex-col gap-1 text-sm flex-[1] border-r border-gray-300">
                                            <span className='text-[#98A9BC] text-[10px]]'>Start Time</span>
                                            <input type="time" value={koffStartTime} onChange={(e)=>setKoffStartTime(e.target.value)} label="Choose Start time" />
                                        </div>
                                        <div className="p-5 flex flex-col gap-1 text-sm flex-[1]">
                                            <span className='text-[#98A9BC] text-[10px]]'>End Time</span>
                                            <input type="time" value={koffEndTime} onChange={(e)=>setKoffEndTime(e.target.value)} label="Choose End time" />
                                        </div>
                                    </div>

                                    <div className="border-b border-gray-300 p-5 flex flex-col gap-1 text-sm">
                                        <span className='text-[#98A9BC] text-[10px]]'>Description</span>
                                        <textarea rows={3} onChange={(e)=>setKoffDescription(e.target.value)} className='border border-gray-400 p-2 outline-0' />

                                    </div>
                                    <p className='text-[#98A9BC] '>Attendees</p>
                                    <div className="bg-[#E8ECEF] p-3">
                                        {/* Attendee row */}
                                        {selectedAttendee.map((selectedAttendee, index) => (
                                            <div className="flex items-center justify-between mb-2" key={index}>
                                                <div className='flex bg-white gap-2 rounded-full px-3'>
                                                    <Image src={selectedAttendee.image} width={32} height={32} className='object-contain' />
                                                    <div className="flex flex-col gap-[2px]">
                                                        <p>{selectedAttendee.name}</p>
                                                        <span className='text-sm text-[#778CA2]'>{selectedAttendee.designation}</span>
                                                    </div>

                                                </div>
                                                <span className='bg-[#26BADA] text-white px-2 rounded-lg text-sm '>{selectedAttendee.role}</span>
                                            </div>
                                        ))}
                                        <div className="flex justify-center">
                                            <IoMdAddCircle className='text-4xl text-[#26BADA] cursor-pointer' onClick={handleAddAttendee} />
                                            <ContactDialog contacts={contacts} isOpen={isMeetingDialogOpen} handleClose={() => SetMeetingDialogOpen(false)} handleContactSelect={handleAttendeeSelect} />

                                        </div>

                                        {/* Add Button */}
                                    </div>
                                    {/* {contacts.map((selectedContact, index) => (
                                        <div className="bg-[#F4F5F6] rounded-md px-4 py-1 flex items-center justify-between" key={index}>
                                            <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                                <Image src={selectedContact.image} width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                                <div className="">
                                                    <span className="text-sm leading-4">{selectedContact.name}</span>
                                                    <span className="text-sm leading-4 text-[#778CA2] block">{selectedContact.role}</span>
                                                </div>
                                            </div>
                                            <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Requester</div>
                                        </div>
                                    ))} */}
                                    <div className="flex gap-4 justify-around my-3 w-full">
                                        <button className='uppercase p-[10px] min-w-[240px] text-[#26BADA] bg-[#FFFFFF] rounded-md border border-[#26BADA] min-w-[200px]]' >Cancel</button>
                                        <button className='uppercase p-[10px] min-w-[240px] bg-[#26BADA] text-white  rounded-md ' onClick={handleMeetingSubmit}>Submit</button>

                                    </div>
                                </div>
                            </div>
                            <div className="flex-[2]"><div className="bg-[#E8ECEF]"></div>
                                    
                                <div className='flex flex-col gap-4 mt-5'>
                                    <TextField
                                        select
                                        label="Select Technical deliverable template"
                                        onChange={handleSelectChangeT3}
                                        className="bg-white w-full max-w-[360px]"
                                    >
                                        {templatesAll.map(option => (
                                            <MenuItem key={option.id} value={option.name}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    {loadKOMTemplate && (
                                        <div className="flex">
                                            <div className="">
                                                <div>
                                                    
                                                    <div className="mt-4">
                                                        
                                                        <div dangerouslySetInnerHTML={{ __html: templateHTMLKoff }}  />

                                                        {/*templateQuestions.map((option, index) => (
                                                            <div key={index} className="flex items-center shadow-md p-4 mb-2 bg-white">
                                                                <FormControlLabel
                                                                    className='flex items-center justify-between w-full flex-row-reverse'
                                                                    label={<Typography variant="body1">{option}</Typography>}
                                                                    control={
                                                                        <Switch
                                                                            color="primary"
                                                                            checked={selectedTemplateQuestions[option]}
                                                                            onChange={() => handleOptionChange(option)}
                                                                        />
                                                                    }
                                                                />
                                                            </div>
                                                                ))*/}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>)}
                    {showSubmittedMeetingDetails && (
                        <div>
                            <span className='flex items-center gap-1 cursor-pointer' onClick={handleBackToListMeeting}><FaCaretDown className='transform rotate-[90deg] inline-block'/> Back to List</span>
                            <div className="flex gap-4">
                                <div className='flex-[1]'>
                                    <div className="flex flex-col bg-white shadow-md p-4">
                                        <div className="border-b border-gray-300 p-5 text-[#98A9BC]">Meeting  details</div>
                                        <div className="border-b border-gray-300 p-5 flex flex-col gap-1 text-sm">
                                            <span className='text-[#98A9BC] text-[10px]]'>Meeting Title</span>
                                            <p>{koffSelectedRow?.Title} </p>
                                        </div>
                                        <div className="border-b border-gray-300 p-5 flex flex-col gap-1 text-sm">
                                            <span className='text-[#98A9BC] text-[10px]]'>Location</span>
                                            <p>{koffSelectedRow?.Location}</p>
                                        </div>
                                        <div className="border-b border-gray-300 p-5 flex flex-col gap-1 text-sm">
                                            <span className='text-[#98A9BC] text-[10px]]'>Date</span>
                                            <p>{koffSelectedRow?.Date}</p>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-300 py-2 ">
                                            <div className=" p-5 flex flex-col gap-1 text-sm flex-[1] border-r border-gray-300">
                                                <span className='text-[#98A9BC] text-[10px]]'>Start Time</span>
                                                <p>{koffSelectedRow?.StartTime}</p>
                                            </div>
                                            <div className="p-5 flex flex-col gap-1 text-sm flex-[2]">
                                                <span className='text-[#98A9BC] text-[10px]]'>End Time</span>
                                                <p>{koffSelectedRow?.EndTime}</p>
                                            </div>
                                        </div>
                                        <div className="border-b border-gray-300 p-5 flex flex-col gap-1 text-sm">
                                            <span className='text-[#98A9BC] text-[10px]]'>Description</span>
                                            <p>{koffSelectedRow?.Description} </p>
                                        </div>
                                        <p className='text-[#98A9BC] '>Attendees</p>
                                        {selectedAttendee?.map((selectedContact, index) => (
                                            <div className="bg-[#F4F5F6] rounded-md px-4 py-1 flex items-center justify-between" key={index}>
                                                <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                                    <Image src={selectedContact.image} width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                                    <div className="">
                                                        <span className="text-sm leading-4">{selectedContact.name}</span>
                                                        <span className="text-sm leading-4 text-[#778CA2] block">{selectedContact.role}</span>
                                                    </div>
                                                </div>
                                                <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Requester</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-[1]">
                                    <div className='flex flex-col gap-4 mt-5'>
                                        <div className="flex">
                                            <div className="">
                                                <div>
                                                    
                                                    <div className="mt-4">
                                                        <div dangerouslySetInnerHTML={{ __html: templateHTMLKoff }}  />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </AccordionDetails>
            </Accordion>
        </div>
    );
}
