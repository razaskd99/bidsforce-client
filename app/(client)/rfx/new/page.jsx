'use client'
import { getAccessToken } from "@/app/api/auth/scripts";
import Breadcrumbs from "@/components/Breadcrumbs";
import SearchTable from "@/components/SearchTable";
import Link from 'next/link'
import { useState } from "react";
import getConfig from 'next/config'
import { useRouter } from 'next/navigation'

const NewRfx = () => {
    const router = useRouter()

    const { serverRuntimeConfig } = getConfig() || {};

    let accessToken = ''
    let apiBackendURL = ''
    let tenantID = 0
    // get server side global store data
    if (serverRuntimeConfig) {
        // get api backend url
        apiBackendURL = serverRuntimeConfig.API_BACKEND_SERVER
        // get access token
        accessToken = serverRuntimeConfig.API_ACCESS_TOKEN_SERVER
        tenantID = serverRuntimeConfig.TENANT_ID
    }
    const breadcrumbItems = [{ label: 'Dashboard', href: '/' }, { label: 'RFx New', href: '/newfx' }];
    const rows = [
        {
            id: 1, checkbox: 'dddd.png', description: 'Urea Plant Expansion', rfxid: 'RFX-101132', customer: 'Farmer Fertilizers', type: 'Firm', duedate: '8 Jul 2021', contacts: 'Sara Andrew', status: 'RFx Issued',
            biId: 'BID-187678', new: 'New', issue: '19 June, 2022', sales: 'Tysen',
        }]
    const [searchResults, setSearchResults] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');

    function isNotNullOrUndefinedAndInteger(value) {
        return value !== null && value !== undefined && Number.isInteger(value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        let opportunityID = ''
        opportunityID = document.getElementById('opportunity-id').value
        try{
            opportunityID=parseInt(opportunityID, 10);
        }catch(err){}
       // setSearchResults(true);
       // setSearchTerm('');
        console.log(searchTerm);
        if (!isNotNullOrUndefinedAndInteger(opportunityID)) {
            alert('Please enter a valid Opportunity ID')
            return
        }
        else {
            router.push(`/opportunities/search-by-id/${opportunityID}`);
        }
    };
    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="w-[520px]">
                <form className="flex gap-5">
                    {/* New RFx input section */}
                    <div className="w-full flex items-center justify-between bg-white py-[6px] px-5">
                        <input
                            type="text"
                            placeholder="ENTER CRM OPPORTUNITY ID"
                            className="w-full text-black bg-transparent border-0 outline-none placeholder:text-[#778CA2] placeholder:text-xs"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            id="opportunity-id"

                        />
                    </div>
                    <button className="bg-[#26BADA] text-white text-sm px-12 py-4" onClick={handleSearch}>SEARCH</button>
                </form>
                <div className=" flex items-center justify-between w-full my-2">
                    <Link href="/opportunities" className="text-[#26BADA] text-xs cursor-pointer ">
                        Browse Opportunities List
                    </Link>
                    {!searchResults && <Link href="/rfx/newfx" className="text-[#26BADA] text-xs cursor-pointer uppercase ">Create RFQ Manually</Link>}
                </div>
            </div>
            {searchResults && <SearchTable rows={rows} />}

        </>

    )
}

export default NewRfx