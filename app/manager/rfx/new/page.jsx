'use client'
import Breadcrumbs from "@/components/Breadcrumbs";
import SearchTable from "@/components/SearchTable";
import Link from 'next/link'
import { useState } from "react";

const NewRfx = () => {
    const breadcrumbItems = [{ label: 'Dashboard', href: '/' }, { label: 'RFx New', href: '/newfx' }];
    const rows  = [
        {id: 1,checkbox: 'dddd.png',description: 'Urea Plant Expansion',rfxid: 'RFX-101132',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '8 Jul 2021',contacts: 'Sara Andrew',status: 'RFx Issued',
          biId:'BID-187678',new: 'New', issue:'19 June, 2022', sales: 'Tysen',}]
    const [searchResults, setSearchResults] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchResults(true);
        setSearchTerm('');
        console.log(searchTerm);
    };
    return (
        <>
            <Breadcrumbs items={breadcrumbItems}/>
            <div className="w-[520px]">
                <form className="flex gap-5">
                    {/* New RFx input section */}
                    <div className="w-full flex items-center justify-between bg-white py-[6px] px-5">
                        <input
                            type="text"
                            placeholder="ENTER CRM OPPORTUNITY ID"
                            className="w-full text-black bg-transparent border-0 outline-none placeholder:text-[#778CA2] placeholder:text-xs"
                            onChange={(e) => setSearchTerm(e.target.value)}

                        />
                    </div>
                    <button className="bg-[#26BADA] text-white text-sm px-12 py-4" onClick={handleSearch}>SEARCH</button>
                </form>
                <div className=" flex items-center justify-between w-full my-2">
                <Link href="/manager/opportunities" className="text-[#26BADA] text-xs cursor-pointer ">
                        Browse Opportunities List
                    </Link>
                    {!searchResults && <Link href="/manager/rfx/newfx" className="text-[#26BADA] text-xs cursor-pointer uppercase ">Create RFQ Manually</Link>}
                </div>
            </div>
            {searchResults && <SearchTable rows={rows}   />}

        </>

    )
}

export default NewRfx