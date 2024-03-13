import React from 'react'
import { IoIosSearch } from 'react-icons/io'
import { LuFilter } from 'react-icons/lu'
import FilterDropdown from './FilterDropdown'

const Prepration = () => {
    return (
        <div className='p-5 bg-white shadow-sm h-full min-h-screen'>
            <div className="flex justify-between items-center">
                <h1 className='text-xl'>My Desk</h1>
                <button className='bg-[#26BADA] border border-[#26BADA] text-white uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm ' 
                // onClick={handleChangeStatus}
                >SUBMIT</button>
            </div>
            <div className="flex justify-end items-center">
                <div className="w-[260px] flex items-center justify-between rounded-2xl bg-white px-2 py-1 border border-gray-100 mt-5">
                    <input type="text" placeholder='Search within results' className='w-full text-gray-500 bg-transparent border-0 outline-none placeholder:text-[#778CA2] placeholder:text-sm' />
                    <button><IoIosSearch className="transform scale-x-[-1] text-[#778CA2]" /></button>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <span><LuFilter className='text-[#778CA2] text-lg ' /></span>
                <div className="flex text-[#778CA2] items-center text-xs whitespace-nowrap">PROJECT <FilterDropdown options={ProjectFilterOptions} /></div>
                <div className="flex text-[#778CA2] items-center text-xs whitespace-nowrap">ISSUE DATE <FilterDropdown options={ProjectFilterOptions} /></div>
                <div className="flex text-[#778CA2] items-center text-xs whitespace-nowrap">DUE DATE <FilterDropdown options={ProjectFilterOptions} /></div>
                <div className="flex text-[#778CA2] items-center text-xs whitespace-nowrap">STATUS DATE <FilterDropdown options={StatusFilterOptions} /></div>
                <div className="flex text-[#778CA2] items-center text-xs whitespace-nowrap">ASSIGNED TO<FilterDropdown options={AssignFilterOptions} /></div>
                <div className="flex text-[#778CA2] items-center text-xs whitespace-nowrap">TYPE<FilterDropdown options={ProjectFilterOptions} /></div>
                <div className="flex text-[#778CA2] items-center text-xs whitespace-nowrap">PROGRESS<FilterDropdown options={ProjectFilterOptions} /></div>
                <div className="flex text-[#778CA2] items-center text-xs whitespace-nowrap">LABELS<FilterDropdown options={ProjectFilterOptions} /></div>

            </div>

        </div>
    )
}

export default Prepration