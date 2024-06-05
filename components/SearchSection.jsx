"use client"
import { Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";

const SearchSection = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [showRemove, setShowremove] = useState('');
    const [mode, setMode] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const searchTermParam = params.get('searchterm');
        if (searchTermParam) {
            setSearchTerm(searchTermParam);
            setShowremove(searchTermParam)
        }
        const modeParam = params.get('mode');
        if (modeParam) {
            setMode(modeParam);
        }
    }, []);



    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            const baseUrl = window.location.href.split('?')[0];
            const modeString = mode ? 'mode=' + mode + '&' : '';            
            const newUrl = `${baseUrl}?${modeString}searchterm=${encodeURIComponent(searchTerm)}`;
            window.location.href = newUrl;
        }
    };

    const handleSearchOnKeyPress = (event) => {
        // if key pressed is 'Enter' (key code 13)
        if (event.keyCode === 13) {
            handleSearch();
        }
      }

    const removeSearchTerm = () => {
        // const baseUrl = window.location.href.split('?')[0];
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete('searchterm');
        const baseUrl = currentUrl.toString();
        window.location.href = baseUrl;
    };

    return (
        <>

{showRemove && showRemove !=""? 
            <div className="w-auto flex text-md items-center justify-between rounded-full bg-[#26BADA] py-[4px] px-5 my-4 ml-auto text-white">
                <button onClick={removeSearchTerm} className='flex items-center gap-2'>
                    Remove search <IoIosCloseCircleOutline className='text-xl font-bold' />
                </button>
            </div>:""
}
            <div className="w-[260px] flex items-center justify-between rounded-2xl bg-white py-[6px] px-5 my-4 ml-auto" style={{ marginTop: showRemove && showRemove !== "" ? "10px" : "0", marginLeft: showRemove && showRemove !== "" ? "0" : "auto" }}>
                <input
                    type="text"
                    placeholder="Search within results"
                    defaultValue={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearchOnKeyPress}
                    className="w-full text-black bg-transparent border-0 outline-none placeholder:text-[#778CA2] placeholder:text-sm"
                />
                <button onClick={handleSearch} >
                    <Search className="transform scale-x-[-1] text-[#778CA2] w-[18px]" />
                </button>
            </div>

        </>
    )
}

export default SearchSection
