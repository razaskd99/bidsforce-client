"use client";

import React from 'react'
import Image from "next/image"
import { FaListOl } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import DataTable from "@/components/Table";
import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Navbar from "@/components/Navbar"
import Sidenav from "@/components/Sidenav"
import Footer from "@/components/Footer";
import SearchTable from "@/components/SearchTable";

const RfxList = (props) => {
    
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
    <div className="flex flex-col w-full h-auto">
             
             <div className="bg-[#F2F4F6] px-6 h-full relative w-full">
                 <Breadcrumbs items={breadcrumbItems} />
                 <div className=" flex items-center justify-between mt-12 mb-4">
                     <Link href="/rfx/new" className="text-xs text-[#26BADA] flex items-center gap-2 cursor-pointer" >
                         New RFx
                         <Image src="add-blue.svg" width={18} height={21} alt="add" />
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
                 <DataTable viewMode={viewMode} data={props.rfxRec} />
             </div>
         </div>
  )
}

export default RfxList
