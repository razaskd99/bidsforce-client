
'use client'
import Navbar from "@/components/Navbar"
import Sidenav from "@/components/Sidenav"
import Image from "next/image"
import { FaListOl } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import DataTable from "@/components/Table";
import Footer from "@/components/Footer";
import { useState } from "react";
import SearchTable from "@/components/SearchTable";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";


const Rfx = () => {
    const [showNewRfxInput, setShowNewRfxInput] = useState(false);
    const breadcrumbItems = [{ label: 'Dashboard', href: '/' }, { label: 'RFx List', href: '/rfx' }];
    const [viewMode, setViewMode] = useState('list');
    const handleNewRfxClick = () => {
        setShowNewRfxInput(true);
    }
    const handleViewModeChange = (mode) => {
        setViewMode(mode);
      };
    return (
        <div className="flex flex-col w-full">
             
            <div className="bg-[#F2F4F6] px-6 h-full relative w-full">
                <Breadcrumbs items={breadcrumbItems} />
                <div className=" flex items-center justify-between mt-12 mb-4">
                    <Link href="/manager/rfx/new" className="text-xs text-[#26BADA] flex items-center gap-2 cursor-pointer" >
                        New RFx
                        <Image src="/add-blue.svg" width={18} height={21} alt="add" />
                    </Link>
                    <div className="flex gap-5">
                        <div className="flex items-center gap-2 text-xs font-medium cursor-pointer text-[#778CA2] select-none"
                            onClick={() => handleViewModeChange('list')}
                        >
                            <FaListOl className={`text-lg ${viewMode === 'list' ? 'text-[#26BADA]' : 'text-[#999a9b]' }`} />
                            <span className={`${viewMode === 'list' ? 'text-black' : 'text-[#999a9b]' }`}>LIST</span>

                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium cursor-pointer text-[#778CA2] select-none"
                            onClick={() => handleViewModeChange('grid')}
                        >
                            <BsFillGrid3X3GapFill className={`text-lg ${viewMode === 'grid' ? 'text-[#26BADA]' : 'text-[#999a9b]' }`} />
                            <span className={`${viewMode === 'grid' ? 'text-black' : 'text-[#999a9b]' }`}>GRID</span>
                        </div>
                        <div className="w-[260px] flex items-center justify-between rounded-2xl bg-white py-[6px] px-5">
                            <input type="text" placeholder='Search within results' className='w-full text-black bg-transparent border-0 outline-none placeholder:text-[#778CA2] placeholder:text-sm' />
                            <button><IoIosSearch className="transform scale-x-[-1] text-[#778CA2]" /></button>
                        </div>
                    </div>
                </div>
                <DataTable viewMode={viewMode} />
            </div>
        </div>
    )
}

export default Rfx

// const rows = [
//     {id: 1,checkbox: 'dddd.png',description: 'Urea Plant Expansion',rfxid: 'RFX-101132',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '8 Jul 2021',contacts: 'Sara Andrew',status: 'RFx Issued',
//       biId:'BID-187678',new: 'New', issue:'19 June, 2022', sales: 'Tysen',},
//     {id: 2,checkbox: 'Galaxy Petroleum.png',description: 'Sixth Terminal DRX',rfxid: 'RFX-101732',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '4 Jul 2022',contacts: 'Nathan Phillip',status: 'RFx Acknowledg.',
//     },
//     {id: 3,checkbox: 'dddd.png',description: 'Cross Country Pipeline',rfxid: 'RFX-101132',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '8 Jul 2021',contacts: 'Sara Andrew',status: 'RFx Issued',
//     },
//     {id: 4,checkbox: 'Galaxy Petroleum.png',description: 'Ring 3 Gas Plant',rfxid: 'RFX-101732',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '4 Jul 2022',contacts: 'Nathan Phillip',status: 'RFx Acknowledg.',
//     },
//     {id: 5,checkbox: 'dddd.png',description: 'Phase-II Electrification',rfxid: 'RFX-101132',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '8 Jul 2021',contacts: 'Sara Andrew',status: 'RFx Issued',
//     },
//     {id: 6,checkbox: 'Galaxy Petroleum.png',description: 'Gemon Energy storage',rfxid: 'RFX-101732',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '4 Jul 2022',contacts: 'Nathan Phillip',status: 'RFx Acknowledg.',
//     },
//     {id: 7,checkbox: 'Galaxy Petroleum.png',description: 'DRP Refinery Automation',rfxid: 'RFX-101732',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '4 Jul 2022',contacts: 'Nathan Phillip',status: 'RFx Acknowledg.',
//     },
//     {id: 8,checkbox: 'Galaxy Petroleum.png',description: 'Digitalization - Phase-I ',rfxid: 'RFX-101732',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '4 Jul 2022',contacts: 'Nathan Phillip',status: 'RFx Acknowledg.',
//     },
//   ];
