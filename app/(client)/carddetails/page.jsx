'use client'

import BidDialog from '@/components/BidRequestDailogue';
import PopupInput from '@/components/PopupInput';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'
import { FiArrowLeft, FiMoreHorizontal } from "react-icons/fi";
import { BsFlag, BsChevronRight, BsThreeDots } from 'react-icons/bs';
import { FaRegFilePdf } from 'react-icons/fa6';


function CardDetail({ cardId, closeCardDetail }) {
   // const pathname = usePathname()
   // const searchParams = useSearchParams()
   // const id = searchParams.get('id');
    return (
        <div className="bg-white">
            <div className="flex justify-between items-center p-4">
                <button onClick={closeCardDetail}>Close</button>

                <div className="flex items-center">
                    <FiArrowLeft className="text-[#26BADA] mr-2" />
                    <p className="text-[#26BADA]">Back to Desk</p>
                </div>
                <div className="flex items-center">
                    <button className="border border-[#26BADA] text-[#26BADA] px-4 py-2 mr-2">TIME LOG</button>
                    <button className="bg-[#26BADA] text-white px-4 py-2 mr-2">Mark as Complete</button>
                    <FiMoreHorizontal className="text-[#26BADA] text-xl" />
                </div>
            </div>
            <div className="flex p-4">
                <div className="w-2/3 pr-4">
                    <h2 className="text-lg">Title</h2>
                    <p className='text-[#778CA2] text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    {/* Review Sections */}
                    <div className="w-full bg-[#f2f2f2] flex items-center justify-between p-4 mt-4">
                        <div className="flex items-center">
                            <BsFlag className="text-gray-500 mr-2" />
                            <span className="text-gray-700 font-semibold">Review of section B</span>
                        </div>
                        <div className="flex items-center">
                            <img src="/ravi.png" alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                            <BsChevronRight className="text-gray-500 cursor-pointer" />
                        </div>
                    </div>
                    <div className="w-full bg-[#f2f2f2] flex items-center justify-between p-4 mt-4">
                        <div className="flex items-center">
                            <BsFlag className="text-gray-500 mr-2" />
                            <span className="text-gray-700 font-semibold">Review of section D</span>
                        </div>
                        <div className="flex items-center">
                            <img src="/man.jpeg" alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                            <BsChevronRight className="text-gray-500 cursor-pointer" />
                        </div>
                    </div>
                    {/* Add sub-task */}
                    <button className=" mt-4 border border-[#26BADA] text-[#26BADA] px-4 py-2 mr-2">ADD SUB TASK</button>
                    {/* Attached Docs */}
                    <p className='text-[#778CA2] my-5'>Attached Documents</p>
                    <div className="bg-[#ffffff] shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                        <div className='flex items-center '>
                            <FaRegFilePdf className='text-red-600 mr-3' />
                            <span className=''>102345-CCL-01.xlxs</span>
                        </div>
                        <span className='text-[#98A9BC]'>123kb</span>
                        <span className='text-[#98A9BC]'>23 Jun 2020</span>
                        <div className="flex items-center gap-2">
                            <span><Image src="/msg.svg" width={18} height={21} alt="add" /></span>
                            <BsThreeDots className='text-[#98A9BC]' />
                        </div>

                    </div>
                    <div className="bg-[#ffffff] shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                        <div className='flex items-center '>
                            <FaRegFilePdf className='text-red-600 mr-3' />
                            <span className=''>102345-CCL-01.xlxs</span>
                        </div>
                        <span className='text-[#98A9BC]'>123kb</span>
                        <span className='text-[#98A9BC]'>23 Jun 2020</span>
                        <div className="flex items-center gap-2">
                            <span><Image src="/msg.svg" width={18} height={21} alt="add" /></span>
                            <BsThreeDots className='text-[#98A9BC]' />
                        </div>

                    </div>
                    <div className="bg-[#ffffff] shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]" >
                        <div className='flex items-center '>
                            <FaRegFilePdf className='text-red-600 mr-3' />
                            <span className=''>102345-CCL-01.xlxs</span>
                        </div>
                        <span className='text-[#98A9BC]'>123kb</span>
                        <span className='text-[#98A9BC]'>23 Jun 2020</span>
                        <div className="flex items-center gap-2">
                            <span><Image src="/msg.svg" width={18} height={21} alt="add" /></span>
                            <BsThreeDots className='text-[#98A9BC]' />
                        </div>

                    </div>
                    {/* Discussions */}
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

                <div className="w-1/3">
                    {/* Critical Dates */}
                    <div className="border mt-[18px] mb-3 rounded-md">
                        <div className="bg-[#00000005] py-2 px-[14px] ">
                            {" "}
                            Critical Dates
                        </div>
                        <div className="bg-[#F4FCFD] px-4 py-5 flex item-center justify-between ">
                            <div className="">
                                <span className="text-[#778CA2] block">Issue Date</span>
                                <span>20 June 2021</span>
                            </div>
                            <div className="">
                                <span className="text-[#778CA2] block">Due Date</span>
                                <span>20 June 2021</span>
                            </div>

                        </div>
                    </div>
                    {/* Key Contacts */}
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
        </div >
    );
};
export default CardDetail;