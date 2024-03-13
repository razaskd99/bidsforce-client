'use client'
import { useState } from 'react';
import UploadDialog from '@/components/UploadDailogue';
import Breadcrumbs from "@/components/Breadcrumbs"
import Image from "next/image";
import { FaRegCalendarMinus } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { VscChecklist } from "react-icons/vsc";
import { FaBarsProgress } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
import { RxCrossCircled } from "react-icons/rx";
import { LuRefreshCcw } from "react-icons/lu";
import BidDialog from '@/components/BidRequestDailogue';
import { IoIosSearch, IoMdAddCircleOutline } from "react-icons/io";
import SearchTable from '@/components/SearchTable';
import { FaChevronLeft } from "react-icons/fa6";
import { FaRegFilePdf } from "react-icons/fa";
import DragDrop from '@/components/FileInput';
import { FaRegFileImage } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MenuItem, Stack, TextField } from '@mui/material';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { DatePicker } from '@mui/x-date-pickers';
import DynamicDatePicker from '@/components/DatePickerInput';
import PopupInput from '@/components/PopupInput';

const Detail = () => {
    const [open, setOpen] = useState(false);
    const [openBid, setOpenBid] = useState(false);
    const [openContactAssign, setOpenContactAssign,] = useState(false);
    const [active, setActive] = useState('Order');
    const [clarificationDetail, setClarificationDetail] = useState(false)
    const [documentDetail, setDocumentDetail] = useState(false)
    const [bidDetail, setBidDetail] = useState(false)
    const [showReply, setShowReply] = useState(false)
    const contentShow = (category) => {
        console.log(category);
        setActive(category)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpenBid = () => {
        setOpenBid(true);
    };
    const handleClickOpenContact = () => {
        setOpenContactAssign(true);
    };
    const handlCloseBid = () => {
        setOpenBid(false);
    };
    const handlCloseContact = () => {
        setOpenContactAssign(false);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleRowClick = () => {
        setClarificationDetail(true)
    }
    const handleDocRowClick = () => {
        setDocumentDetail(true)
    }
    const handleBidRowClick = () => {
        setBidDetail(true)
    }

    const tabs = [
        { label: 'Item One', content: "<TabContentOne />" },
        { label: 'Item Two', content: "<TabContentTwo />" },
        { label: 'Item Three', content: "<TabContentThree />" },
    ];
    const breadcrumbItems = [{ label: 'Dashboard', href: '/' }, { label: 'RFx List', href: '/rfx' }, { label: 'GP-RFX-02', href: '/rfx' }];
    const [rows, setRows] = useState([]);
    const documentRow = [{ id: rows.length + 1, checkbox: 'dddd.png', description: 'Technical Proposal', crmId: '102345-TEC-R0', customer: 'Tech..', issueDate: '20 Jul 2021', salePerson: 'Bryan C.', status: 'issued', }]
    const Bidrows = []
    const typeInput = [
        { value: "Technical", label: "Technical" },
        { value: "Commercial", label: "Commercial" },
        { value: "Commercial Unpriced", label: "Commercial Unpriced" },
        { value: "Combined Techno Commercial", label: "Combined Techno Commercial" },
    ];
    const datePickerLabels = ["Issue Date", "Due Date"]
    // Function to add a new row
    const addRow = () => {
        const newRow = {
            id: rows.length + 1,
            checkbox: 'dddd.png',
            description: 'New Opportunity',
            crmId: 'newCrmId',
            customer: 'New Customer',
            issueDate: 'New Date',
            salePerson: 'New Salesperson',
            status: 'New Status',
        };

        // Update the rows state
        setRows((prevRows) => [...prevRows, newRow]);
    };
    const NoRowsOverlayClarification = () => (
        <Stack height="100%" alignItems="center" justifyContent="center">
            <Image src="/no-row.png" width={480} height={260} alt="no row" />
            <p className='text-[#252631] text-xl mb-3'>No clarifications yet</p>
            <p className='text-[#778CA2] text-lg font-light mb-3'>You’ll see them here if there are any clarifications posted</p>
        </Stack>
    );
    const NoRowsOverlayOrder = () => (
        <Stack height="100%" alignItems="center" justifyContent="center">
            <Image src="/no-order.png" width={480} height={260} alt="no order"/>
            <p className='text-[#252631] text-xl mb-3'>No Orders found</p>
            <p className='text-[#778CA2] text-lg font-light mb-3'>You can create a new one here</p>
            <div className="flex items-center gap-6">
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={handleBidRowClick}>Add Order</button>
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={handleBidRowClick}>Mark as lost</button>
            </div>
        </Stack>
    );
    const NoRowsOverlayDocuments = () => (
        <Stack height="100%" alignItems="center" justifyContent="center">
            <Image src="/no-doc.png" width={480} height={260} alt="no doc" />
            <p className='text-[#252631] text-xl mb-3'>No bid documents recieved yet</p>
            <p className='text-[#778CA2] text-lg font-light mb-3'>You’ll see it here once its posted</p>
        </Stack>
    );
    const NoRowsOverlayBids = () => (
        <Stack height="auto" alignItems="center" justifyContent="center">
            <Image src="/no-clarification.png" width={480} height={260} alt="no clarification" />
            <p className='text-[#252631] text-xl mb-3'>No clarifications requested yet</p>
            <p className='text-[#778CA2] text-lg font-light mb-3'>You can request clarifications around the bid here</p>
            <div className="flex items-center gap-6">
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={handleBidRowClick}>Request Clarification</button>
                <button className='text-white bg-[#26BADA] p-3 uppercase  min-w-[200px]' onClick={handleBidRowClick}>Skip Clarification</button>
            </div>
        </Stack>
    );

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems} />
            {/* NOTIFICATION DIV */}
            <div className="flex bg-white mb-6 ">
                <div className="flex justify-between max-w-[60%] w-full border-r border-gray-200 p-[10px]">
                    <span className="text-xl">DRP Refinery Automation</span>
                    <span className="text-sm text-[#FF912B]">GP-RFX-02</span>
                </div>
                <div className=" px-8 whitespace-nowrap flex items-center justify-center gap-2 text-[#98A9BC] border-r border-gray-200">
                    <FaRegCalendarMinus />
                    <p>Activity Feed</p>
                </div>
                <div className=" px-8 whitespace-nowrap flex items-center justify-center gap-2 text-[#98A9BC] border-r border-gray-200">
                    <Image src="/msg.svg" width={22} height={25} alt="message" />
                    <p> <span className="text-black">21</span> Messages</p>
                </div>
                <div className=" px-8 whitespace-nowrap flex items-center justify-center gap-2 text-[#98A9BC] border-r border-gray-200">
                    <Image src="/bell.svg" width={22} height={25} alt="notification" />
                    <p> <span className="text-black">2</span> Alerts</p>
                </div>
                <div className="whitespace-nowrap flex items-center justify-center px-8"><BsThreeDots /></div>
            </div>
            {/* DASHBOARD CARDS */}
            <div className="flex items-center justify-between gap-5">
                <div className="flex bg-white p-5 justify-between items-center w-[33%] shadow-sm">
                    <div className="rounded-full bg-[#00AAEC] p-[14px] mr-5 ring-offset-2 ring-2 ring-[#00AAEC]">
                        <VscChecklist className="text-white text-[22px]" />
                    </div>
                    <div className="flex flex-col flex-[3]">
                        <p className="text-sm text-[#98A9BC]">RFx Clarifications</p>
                        <span className="text-[26px]">-/-</span>
                    </div>
                    <div className="flex-[1]">
                        <span className="text-sm">-%</span>
                    </div>
                </div>
                <div className="flex bg-white p-5 justify-between items-center w-[33%] shadow-sm">
                    <div className="rounded-full bg-[#FFAB2B] p-[14px] mr-5 ring-offset-2 ring-2 ring-[#FFAB2B]">
                        <VscChecklist className="text-white text-[22px]" />
                    </div>
                    <div className="flex flex-col flex-[3]">
                        <p className="text-sm text-[#98A9BC]">Bid Clarifications</p>
                        <span className="text-[26px]">-/-</span>
                    </div>
                    <div className="flex-[1]">
                        <span className="text-sm">-%</span>
                    </div>
                </div>
                <div className="flex bg-white p-5 justify-between items-center w-[33%] shadow-sm">
                    <div className="rounded-full bg-[#6DD230] p-[14px] mr-5 ring-offset-2 ring-2 ring-[#6DD230]">
                        <FaBarsProgress className="text-white text-[22px]" />
                    </div>
                    <div className="flex flex-col flex-[3]">
                        <progress id="file" value="32" max="100" className="h-[6px] progressbar mb-2"></progress>
                        <p className="text-sm text-[#98A9BC]">Completion Progress</p>
                    </div>
                    <div className="flex-[1]">
                        <span className="text-sm text-[#FE4D97]">5%</span>
                    </div>
                </div>
            </div>
            <div className=" bg-white px-1 mt-[14px] py-4 flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="10%" viewBox="0 0 109 40" fill="none">
                    <g filter="url(#filter0_d_4480_12148)">
                        <mask id="path-[1px]-inside-1_4480_12148" fill="white">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2 5C2 2.79086 3.79086 1 6 1H90.2037C91.3463 1 92.4343 1.48859 93.1934 2.34254L105.638 16.3425C106.985 17.8581 106.985 20.1419 105.638 21.6575L93.1934 35.6575C92.4343 36.5114 91.3463 37 90.2037 37H6C3.79086 37 2 35.2091 2 33V5Z" />
                        </mask>
                        <path fillRule="evenodd" clipRule="evenodd" d="M2 5C2 2.79086 3.79086 1 6 1H90.2037C91.3463 1 92.4343 1.48859 93.1934 2.34254L105.638 16.3425C106.985 17.8581 106.985 20.1419 105.638 21.6575L93.1934 35.6575C92.4343 36.5114 91.3463 37 90.2037 37H6C3.79086 37 2 35.2091 2 33V5Z" fill="#F1FBEB" />
                        <path d="M105.638 16.3425L104.89 17.0069L105.638 16.3425ZM105.638 21.6575L104.89 20.9931L105.638 21.6575ZM93.1934 35.6575L92.446 34.9931L93.1934 35.6575ZM90.2037 0H6V2H90.2037V0ZM92.446 3.00691L104.89 17.0069L106.385 15.6782L93.9408 1.67818L92.446 3.00691ZM104.89 17.0069C105.901 18.1436 105.901 19.8564 104.89 20.9931L106.385 22.3218C108.069 20.4274 108.069 17.5726 106.385 15.6782L104.89 17.0069ZM104.89 20.9931L92.446 34.9931L93.9408 36.3218L106.385 22.3218L104.89 20.9931ZM6 38H90.2037V36H6V38ZM1 5V33H3V5H1ZM92.446 34.9931C91.8767 35.6336 91.0606 36 90.2037 36V38C91.6319 38 92.9919 37.3893 93.9408 36.3218L92.446 34.9931ZM6 0C3.23858 0 1 2.23858 1 5H3C3 3.34315 4.34315 2 6 2V0ZM6 36C4.34315 36 3 34.6569 3 33H1C1 35.7614 3.23858 38 6 38V36ZM90.2037 2C91.0606 2 91.8767 2.36644 92.446 3.00691L93.9408 1.67818C92.9919 0.610739 91.6319 0 90.2037 0V2Z" fill="#6DD230" mask="url(#path-1-inside-1_4480_12148)" />
                        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#6DD230" fontSize="12">
                            RFx Issued
                        </text>
                    </g>
                    <defs>
                        <filter id="filter0_d_4480_12148" x="0" y="0" width="108.648" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.215686 0 0 0 0 0.254902 0 0 0 0 0.317647 0 0 0 0.08 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4480_12148" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4480_12148" result="shape" />
                        </filter>
                    </defs>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="13%" viewBox="0 0 163 40" fill="none">
                    <g filter="url(#filter0_d_4480_12155)">
                        <mask id="path-1-inside-1_4480_12155" fill="white">
                            <path fillRule="evenodd" clipRule="evenodd" d="M147.193 2.34255C146.434 1.48859 145.346 1 144.204 1H6.90724C3.45584 1 1.62462 5.07785 3.9176 7.65745L11.6377 16.3425C12.9848 17.8581 12.9848 20.1419 11.6377 21.6575L3.9176 30.3425C1.62462 32.9221 3.45585 37 6.90724 37H144.204C145.346 37 146.434 36.5114 147.193 35.6575L159.638 21.6575C160.985 20.1419 160.985 17.8581 159.638 16.3425L147.193 2.34255Z" />
                        </mask>
                        <path fillRule="evenodd" clipRule="evenodd" d="M147.193 2.34255C146.434 1.48859 145.346 1 144.204 1H6.90724C3.45584 1 1.62462 5.07785 3.9176 7.65745L11.6377 16.3425C12.9848 17.8581 12.9848 20.1419 11.6377 21.6575L3.9176 30.3425C1.62462 32.9221 3.45585 37 6.90724 37H144.204C145.346 37 146.434 36.5114 147.193 35.6575L159.638 21.6575C160.985 20.1419 160.985 17.8581 159.638 16.3425L147.193 2.34255Z" fill="#E6F5FF" />
                        <path d="M11.6377 16.3425L10.8903 17.0069H10.8903L11.6377 16.3425ZM11.6377 21.6575L12.3851 22.3218L11.6377 21.6575ZM159.638 21.6575L158.89 20.9931L159.638 21.6575ZM159.638 16.3425L158.89 17.0069L159.638 16.3425ZM147.193 2.34255L147.941 1.67818L147.193 2.34255ZM147.193 35.6575L147.941 36.3218L147.193 35.6575ZM6.90724 2H144.204V0H6.90724V2ZM12.3851 15.6782L4.66501 6.99309L3.17019 8.32182L10.8903 17.0069L12.3851 15.6782ZM12.3851 22.3218C14.069 20.4274 14.069 17.5726 12.3851 15.6782L10.8903 17.0069C11.9006 18.1436 11.9006 19.8564 10.8903 20.9931L12.3851 22.3218ZM4.66501 31.0069L12.3851 22.3218L10.8903 20.9931L3.17019 29.6782L4.66501 31.0069ZM144.204 36H6.90724V38H144.204V36ZM158.89 20.9931L146.446 34.9931L147.941 36.3218L160.385 22.3218L158.89 20.9931ZM158.89 17.0069C159.901 18.1436 159.901 19.8564 158.89 20.9931L160.385 22.3218C162.069 20.4274 162.069 17.5726 160.385 15.6782L158.89 17.0069ZM146.446 3.00691L158.89 17.0069L160.385 15.6782L147.941 1.67818L146.446 3.00691ZM3.17019 29.6782C0.303961 32.9027 2.593 38 6.90724 38V36C4.31869 36 2.94527 32.9416 4.66501 31.0069L3.17019 29.6782ZM144.204 2C145.061 2 145.877 2.36644 146.446 3.00691L147.941 1.67818C146.992 0.610741 145.632 0 144.204 0V2ZM144.204 38C145.632 38 146.992 37.3893 147.941 36.3218L146.446 34.9931C145.877 35.6336 145.061 36 144.204 36V38ZM6.90724 0C2.59299 0 0.303961 5.09731 3.17019 8.32182L4.66501 6.99309C2.94527 5.05839 4.31869 2 6.90724 2V0Z" fill="#7EC4F6" mask="url(#path-1-inside-1_4480_12155)" />
                        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#1960A6" fontSize="12">
                            RFx Acknowledge
                        </text>
                    </g>
                    <defs>
                        <filter id="filter0_d_4480_12155" x="0.899414" y="0" width="161.749" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.215686 0 0 0 0 0.254902 0 0 0 0 0.317647 0 0 0 0.08 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4480_12155" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4480_12155" result="shape" />
                        </filter>
                    </defs>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="13%" viewBox="0 0 155 40" fill="none">
                    <g filter="url(#filter0_d_4480_12163)">
                        <mask id="path-1-inside-1_4480_12163" fill="white">
                            <path fillRule="evenodd" clipRule="evenodd" d="M139.193 2.34255C138.434 1.48859 137.346 1 136.204 1H6.90724C3.45584 1 1.62462 5.07785 3.9176 7.65745L11.6377 16.3425C12.9848 17.8581 12.9848 20.1419 11.6377 21.6575L3.9176 30.3425C1.62462 32.9221 3.45585 37 6.90724 37H136.204C137.346 37 138.434 36.5114 139.193 35.6575L151.638 21.6575C152.985 20.1419 152.985 17.8581 151.638 16.3425L139.193 2.34255Z" />
                        </mask>
                        <path fillRule="evenodd" clipRule="evenodd" d="M139.193 2.34255C138.434 1.48859 137.346 1 136.204 1H6.90724C3.45584 1 1.62462 5.07785 3.9176 7.65745L11.6377 16.3425C12.9848 17.8581 12.9848 20.1419 11.6377 21.6575L3.9176 30.3425C1.62462 32.9221 3.45585 37 6.90724 37H136.204C137.346 37 138.434 36.5114 139.193 35.6575L151.638 21.6575C152.985 20.1419 152.985 17.8581 151.638 16.3425L139.193 2.34255Z" fill="white" />
                        <path d="M11.6377 16.3425L10.8903 17.0069H10.8903L11.6377 16.3425ZM11.6377 21.6575L12.3851 22.3218L11.6377 21.6575ZM151.638 21.6575L150.89 20.9931L151.638 21.6575ZM151.638 16.3425L150.89 17.0069L151.638 16.3425ZM139.193 2.34255L139.941 1.67818L139.193 2.34255ZM139.193 35.6575L139.941 36.3218L139.193 35.6575ZM6.90724 2H136.204V0H6.90724V2ZM12.3851 15.6782L4.66501 6.99309L3.17019 8.32182L10.8903 17.0069L12.3851 15.6782ZM12.3851 22.3218C14.069 20.4274 14.069 17.5726 12.3851 15.6782L10.8903 17.0069C11.9006 18.1436 11.9006 19.8564 10.8903 20.9931L12.3851 22.3218ZM4.66501 31.0069L12.3851 22.3218L10.8903 20.9931L3.17019 29.6782L4.66501 31.0069ZM136.204 36H6.90724V38H136.204V36ZM150.89 20.9931L138.446 34.9931L139.941 36.3218L152.385 22.3218L150.89 20.9931ZM150.89 17.0069C151.901 18.1436 151.901 19.8564 150.89 20.9931L152.385 22.3218C154.069 20.4274 154.069 17.5726 152.385 15.6782L150.89 17.0069ZM138.446 3.00691L150.89 17.0069L152.385 15.6782L139.941 1.67818L138.446 3.00691ZM3.17019 29.6782C0.303962 32.9027 2.593 38 6.90724 38V36C4.31869 36 2.94527 32.9416 4.66501 31.0069L3.17019 29.6782ZM136.204 2C137.061 2 137.877 2.36644 138.446 3.00691L139.941 1.67818C138.992 0.610742 137.632 0 136.204 0V2ZM136.204 38C137.632 38 138.992 37.3893 139.941 36.3218L138.446 34.9931C137.877 35.6336 137.061 36 136.204 36V38ZM6.90724 0C2.59299 0 0.303962 5.09731 3.17019 8.32182L4.66501 6.99309C2.94527 5.05839 4.31869 2 6.90724 2V0Z" fill="#D2D6DC" mask="url(#path-1-inside-1_4480_12163)" />
                        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#6B7280" fontSize="12">RFx Clarifications</text>
                    </g>
                    <defs>
                        <filter id="filter0_d_4480_12163" x="0.899414" y="0" width="153.749" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.215686 0 0 0 0 0.254902 0 0 0 0 0.317647 0 0 0 0.08 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4480_12163" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4480_12163" result="shape" />
                        </filter>
                    </defs>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="13%" viewBox="0 0 155 40" fill="none">
                    <g filter="url(#filter0_d_4480_12163)">
                        <mask id="path-1-inside-1_4480_12163" fill="white">
                            <path fillRule="evenodd" clipRule="evenodd" d="M139.193 2.34255C138.434 1.48859 137.346 1 136.204 1H6.90724C3.45584 1 1.62462 5.07785 3.9176 7.65745L11.6377 16.3425C12.9848 17.8581 12.9848 20.1419 11.6377 21.6575L3.9176 30.3425C1.62462 32.9221 3.45585 37 6.90724 37H136.204C137.346 37 138.434 36.5114 139.193 35.6575L151.638 21.6575C152.985 20.1419 152.985 17.8581 151.638 16.3425L139.193 2.34255Z" />
                        </mask>
                        <path fillRule="evenodd" clipRule="evenodd" d="M139.193 2.34255C138.434 1.48859 137.346 1 136.204 1H6.90724C3.45584 1 1.62462 5.07785 3.9176 7.65745L11.6377 16.3425C12.9848 17.8581 12.9848 20.1419 11.6377 21.6575L3.9176 30.3425C1.62462 32.9221 3.45585 37 6.90724 37H136.204C137.346 37 138.434 36.5114 139.193 35.6575L151.638 21.6575C152.985 20.1419 152.985 17.8581 151.638 16.3425L139.193 2.34255Z" fill="white" />
                        <path d="M11.6377 16.3425L10.8903 17.0069H10.8903L11.6377 16.3425ZM11.6377 21.6575L12.3851 22.3218L11.6377 21.6575ZM151.638 21.6575L150.89 20.9931L151.638 21.6575ZM151.638 16.3425L150.89 17.0069L151.638 16.3425ZM139.193 2.34255L139.941 1.67818L139.193 2.34255ZM139.193 35.6575L139.941 36.3218L139.193 35.6575ZM6.90724 2H136.204V0H6.90724V2ZM12.3851 15.6782L4.66501 6.99309L3.17019 8.32182L10.8903 17.0069L12.3851 15.6782ZM12.3851 22.3218C14.069 20.4274 14.069 17.5726 12.3851 15.6782L10.8903 17.0069C11.9006 18.1436 11.9006 19.8564 10.8903 20.9931L12.3851 22.3218ZM4.66501 31.0069L12.3851 22.3218L10.8903 20.9931L3.17019 29.6782L4.66501 31.0069ZM136.204 36H6.90724V38H136.204V36ZM150.89 20.9931L138.446 34.9931L139.941 36.3218L152.385 22.3218L150.89 20.9931ZM150.89 17.0069C151.901 18.1436 151.901 19.8564 150.89 20.9931L152.385 22.3218C154.069 20.4274 154.069 17.5726 152.385 15.6782L150.89 17.0069ZM138.446 3.00691L150.89 17.0069L152.385 15.6782L139.941 1.67818L138.446 3.00691ZM3.17019 29.6782C0.303962 32.9027 2.593 38 6.90724 38V36C4.31869 36 2.94527 32.9416 4.66501 31.0069L3.17019 29.6782ZM136.204 2C137.061 2 137.877 2.36644 138.446 3.00691L139.941 1.67818C138.992 0.610742 137.632 0 136.204 0V2ZM136.204 38C137.632 38 138.992 37.3893 139.941 36.3218L138.446 34.9931C137.877 35.6336 137.061 36 136.204 36V38ZM6.90724 0C2.59299 0 0.303962 5.09731 3.17019 8.32182L4.66501 6.99309C2.94527 5.05839 4.31869 2 6.90724 2V0Z" fill="#D2D6DC" mask="url(#path-1-inside-1_4480_12163)" />
                        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#6B7280" fontSize="12">Bid Submission</text>
                    </g>
                    <defs>
                        <filter id="filter0_d_4480_12163" x="0.899414" y="0" width="153.749" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.215686 0 0 0 0 0.254902 0 0 0 0 0.317647 0 0 0 0.08 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4480_12163" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4480_12163" result="shape" />
                        </filter>
                    </defs>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="13%" viewBox="0 0 155 40" fill="none">
                    <g filter="url(#filter0_d_4480_12163)">
                        <mask id="path-1-inside-1_4480_12163" fill="white">
                            <path fillRule="evenodd" clipRule="evenodd" d="M139.193 2.34255C138.434 1.48859 137.346 1 136.204 1H6.90724C3.45584 1 1.62462 5.07785 3.9176 7.65745L11.6377 16.3425C12.9848 17.8581 12.9848 20.1419 11.6377 21.6575L3.9176 30.3425C1.62462 32.9221 3.45585 37 6.90724 37H136.204C137.346 37 138.434 36.5114 139.193 35.6575L151.638 21.6575C152.985 20.1419 152.985 17.8581 151.638 16.3425L139.193 2.34255Z" />
                        </mask>
                        <path fillRule="evenodd" clipRule="evenodd" d="M139.193 2.34255C138.434 1.48859 137.346 1 136.204 1H6.90724C3.45584 1 1.62462 5.07785 3.9176 7.65745L11.6377 16.3425C12.9848 17.8581 12.9848 20.1419 11.6377 21.6575L3.9176 30.3425C1.62462 32.9221 3.45585 37 6.90724 37H136.204C137.346 37 138.434 36.5114 139.193 35.6575L151.638 21.6575C152.985 20.1419 152.985 17.8581 151.638 16.3425L139.193 2.34255Z" fill="white" />
                        <path d="M11.6377 16.3425L10.8903 17.0069H10.8903L11.6377 16.3425ZM11.6377 21.6575L12.3851 22.3218L11.6377 21.6575ZM151.638 21.6575L150.89 20.9931L151.638 21.6575ZM151.638 16.3425L150.89 17.0069L151.638 16.3425ZM139.193 2.34255L139.941 1.67818L139.193 2.34255ZM139.193 35.6575L139.941 36.3218L139.193 35.6575ZM6.90724 2H136.204V0H6.90724V2ZM12.3851 15.6782L4.66501 6.99309L3.17019 8.32182L10.8903 17.0069L12.3851 15.6782ZM12.3851 22.3218C14.069 20.4274 14.069 17.5726 12.3851 15.6782L10.8903 17.0069C11.9006 18.1436 11.9006 19.8564 10.8903 20.9931L12.3851 22.3218ZM4.66501 31.0069L12.3851 22.3218L10.8903 20.9931L3.17019 29.6782L4.66501 31.0069ZM136.204 36H6.90724V38H136.204V36ZM150.89 20.9931L138.446 34.9931L139.941 36.3218L152.385 22.3218L150.89 20.9931ZM150.89 17.0069C151.901 18.1436 151.901 19.8564 150.89 20.9931L152.385 22.3218C154.069 20.4274 154.069 17.5726 152.385 15.6782L150.89 17.0069ZM138.446 3.00691L150.89 17.0069L152.385 15.6782L139.941 1.67818L138.446 3.00691ZM3.17019 29.6782C0.303962 32.9027 2.593 38 6.90724 38V36C4.31869 36 2.94527 32.9416 4.66501 31.0069L3.17019 29.6782ZM136.204 2C137.061 2 137.877 2.36644 138.446 3.00691L139.941 1.67818C138.992 0.610742 137.632 0 136.204 0V2ZM136.204 38C137.632 38 138.992 37.3893 139.941 36.3218L138.446 34.9931C137.877 35.6336 137.061 36 136.204 36V38ZM6.90724 0C2.59299 0 0.303962 5.09731 3.17019 8.32182L4.66501 6.99309C2.94527 5.05839 4.31869 2 6.90724 2V0Z" fill="#D2D6DC" mask="url(#path-1-inside-1_4480_12163)" />
                        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#6B7280" fontSize="12">Bid Acknowledge</text>
                    </g>
                    <defs>
                        <filter id="filter0_d_4480_12163" x="0.899414" y="0" width="153.749" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.215686 0 0 0 0 0.254902 0 0 0 0 0.317647 0 0 0 0.08 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4480_12163" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4480_12163" result="shape" />
                        </filter>
                    </defs>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="13%" viewBox="0 0 155 40" fill="none">
                    <g filter="url(#filter0_d_4480_12163)">
                        <mask id="path-1-inside-1_4480_12163" fill="white">
                            <path fillRule="evenodd" clipRule="evenodd" d="M139.193 2.34255C138.434 1.48859 137.346 1 136.204 1H6.90724C3.45584 1 1.62462 5.07785 3.9176 7.65745L11.6377 16.3425C12.9848 17.8581 12.9848 20.1419 11.6377 21.6575L3.9176 30.3425C1.62462 32.9221 3.45585 37 6.90724 37H136.204C137.346 37 138.434 36.5114 139.193 35.6575L151.638 21.6575C152.985 20.1419 152.985 17.8581 151.638 16.3425L139.193 2.34255Z" />
                        </mask>
                        <path fillRule="evenodd" clipRule="evenodd" d="M139.193 2.34255C138.434 1.48859 137.346 1 136.204 1H6.90724C3.45584 1 1.62462 5.07785 3.9176 7.65745L11.6377 16.3425C12.9848 17.8581 12.9848 20.1419 11.6377 21.6575L3.9176 30.3425C1.62462 32.9221 3.45585 37 6.90724 37H136.204C137.346 37 138.434 36.5114 139.193 35.6575L151.638 21.6575C152.985 20.1419 152.985 17.8581 151.638 16.3425L139.193 2.34255Z" fill="white" />
                        <path d="M11.6377 16.3425L10.8903 17.0069H10.8903L11.6377 16.3425ZM11.6377 21.6575L12.3851 22.3218L11.6377 21.6575ZM151.638 21.6575L150.89 20.9931L151.638 21.6575ZM151.638 16.3425L150.89 17.0069L151.638 16.3425ZM139.193 2.34255L139.941 1.67818L139.193 2.34255ZM139.193 35.6575L139.941 36.3218L139.193 35.6575ZM6.90724 2H136.204V0H6.90724V2ZM12.3851 15.6782L4.66501 6.99309L3.17019 8.32182L10.8903 17.0069L12.3851 15.6782ZM12.3851 22.3218C14.069 20.4274 14.069 17.5726 12.3851 15.6782L10.8903 17.0069C11.9006 18.1436 11.9006 19.8564 10.8903 20.9931L12.3851 22.3218ZM4.66501 31.0069L12.3851 22.3218L10.8903 20.9931L3.17019 29.6782L4.66501 31.0069ZM136.204 36H6.90724V38H136.204V36ZM150.89 20.9931L138.446 34.9931L139.941 36.3218L152.385 22.3218L150.89 20.9931ZM150.89 17.0069C151.901 18.1436 151.901 19.8564 150.89 20.9931L152.385 22.3218C154.069 20.4274 154.069 17.5726 152.385 15.6782L150.89 17.0069ZM138.446 3.00691L150.89 17.0069L152.385 15.6782L139.941 1.67818L138.446 3.00691ZM3.17019 29.6782C0.303962 32.9027 2.593 38 6.90724 38V36C4.31869 36 2.94527 32.9416 4.66501 31.0069L3.17019 29.6782ZM136.204 2C137.061 2 137.877 2.36644 138.446 3.00691L139.941 1.67818C138.992 0.610742 137.632 0 136.204 0V2ZM136.204 38C137.632 38 138.992 37.3893 139.941 36.3218L138.446 34.9931C137.877 35.6336 137.061 36 136.204 36V38ZM6.90724 0C2.59299 0 0.303962 5.09731 3.17019 8.32182L4.66501 6.99309C2.94527 5.05839 4.31869 2 6.90724 2V0Z" fill="#D2D6DC" mask="url(#path-1-inside-1_4480_12163)" />
                        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#6B7280" fontSize="12">Bid Clarifications</text>
                    </g>
                    <defs>
                        <filter id="filter0_d_4480_12163" x="0.899414" y="0" width="153.749" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.215686 0 0 0 0 0.254902 0 0 0 0 0.317647 0 0 0 0.08 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4480_12163" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4480_12163" result="shape" />
                        </filter>
                    </defs>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="13%" viewBox="0 0 155 40" fill="none">
                    <g filter="url(#filter0_d_4480_12163)">
                        <mask id="path-1-inside-1_4480_12163" fill="white">
                            <path fillRule="evenodd" clipRule="evenodd" d="M139.193 2.34255C138.434 1.48859 137.346 1 136.204 1H6.90724C3.45584 1 1.62462 5.07785 3.9176 7.65745L11.6377 16.3425C12.9848 17.8581 12.9848 20.1419 11.6377 21.6575L3.9176 30.3425C1.62462 32.9221 3.45585 37 6.90724 37H136.204C137.346 37 138.434 36.5114 139.193 35.6575L151.638 21.6575C152.985 20.1419 152.985 17.8581 151.638 16.3425L139.193 2.34255Z" />
                        </mask>
                        <path fillRule="evenodd" clipRule="evenodd" d="M139.193 2.34255C138.434 1.48859 137.346 1 136.204 1H6.90724C3.45584 1 1.62462 5.07785 3.9176 7.65745L11.6377 16.3425C12.9848 17.8581 12.9848 20.1419 11.6377 21.6575L3.9176 30.3425C1.62462 32.9221 3.45585 37 6.90724 37H136.204C137.346 37 138.434 36.5114 139.193 35.6575L151.638 21.6575C152.985 20.1419 152.985 17.8581 151.638 16.3425L139.193 2.34255Z" fill="white" />
                        <path d="M11.6377 16.3425L10.8903 17.0069H10.8903L11.6377 16.3425ZM11.6377 21.6575L12.3851 22.3218L11.6377 21.6575ZM151.638 21.6575L150.89 20.9931L151.638 21.6575ZM151.638 16.3425L150.89 17.0069L151.638 16.3425ZM139.193 2.34255L139.941 1.67818L139.193 2.34255ZM139.193 35.6575L139.941 36.3218L139.193 35.6575ZM6.90724 2H136.204V0H6.90724V2ZM12.3851 15.6782L4.66501 6.99309L3.17019 8.32182L10.8903 17.0069L12.3851 15.6782ZM12.3851 22.3218C14.069 20.4274 14.069 17.5726 12.3851 15.6782L10.8903 17.0069C11.9006 18.1436 11.9006 19.8564 10.8903 20.9931L12.3851 22.3218ZM4.66501 31.0069L12.3851 22.3218L10.8903 20.9931L3.17019 29.6782L4.66501 31.0069ZM136.204 36H6.90724V38H136.204V36ZM150.89 20.9931L138.446 34.9931L139.941 36.3218L152.385 22.3218L150.89 20.9931ZM150.89 17.0069C151.901 18.1436 151.901 19.8564 150.89 20.9931L152.385 22.3218C154.069 20.4274 154.069 17.5726 152.385 15.6782L150.89 17.0069ZM138.446 3.00691L150.89 17.0069L152.385 15.6782L139.941 1.67818L138.446 3.00691ZM3.17019 29.6782C0.303962 32.9027 2.593 38 6.90724 38V36C4.31869 36 2.94527 32.9416 4.66501 31.0069L3.17019 29.6782ZM136.204 2C137.061 2 137.877 2.36644 138.446 3.00691L139.941 1.67818C138.992 0.610742 137.632 0 136.204 0V2ZM136.204 38C137.632 38 138.992 37.3893 139.941 36.3218L138.446 34.9931C137.877 35.6336 137.061 36 136.204 36V38ZM6.90724 0C2.59299 0 0.303962 5.09731 3.17019 8.32182L4.66501 6.99309C2.94527 5.05839 4.31869 2 6.90724 2V0Z" fill="#D2D6DC" mask="url(#path-1-inside-1_4480_12163)" />
                        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#6B7280" fontSize="12">Bid Revision</text>
                    </g>
                    <defs>
                        <filter id="filter0_d_4480_12163" x="0.899414" y="0" width="153.749" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.215686 0 0 0 0 0.254902 0 0 0 0 0.317647 0 0 0 0.08 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4480_12163" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4480_12163" result="shape" />
                        </filter>
                    </defs>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="11%" viewBox="0 0 140 40" fill="none">
                    <g filter="url(#filter0_d_4480_12203)">
                        <mask id="path-1-inside-1_4480_12203" fill="white">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.9176 7.65746C1.62462 5.07785 3.45585 1 6.90724 1H134C136.209 1 138 2.79086 138 5V33C138 35.2091 136.209 37 134 37H6.90724C3.45584 37 1.62462 32.9221 3.9176 30.3425L11.6377 21.6575C12.9848 20.1419 12.9848 17.8581 11.6377 16.3425L3.9176 7.65746Z" />
                        </mask>
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.9176 7.65746C1.62462 5.07785 3.45585 1 6.90724 1H134C136.209 1 138 2.79086 138 5V33C138 35.2091 136.209 37 134 37H6.90724C3.45584 37 1.62462 32.9221 3.9176 30.3425L11.6377 21.6575C12.9848 20.1419 12.9848 17.8581 11.6377 16.3425L3.9176 7.65746Z" fill="white" />
                        <path d="M11.6377 21.6575L12.3851 22.3218L11.6377 21.6575ZM11.6377 16.3425L10.8903 17.0069H10.8903L11.6377 16.3425ZM134 0H6.90724V2H134V0ZM139 33V5H137V33H139ZM6.90724 38H134V36H6.90724V38ZM10.8903 20.9931L3.17019 29.6782L4.66501 31.0069L12.3851 22.3218L10.8903 20.9931ZM10.8903 17.0069C11.9006 18.1436 11.9006 19.8564 10.8903 20.9931L12.3851 22.3218C14.069 20.4274 14.069 17.5726 12.3851 15.6782L10.8903 17.0069ZM3.17019 8.32182L10.8903 17.0069L12.3851 15.6782L4.66501 6.99309L3.17019 8.32182ZM6.90724 36C4.31869 36 2.94527 32.9416 4.66501 31.0069L3.17019 29.6782C0.303962 32.9027 2.59299 38 6.90724 38V36ZM137 33C137 34.6569 135.657 36 134 36V38C136.761 38 139 35.7614 139 33H137ZM6.90724 0C2.593 0 0.303962 5.09731 3.17019 8.32182L4.66501 6.99309C2.94527 5.05839 4.31869 2 6.90724 2V0ZM134 2C135.657 2 137 3.34315 137 5H139C139 2.23858 136.761 0 134 0V2Z" fill="#D2D6DC" mask="url(#path-1-inside-1_4480_12203)" />
                        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="black" fontSize="12">Order</text>

                    </g>
                    <defs>
                        <filter id="filter0_d_4480_12203" x="0.899414" y="0" width="139.101" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="1" />
                            <feGaussianBlur stdDeviation="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.215686 0 0 0 0 0.254902 0 0 0 0 0.317647 0 0 0 0.08 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4480_12203" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4480_12203" result="shape" />
                        </filter>
                    </defs>
                </svg>
            </div>
            <div className="flex items-center justify-between bg-[#FFF8EE] shadow-md p-2 mt-4">
                <div className="">
                    <FaInfoCircle className="text-[#FFAB2B]" />
                </div>
                <div className="">
                    <p className="text-[#778CA2] ">RFQ acknowledgement awaited. <Link href="/" className="text-[#00AAEC] "> Upload RFx Acknowledgement</Link></p>
                </div>
                <div className=""><RxCrossCircled className="text-[#26BADA]" /></div>
            </div>
            <div className="flex gap-2 mt-2">
                <span className={`font-medium bg-white px-4 py-2 border border-[#ddd] cursor-pointer ${active === 'Overview' ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('Overview')}>Overview</span>
                <span className={`font-medium bg-white px-4 py-2 border border-[#ddd] cursor-pointer ${active === 'RFx Clarifications' ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('RFx Clarifications')}>RFx Clarifications</span>
                <span className={`font-medium bg-white px-4 py-2 border border-[#ddd] cursor-pointer ${active === 'Bid Documents' ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('Bid Documents')}>Bid Documents</span>
                <span className={`font-medium bg-white px-4 py-2 border border-[#ddd] cursor-pointer ${active === 'Bid Clarifications' ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('Bid Clarifications')}>Bid Clarifications</span>
                <span className={`font-medium bg-white px-4 py-2 border border-[#ddd] cursor-pointer ${active === 'Order' ? 'text-black' : 'text-[#778CA2]'}`} onClick={() => contentShow('Order')}>Order</span>
            </div>
            <div className="Content bg-white">
                {active === 'Overview' && <div className="bg-white p-8 mt-1">
                    <div className="flex w-full">
                        <div className="flex-[2] flex justify-between" >
                            <div className="flex flex-col">
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">RFx ID</span>
                                    <span className="block">Not Assigned</span>
                                </div>
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">CRM ID</span>
                                    <span className="block">75121</span>
                                </div>
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">Custmer</span>
                                    <span className="block">Galaxy Petroleum Company</span>
                                </div>
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">End User</span>
                                    <span className="block">Angola</span>
                                </div>
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">Business unit</span>
                                    <span className="block">Energy Systems</span>
                                </div>
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">Competition</span>
                                    <span className="block">Sigma Systems, AWB Automation</span>
                                </div>
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">Total opportunity value ($)</span>
                                    <span className="block">$1,200,000</span>
                                </div>
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">Gross profit (%)</span>
                                    <span className="block">8.7%</span>
                                </div>
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">Opportunity probability</span>
                                    <span className="block">A - 80%</span>
                                </div>
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">Description</span>
                                    <span className="block">Please adress the technical and commercial (unpriced) bid to Sara Andrews.  <br />And can you please address the commercial bid to John Smith. </span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">BID ID</span>
                                    <span className="block">Not Assigned</span>
                                </div>
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">Opportunity Title</span>
                                    <span className="block">DRP Refinery Automation</span>
                                </div>
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">Stage</span>
                                    <span className="block">Budgetary</span>
                                </div>
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">Opportunity Type</span>
                                    <span className="block">System</span>
                                </div>
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">Industry code</span>
                                    <span className="block">O&G - Downstream</span>
                                </div>
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">Project Type</span>
                                    <span className="block">Upgrade</span>
                                </div>
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">Delivery Duration</span>
                                    <span className="block">Technical, Commercial, Commercial (Un-priced)</span>
                                </div>
                                <div className="mt-3">
                                    <span className="text-[#778CA2]">Gross profit value</span>
                                    <span className="block">$105,000</span>
                                </div>
                            </div>

                        </div>
                        <div className="flex-[1] flex flex-col">
                            <div className="flex items-center gap-3 mt-[-16px]">
                                <span className="text-[#778CA2]">Last Updated: 26 Jul, 2021</span>
                                <span className="text-[#778CA2]">10:00 AM</span>
                                <span className="text-[#26BADA]"><LuRefreshCcw /></span>
                            </div>
                            <button className="text-white text-center bg-[#26BADA] py-3 mt-[10px] mb-[18px] rounded-md border-0" onClick={handleClickOpenBid}>REQUEST BID </button>
                            <BidDialog openBid={openBid} handleBidClose={handlCloseBid} />
                            <div className="border mt-[18px] mb-3 rounded-md">
                                <div className="bg-[#00000005] py-2 px-[14px] " > Critical Dates (noid)</div>
                                <div className="bg-[#F4FCFD] px-4 py-5 w-full ">
                                    <span className="text-[#778CA2] block">Expected award date</span>
                                    <span>20 June 2021</span>
                                </div>
                                <div className="border-b border-[#E8ECEF] w-[90%] m-auto"></div>
                                <div className="bg-[#F4FCFD] px-4 py-5">
                                    <span className="text-[#778CA2] block">Expected RFx date</span>
                                    <span>4 July 2021</span>
                                </div>
                            </div>
                            <div className="border mb-3 rounded-md">
                                <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Assigned to</div>
                                <div className="bg-[#F4F5F6] px-4 py-5 flex  items-center justify-between">
                                    <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                        <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]"  alt='man'/>
                                        <div className="">
                                            <span className="text-sm leading-4">Michael Gates</span>
                                            <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                        </div>

                                    </div>
                                    {/* <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 ">Sales Person</div> */}

                                </div>
                            </div>
                            <div className="border mb-3 rounded-md">
                                <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >RFx Contacts</div>
                                <div className="bg-[#F4F5F6] px-4 py-1 flex  items-center justify-between">
                                    <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                        <Image src='/man.jpeg' width={38} height={38} alt='man' className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                        <div className="">
                                            <span className="text-sm leading-4">Michael Gates</span>
                                            <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                        </div>

                                    </div>
                                    <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Requester</div>

                                </div>

                                <div className="bg-[#F4F5F6] px-4 py-1 flex  items-center justify-between">
                                    <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full ">
                                        <Image src='/man.jpeg' alt='man' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                        <div className="">
                                            <span className="text-sm leading-4 w-8">John Smith</span>
                                            <span className="text-sm leading-4 text-[#778CA2] block">Buyer</span>
                                        </div>
                                        <div className="bg-red-300 text-xs px-1 ml-2 text-white">E</div>
                                    </div>
                                    <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Buyer</div>

                                </div>
                                <div className="bg-[#F4F5F6] px-4 py-1 flex  items-center justify-between">
                                    <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full ">
                                        <Image src='/girl.jpg' width={38} height={38}  alt='user'  className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                        <div className="">
                                            <span className="text-sm leading-4 w-8">Sarah Andrew</span>
                                            <span className="text-sm leading-4 text-[#778CA2] block">Lead Engineer</span>
                                        </div>
                                        <div className="bg-red-300 text-xs px-1 ml-2 text-white">E</div>
                                    </div>
                                    <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Technical</div>

                                </div>

                            </div>
                            <div className="border mb-3 rounded-md">
                                <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >RFx Acknowledgement</div>
                                <div className="bg-[#F4F5F6] py-6 flex items-center flex-col gap-3">
                                    <p className="text-lg text-[#FFAB2B]">Awaited</p>
                                    <p className="text-[#00AAEC] cursor-pointer" onClick={handleClickOpen}>Upload RFx Acknowldegement</p>
                                    <UploadDialog open={open} handleClose={handleClose} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                {active === 'RFx Clarifications' && <div className='p-5 bg-white shadow-sm h-full min-h-screen'>
                    {!clarificationDetail &&
                        <>
                            <div className="flex justify-between uppercase text-[#00AAEC] text-sm mb-4 cursor-pointer ">

                                <div className="flex items-center gap-1" onClick={addRow}>
                                    <span>New clarification</span>
                                    <IoMdAddCircleOutline />
                                </div>
                            </div>
                            <SearchTable rows={rows} handleRowClick={handleRowClick} noRowsOverlay={NoRowsOverlayClarification} />

                        </>
                    }
                    {clarificationDetail &&
                        <div className="flex gap-6">
                            <div className="flex flex-[3] flex-col">
                                <div className=" flex items-center gap-1 text-[#00AAEC] cursor-pointer" onClick={() => setClarificationDetail(false)}>
                                    <FaChevronLeft />
                                    <span>  Back to List</span>
                                </div>
                                <p className='text-xl p-2'>Commercial Clarification 01</p>
                                <div className="flex flex-col-reverse">
                                    <div className="border mb-3 rounded-md ">
                                        <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between " >
                                            <p>#001</p>
                                            <p>Posted by <span className='text-[#00AAEC]'>Ravi K.</span> on 23 Jun 2021, 12:30</p>
                                        </div>
                                        <div className="bg-[#F4F5F6] p-6 flex flex-col gap-5">
                                            <p>Hi Michael,
                                                Please find enclosed the first set of commercial questions. Can you please get clarifications from the customer.<br />
                                                Thanks,
                                            </p>
                                            <p className='text-[#778CA2] mt-3'>Attached Documents</p>
                                            <div className="bg-[#E8ECEF] shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                                <FaRegFilePdf className='text-red-600' />
                                                <span className=''>102345-CCL-01.xlxs</span>
                                                <span className='text-[#98A9BC]'>123kb</span>
                                                <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                                <div className="flex items-center gap-2">
                                                    <span><Image src="/msg.svg" width={18} height={21}  alt="add" /></span>
                                                    <BsThreeDots className='text-[#98A9BC]' />
                                                </div>

                                            </div>
                                            {!showReply && <button className='bg-[#26BADA] p-3 max-w-[200px] text-white rounded-sm' onClick={setShowReply}>REPLY</button>
                                            }                                    </div>
                                    </div>
                                    <div className="border mb-3 rounded-md ">
                                        <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between " >
                                            <p>#002</p>
                                            <p>Posted by <span className='text-[#00AAEC]'>Ravi K.</span> on 23 Jun 2021, 12:30</p>
                                        </div>
                                        <div className="bg-white p-6 flex flex-col gap-5">
                                            <p>Hi Ravi
                                                Please find attached the updated file with commercial clarifications from the customer.<br />
                                                Regards, Michael
                                            </p>
                                            <p className='text-[#778CA2] mt-3'>Attached Documents</p>
                                            <div className="shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                                <FaRegFilePdf className='text-red-600' />
                                                <span className=''>102345-CCL-01.xlxs</span>
                                                <span className='text-[#98A9BC]'>123kb</span>
                                                <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                                <div className="flex items-center gap-2 text-[#98A9BC]">
                                                    <MdOutlineModeEdit className='cursor-pointer' />
                                                    <RiDeleteBin6Line className='cursor-pointer' />
                                                    <span><Image src="/msg.svg" width={18} height={21} className='cursor-pointer'alt="add" /></span>
                                                    <BsThreeDots className='cursor-pointer' />
                                                </div>

                                            </div>
                                            <div className="shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                                                <FaRegFileImage className='text-[#00AAEC]' />
                                                <span className=''>ScreenShot.png</span>
                                                <span className='text-[#98A9BC]'>123kb</span>
                                                <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                                <div className="flex items-center gap-2 text-[#98A9BC]">
                                                    <MdOutlineModeEdit className='cursor-pointer' />
                                                    <RiDeleteBin6Line className='cursor-pointer' />
                                                    <span><Image src="/msg.svg" width={18} height={21} className='cursor-pointer' alt="add" /></span>
                                                    <BsThreeDots className='cursor-pointer' />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {showReply && <div className="flex flex-col gap-[18px]">
                                    <textarea className='w-full border border-[#E8ECEF] outline-none p-2 rounded-md' placeholder='Description' rows={4} ></textarea>
                                    <DragDrop />
                                    <p className='text-[#778CA2]'>Attached Documents</p>
                                    <div className=" flex gap-3">
                                        <button className='bg-white border border-[#26BADA] text-[#26BADA] uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>Cancel</button>
                                        <button className='bg-[#26BADA] border border-[#26BADA] text-white uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>SUBMIT</button>
                                    </div>
                                </div>}

                            </div>
                            <div className="flex-[2]">
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Status <span className='text-black'>Open</span></div>
                                    <div className="bg-[#c3eff92f] px-4 py-1 flex flex-col  ">
                                        <div className="flex items-center justify-between w-full p-4">
                                            <div>
                                                <span className='text-[#778CA2]'>Referrence #</span> <br />
                                                <span>102345-CCL-01</span>
                                            </div>
                                            <div>
                                                <span className='text-[#778CA2]'>Type</span> <br />
                                                <span>Commercial</span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="flex items-center justify-between w-full p-4">
                                            <div>
                                                <span className='text-[#778CA2]'>Issue Date</span> <br />
                                                <span>23 Jun 2021</span>
                                            </div>
                                            <div>
                                                <span className='text-[#778CA2]'>Due Date</span> <br />
                                                <span>28 Jun 2021</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between" >
                                        <p>Issued to</p>
                                        <p className='uppercase text-[#26BADA]'>Reassign</p>
                                    </div>
                                    <div className="bg-[#F4F5F6] py-3 px-4 flex   items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" alt="add" />
                                            <div className="">
                                                <span className="text-sm leading-4">Michael Gates</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Key Contacts</div>
                                    <div className="bg-[#F4F5F6] py-3 px-4 flex  items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" alt="add" />
                                            <div className="">
                                                <span className="text-sm leading-4">Michael Gates</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                            </div>
                                        </div>
                                        <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Requester</div>

                                    </div>

                                    <div className="bg-[#F4F5F6] py-3 px-4 flex  items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full ">
                                            <Image src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" alt="add" />
                                            <div className="">
                                                <span className="text-sm leading-4 w-8">John Smith</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Buyer</span>
                                            </div>
                                            <div className="bg-red-300 text-xs px-1 ml-2 text-white">E</div>
                                        </div>
                                        <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Buyer</div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    }
                </div>}
                {active === 'Bid Documents' && <div>
                    {!documentDetail && <SearchTable rows={documentRow} handleRowClick={handleDocRowClick} noRowsOverlay={NoRowsOverlayDocuments} />
                    }                {documentDetail &&
                        <div className='flex p-8 '>
                            <div className='flex-[3]'>
                                <div className="border mb-3 rounded-md mt-4 ">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between " >
                                        <p>Technical Proposal</p>
                                        <p>Submitted by <span className='text-[#00AAEC]'>Bryan C.</span> on 20 Jul 2021, 12:30</p>
                                    </div>
                                    <div className="bg-[#F8FAFB] px-6 py-8 flex flex-col gap-5">
                                        <p>Hi Michael, Please find enclosed the Tehcnical proposal.</p>
                                        <p className='text-[#778CA2] mt-3'>Attached Documents</p>
                                        <div className="shadow-sm flex items-center w-full p-2 justify-between mb-2 border-b border-[#babec2]" >
                                            <FaRegFilePdf className='text-red-600' />
                                            <span className=''>102345-CCL-01.xlxs</span>
                                            <span className='text-[#98A9BC]'>123kb</span>
                                            <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                            <div className="flex items-center gap-2 text-[#98A9BC]">
                                                <MdOutlineModeEdit className='cursor-pointer' />
                                                <RiDeleteBin6Line className='cursor-pointer' />
                                                <span><Image src="/msg.svg" width={18} height={21} className='cursor-pointer' alt="add" /></span>
                                                <BsThreeDots className='cursor-pointer' />
                                            </div>

                                        </div>
                                        <div className="shadow-sm flex items-center w-full p-2 justify-between mb-2 border-b border-[#babec2]" >
                                            <FaRegFileImage className='text-[#00AAEC]' />
                                            <span className=''>ScreenShot.png</span>
                                            <span className='text-[#98A9BC]'>123kb</span>
                                            <span className='text-[#98A9BC]'>23 Jun 2020</span>
                                            <div className="flex items-center gap-2 text-[#98A9BC]">
                                                <MdOutlineModeEdit className='cursor-pointer' />
                                                <RiDeleteBin6Line className='cursor-pointer' />
                                                <span><Image src="/msg.svg" width={18} height={21} className='cursor-pointer' alt="add" /></span>
                                                <BsThreeDots className='cursor-pointer' />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <p className='flex items-center gap-3 mb-4'>
                                        <Image src="/msg.svg" width={19} height={25} alt="add" />
                                        <span className='text-[#778CA2] text-lg'>Discussions</span>
                                    </p>
                                    {/* CHAT SECTION */}
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1 my-3">
                                            <Image src="/man.jpeg" width={31} height={31} className='mr-1 rounded-full object-cover w-9' alt="user" />
                                            <p className='bg-[#F2F4F6] px-4 py-2 rounded-full max-w-[80%] pr-[20%]'>Hi Bryan,  Thanks for the timely submission. </p>
                                            <span className='uppercase text-[#98A9BC] text-xs'>08:00 PM</span>
                                        </div>
                                        <div className="flex items-center flex-row-reverse gap-1 my-3">
                                            <Image src="/man2.png" width={31} height={31} className='mr-1 rounded-full object-cover w-9' alt="user" />
                                            <p className='bg-[#98A9BC] text-white px-4 py-2 rounded-full max-w-[80%] pr-[20%]'>You are welcome Michael. Thanks </p>
                                            <span className='uppercase text-[#98A9BC] text-xs'>09:30 PM</span>
                                        </div>
                                        <div className="flex items-center gap-1 my-3">
                                            <Image alt="user" src="/man.jpeg" width={31} height={31} className='mr-1 rounded-full object-cover w-9' />
                                            <p className='bg-[#F2F4F6] px-4 py-2 rounded-full max-w-[80%] pr-[20%]'>Hopefully customer will get back with clarifications soon </p>
                                            <span className='uppercase text-[#98A9BC] text-xs'>09:45 PM</span>
                                        </div>
                                        <div className="flex items-center flex-row-reverse gap-1 my-3">
                                            <Image alt="user" src="/man2.png" width={31} height={31} className='mr-1 rounded-full object-cover w-9' />
                                            <p className='bg-[#98A9BC] text-white px-4 py-2 rounded-full max-w-[80%] pr-[20%]'>You are welcome Michael. Thanks</p>
                                            <span className='uppercase text-[#98A9BC] text-xs'>10:00 PM</span>
                                        </div>
                                        {/* If date changes */}
                                        <p className="text-[#778CA2] flex items-center gap-10 my-8 w-[50%] m-auto after:content-[''] after:bg-slate-400 after:w-full after:h-[0.5px] after:border before:content-[''] before:bg-slate-400 before:w-full before:h-[0.5px] before:border">Today</p>
                                        <div className="flex items-center gap-1 my-3">
                                            <Image alt="user" src="/man.jpeg" width={31} height={31} className='mr-1 rounded-full object-cover w-9' />
                                            <p className='bg-[#F2F4F6] px-4 py-2 rounded-full max-w-[80%] pr-[20%]'>Hi Bryan, The clarifications are now posted. Thanks </p>
                                            <span className='uppercase text-[#98A9BC] text-xs'>10:10 PM</span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <textarea rows={4} className='p-3 w-full rounded-md mb-2 border border-[#E8ECEF] outline-none' placeholder='Your message'></textarea>
                                        <div className="flex justify-between">
                                            <Image alt="user" src="/man.jpeg" width={36} height={36} className='rounded-full object-cover' />
                                            <button className='text-white border border-[#26BADA] bg-[#26BADA] uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>Add</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex-[2] px-5'>
                                <div className="flex flex-col">
                                    <button className="text-white text-center bg-[#26BADA] py-3 uppercase mb-3 rounded-md border-0 ">Submit to customer</button>
                                    <button className="text-white text-center bg-[#26BADA] py-3 uppercase mb-3 rounded-md border-0 ">Request Revision</button>
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Status <span className='text-black'>Issued</span></div>
                                    <div className="bg-[#c3eff92f] px-4 py-1 flex flex-col  ">
                                        <div className="flex items-center justify-between w-full p-4">
                                            <div>
                                                <span className='text-[#778CA2]'>Referrence #</span> <br />
                                                <span>102345-CCL-01</span>
                                            </div>
                                            <div>
                                                <span className='text-[#778CA2]'>Type</span> <br />
                                                <span>Commercial</span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="flex items-center justify-between w-full p-4">
                                            <div>
                                                <span className='text-[#778CA2]'>Issue Date</span> <br />
                                                <span>23 Jun 2021</span>
                                            </div>
                                            <div>
                                                <span className='text-[#778CA2]'>Due Date</span> <br />
                                                <span>28 Jun 2021</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between" >
                                        <p>Assigned to</p>
                                        <p className='uppercase text-[#26BADA]'>Reassign</p>
                                    </div>
                                    <div className="bg-[#F4F5F6] py-3 px-4 flex   items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                            <Image alt="user" src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4">Michael Gates</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Key Contacts</div>
                                    <div className="bg-[#F4F5F6] py-3 px-4 flex  items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full">
                                            <Image alt="user" src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4">Michael Gates</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Account Manager</span>
                                            </div>
                                        </div>
                                        <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Requester</div>

                                    </div>

                                    <div className="bg-[#F4F5F6] py-3 px-4 flex  items-center justify-between">
                                        <div className="flex flex-[3] bg-white border rounded-[30px] p-1 gap-2 items-center max-w-[60%] w-full ">
                                            <Image alt="user" src='/man.jpeg' width={38} height={38} className="rounded-[100%] object-cover w-[38px] h-[38px]" />
                                            <div className="">
                                                <span className="text-sm leading-4 w-8">John Smith</span>
                                                <span className="text-sm leading-4 text-[#778CA2] block">Buyer</span>
                                            </div>
                                            <div className="bg-red-300 text-xs px-1 ml-2 text-white">E</div>
                                        </div>
                                        <div className="bg-[#26BADA] h-max rounded-md text-xs text-white p-1 min-w-[80px] text-center ">Buyer</div>

                                    </div>

                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] " >Proposal Acknowledgement</div>
                                    <div className="bg-[#F4F5F6] py-6 flex items-center flex-col gap-3">
                                        <p className="text-lg text-[#FFAB2B]">Due</p>
                                        <p className="text-[#00AAEC] cursor-pointer" onClick={handleClickOpen}>Upload Customer Bid Acknowldegement</p>
                                        <UploadDialog open={open} handleClose={handleClose} />

                                    </div>
                                </div>
                            </div>

                        </div>}
                </div>}
                {active === 'Bid Clarifications' &&
                    <div>
                        {!bidDetail && <SearchTable rows={Bidrows} NoRowsOverlay={NoRowsOverlayBids} />}
                        <div className="flex">
                            <div className="flex-[3] p-5 flex flex-col gap-8">
                                <div className=" flex items-center gap-1 text-[#00AAEC] cursor-pointer" onClick={() => setClarificationDetail(false)}>
                                    <FaChevronLeft />
                                    <span>  Back to List</span>
                                </div>
                                <TextField
                                    id="outlined-basic"
                                    label="Clarification Title"
                                    variant="outlined"
                                    className="bg-white w-full"
                                />
                                <TextField
                                    select
                                    label="Type"
                                    // defaultValue="90 days"
                                    className="bg-white w-[50%]"
                                >
                                    {typeInput.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <div className="relative w-[50%]">
                                    <AiOutlineQuestionCircle className="absolute right-0.5 top-0.5 z-10 text-[#98A9BC]" />
                                    <TextField
                                        id="outlined-basic"
                                        label="Reference#"
                                        variant="outlined"
                                        className="bg-white w-full"
                                    />
                                </div>
                                <textarea className='w-full border border-[#E8ECEF] outline-none p-2 rounded-md' placeholder='Description' rows={8} ></textarea>
                                <DragDrop />
                                <div className=" flex gap-3">
                                    <button className='bg-white border border-[#26BADA] text-[#26BADA] uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>Cancel</button>
                                    <button className='bg-[#26BADA] border border-[#26BADA] text-white uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>SUBMIT</button>
                                </div>
                            </div>
                            <div className="flex-[2]">
                                <div className="border mt-[18px] mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] " > Critical Dates</div>
                                    <div className="bg-[#F4FCFD] px-4 py-5">
                                        <DynamicDatePicker labels={datePickerLabels} />
                                    </div>
                                </div>
                                <div className="border mb-3 rounded-md">
                                    <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between items-center" >
                                        <span>Assign to</span>
                                        <span className='text-[#00AAEC] text-sm uppercase flex gap-1 items-center' onClick={handleClickOpenContact}>Select contact <IoMdAddCircleOutline /></span>
                                    </div>
                                    <BidDialog openBid={openContactAssign} handleBidClose={handlCloseContact} />

                                    <div className="bg-[#F4F5F6] py-8 flex items-center flex-col gap-3">
                                        <p className="text-lg text-[#FFAB2B]">No Contact Selected</p>

                                    </div>
                                </div>
                            </div>

                        </div>



                    </div>
                }
                {active === 'Order' && <div>
                    <div className="flex justify-end ">
                        <div className="w-[260px] flex items-center justify-between rounded-3xl my-4 bg-white py-[6px] border  px-5">
                            <input type="text" placeholder='Search within results' className='w-full text-black bg-transparent border-0 outline-none placeholder:text-[#778CA2] placeholder:text-sm' />
                            <button><IoIosSearch className="transform scale-x-[-1] text-[#778CA2]" /></button>
                        </div>
                    </div>
                    {/* <SearchTable rows={documentRow} NoRowsOverlay={NoRowsOverlayOrder} /> */}
                    <div className="flex gap-3">
                        <div className="flex-[3] p-5 flex flex-col gap-8">
                            <div className=" flex items-center gap-1 text-[#00AAEC] cursor-pointer" onClick={() => setClarificationDetail(false)}>
                                <FaChevronLeft />
                                <span>  Back to List</span>
                            </div>
                            <TextField
                                id="outlined-basic"
                                label="Purchase Order"
                                variant="outlined"
                                className="bg-white w-full"
                            />
                            <div className="flex gap-4">
                                <TextField
                                    select
                                    label="Currency"
                                    // defaultValue="90 days"
                                    className="bg-white w-[50%]"
                                >
                                    {typeInput.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <div className="relative w-[50%]">
                                    <AiOutlineQuestionCircle className="absolute right-0.5 top-0.5 z-10 text-[#98A9BC]" />
                                    <TextField
                                        id="outlined-basic"
                                        label="Order Value"
                                        variant="outlined"
                                        className="bg-white w-full"
                                    />
                                </div>
                            </div>
                            <textarea className='w-full border border-[#E8ECEF] outline-none p-2 rounded-md' placeholder='Description' rows={8} ></textarea>
                            <DragDrop className="w-full" />
                            <div className=" flex gap-3">
                                <button className='bg-white border border-[#26BADA] text-[#26BADA] uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>Cancel</button>
                                <button className='bg-[#26BADA] border border-[#26BADA] text-white uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '>SUBMIT</button>
                            </div>
                        </div>
                        <div className="flex-[2]">
                            <div className="border mt-[18px] mb-3 rounded-md">
                                <div className="bg-[#00000005] py-2 px-[14px] " > Critical Dates</div>
                                <div className="bg-[#F4FCFD] px-4 py-5">
                                    <DynamicDatePicker labels={datePickerLabels} />
                                </div>
                            </div>
                            <div className="border mb-3 rounded-md">
                                <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between items-center" >
                                    <span>Assign to</span>
                                    <span className='text-[#00AAEC] text-sm uppercase flex gap-1 items-center' >Reassign</span>
                                </div>
                                <div className="bg-[#F8FAFB] flex flex-col gap-3 py-4 px-6 rounded-b-md items-center w-full">
                                    <PopupInput label={"Assign to"} className="w-full" />
                                    <BidDialog openBid={openContactAssign} handleBidClose={handlCloseContact} />
                                </div>
                               
                            </div>
                            <div className="border mb-3 rounded-md">
                                <div className="bg-[#00000005] py-2 px-[14px] text-[#778CA2] flex justify-between items-center" >
                                    <span>Key Contacts</span>
                                </div>
                                <div className="bg-[#F8FAFB] flex flex-col gap-3 py-4 px-6 rounded-b-md items-center w-full">
                                    <PopupInput label={"Order Issuer"} className="w-full" />
                                    <BidDialog openBid={openContactAssign} handleBidClose={handlCloseContact} />
                                </div>
                                <div className="bg-[#F8FAFB] flex flex-col gap-3 py-4 px-6 rounded-b-md items-center w-full">
                                    <PopupInput label={"Order Technical Contact"} className="w-full" />
                                    <BidDialog openBid={openContactAssign} handleBidClose={handlCloseContact} />
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>}
            </div>

        </div>
    )
}

export default Detail