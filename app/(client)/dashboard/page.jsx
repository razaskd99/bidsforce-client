import { IoMdAddCircleOutline } from "react-icons/io";
import { LiaFilterSolid } from "react-icons/lia";
import { FaChevronDown, FaCalendarDays, FaCalendarCheck } from "react-icons/fa6";
import { BsCalendar3 } from "react-icons/bs";
import DonutChart from '@/components/dashboard/FullPieChart';
import PieChart from '@/components/dashboard/PieChart';
import MeterChart from '@/components/dashboard/MeterChart';
import HeatMapChart from '@/components/dashboard/HeatMapChart';
import StackedbarChart from '@/components/dashboard/StackedbarChart';
import MapChart from '@/components/dashboard/MapChart';
import TimelineChart from '@/components/dashboard/TimelineChart';
import FullPieChart from '@/components/dashboard/FullPieChart';
import Calendar from '@/components/dashboard/Calendar';
import Image from 'next/image';
import Highlights from '@/components/dashboard/Highlights';
import Activity from '@/components/dashboard/Activity';

// start for login check
import getConfig from 'next/config'
import { redirect } from 'next/navigation'
import { headers } from "next/headers";
import { getFullDomainName } from '@/app/api/util/loginHandle';
let isLogin = false
// end for login check

const Dashboard = () => {
    const { serverRuntimeConfig } = getConfig() ;
    let data = {}

    if (serverRuntimeConfig) {
        if (Object.entries(serverRuntimeConfig.TEMP_DATA).length > 0) {
            data = { ...serverRuntimeConfig.TEMP_DATA }
        }

        // start check login
        let homeURL = getFullDomainName(headers)
        isLogin = serverRuntimeConfig.IS_LOGIN
        if (!isLogin) { redirect(homeURL + "login") }
        // end check login
    }


    const pieActiveBidData = [91, 9];
    const pieValueBidData = [16, 12, 49, 23];

    const highlightsData = [
        { time: '10:00', color: '#26ABDA', description: 'Jacob-2 Electrification Bid due' },
        { time: '11:30', color: '#FE4D97', description: 'Southern Pipeline Technical Clarifications due' },
        { time: '10:00', color: '#6DD230', description: 'DRP Refinery Bid due' },
        { time: '14:30', color: '#FFAB2B', description: 'GMX Boiler Commercial Clarifications due' },
        { time: '16:00', color: '#4D7CFE', description: 'Ring Gas General Clarifications due' }
    ];

    const activitiesData = [
        { user: 'Bryan C', message: 'requested approval', time: '2h ago', imageUrl: '/man.jpeg' },
        { user: 'Maha K', message: 'requested approval', time: '2h ago', imageUrl: '/maha.jpg' },
        { user: 'Jhon Gates C', message: 'requested approval', time: '2h ago', imageUrl: '/man2.png' },
        { user: 'Marvin D', message: 'requested approval', time: '2h ago', imageUrl: '/marvin.jpg' },
        { user: 'Rose Peter', message: 'requested approval', time: '3h ago', imageUrl: '/rose.jpg' }
    ];

    return (
        <div>
        ooooo {serverRuntimeConfig.IS_LOGIN}
            <div className="flex items-center justify-between">
                <div className="flex gap-1">
                    <div className='border border-[#DDDDDD] text-sm px-3 py-2 bg-white'>My Daily Dash</div>
                    <div className='border border-[#DDDDDD] text-sm px-3 py-2 rounded-sm bg-[#F7F9FA] text-[#778CA2]'>KIPS</div>
                    <div className='border border-[#DDDDDD] text-sm px-3 py-2 rounded-sm bg-[#F7F9FA] text-[#778CA2]'>Bid Management</div>
                    <div className='border border-[#DDDDDD] text-sm px-3 py-2 rounded-sm bg-[#F7F9FA] text-[#778CA2]'>My Team</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#26BADA;] uppercase">
                    Edit Dashboard
                    {/* <IoMdAddCircleOutline /> */}
                </div>
            </div>
            <div className="flex gap-8 items-center justify-start text-[#98A9BC] bg-white mt-5 p-3 text-xs uppercase">
                {/* <div className="flex items-center gap-2"><LiaFilterSolid /> Filter</div>
                <div className="flex items-center gap-2">Assign to <FaChevronDown /></div>
                <div className="flex items-center gap-2">Date Range <BsCalendar3 /></div>
                <div className="flex items-center gap-2">Location <FaChevronDown /></div>
                <div className="flex items-center gap-2">Company <FaChevronDown /></div> */}
            </div>
            <span className='border text-sm px-3 py-2 bg-white text-[#98A9BC] mt-1'>No Filter Applied</span>
            <div className="flex gap-4">
                <div className="flex-[3]">
                    {/* CARDS TO SHOW NUMBERS */}
                    <div className="flex items-center justify-between mt-5 gap-6">
                        <div className="flex flex-col bg-white rounded-md w-[25%] items-center">
                            <span className='text-[#26BADA] text-5xl p-4'>25</span>
                            <span className='text-[#98A9BC] text-[18px] p-3'>Inbox messages</span>
                            <span className='text-[#26BADA] cursor-pointer border-t border-t-[#E8ECEF] w-full text-center p-2 text-xs'>View Inbox</span>
                        </div>
                        <div className="flex flex-col bg-white rounded-md w-[25%] items-center">
                            <span className='text-[#26BADA] text-5xl p-4'>12</span>
                            <span className='text-[#98A9BC] text-[18px] p-3'>Tasks</span>
                            <span className='text-[#26BADA] cursor-pointer border-t border-t-[#E8ECEF] w-full text-center p-2 text-xs'>View Inbox</span>
                        </div>
                        <div className="flex flex-col bg-white rounded-md w-[25%] items-center">
                            <span className='text-[#26BADA] text-5xl p-4'>3</span>
                            <span className='text-[#98A9BC] text-[18px] p-3'>Active Bids</span>
                            <span className='text-[#26BADA] cursor-pointer border-t border-t-[#E8ECEF] w-full text-center p-2 text-xs'>View Inbox</span>
                        </div>
                        <div className="flex flex-col bg-white rounded-md w-[25%] items-center">
                            <span className='text-[#26BADA] text-5xl p-4'>2</span>
                            <span className='text-[#98A9BC] text-[18px] p-3'>Overdue actions</span>
                            <span className='text-[#26BADA] cursor-pointer border-t border-t-[#E8ECEF] w-full text-center p-2 text-xs'>View Inbox</span>
                        </div>
                    </div>
                    {/* CHARTS */}
                    <div className="flex items-center justify-between mt-5 gap-6">
                        <div className="bg-white rounded-md w-[33%] p-3 text-xs text-[#778CA2]">
                            <PieChart series={pieActiveBidData} title="Active Bids Status" />
                        </div>
                        <div className="bg-white rounded-md w-[33%] p-3 text-xs text-[#778CA2]">
                            <div>Active Bid Status</div>
                            <MeterChart />
                        </div>
                        <div className="bg-white rounded-md w-[33%] p-3 text-xs text-[#778CA2]">
                            <PieChart series={pieValueBidData} title='Value of Bids by Type' />
                        </div>
                    </div>
                    {/* UPCOMMING DETAILS CHART */}
                    <div className="flex items-center justify-center mt-5">
                        <div className="bg-white rounded-md w-full p-3 text-xs text-[#778CA2]">
                            <HeatMapChart />
                        </div>
                    </div>
                    {/* Active Bid by Team and Country */}
                    <div className="flex items-center mt-5 gap-6">
                        <div className="flex-[1] bg-white rounded-md">
                            <StackedbarChart />
                        </div>
                        <div className="flex-[1] bg-white rounded-md">
                            <MapChart />/
                        </div>
                    </div>
                    {/* Timeline */}
                    <div className="bg-white rounded-md w-full p-3 text-xs text-[#778CA2] mt-5">
                        <TimelineChart />
                    </div>
                    {/* Clarification Due */}
                    <div className="flex items-center gap-4 mt-5">
                        <div className="flex-[2] bg-white rounded-md p-2 text-[#778CA2]">
                            <div className="flex justify-between items-center mb-2">
                                <span className='text-xs font-bold'>Clarifications Due</span>
                                <span className='text-#00AAEC text-xs'>View All</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-center bg-[#EFF3F5] px-2 rounded-md text-xs">
                                    <div className="h-auto p-3">
                                        <span className='mr-1 text-white bg-[#26BADA] rounded-full py-2 px-3'>T</span>
                                        <span>Technical Clarification 01</span>
                                    </div>
                                    <span>DRP refinery Automation</span>
                                    <span>RFx</span>
                                    <span>1 Day</span>
                                </div>
                                <div className="flex justify-between items-center bg-[#EFF3F5] px-2 rounded-md text-xs">
                                    <div className="h-auto p-3">
                                        <span className='mr-1 text-white bg-[#26BADA] rounded-full py-2 px-3'>C</span>
                                        <span>Product Data Sheets</span>
                                    </div>
                                    <span>Southern Pipeline</span>
                                    <span>Bid</span>
                                    <span>1 Day</span>
                                </div>
                                <div className="flex justify-between items-center bg-[#EFF3F5] px-2 rounded-md text-xs">
                                    <div className="h-auto p-3">
                                        <span className='mr-1 text-white bg-[#26BADA] rounded-full py-2 px-3'>T</span>
                                        <span>Technical 02</span>
                                    </div>
                                    <span>Sixth Terminal DRX</span>
                                    <span>Bid</span>
                                    <span>2 Day</span>
                                </div>
                                <div className="flex justify-between items-center bg-[#EFF3F5] px-2 rounded-md text-xs">
                                    <div className="h-auto p-3">
                                        <span className='mr-1 text-white bg-[#26BADA] rounded-full py-2 px-3'>G</span>
                                        <span>RFx Attachments </span>
                                    </div>
                                    <span>DRP Refinery Automation</span>
                                    <span>RFx</span>
                                    <span>1 Day</span>
                                </div>
                                <div className="flex justify-between items-center bg-[#EFF3F5] px-2 rounded-md text-xs">
                                    <div className="h-auto p-3">
                                        <span className='mr-1 text-white bg-[#26BADA] rounded-full py-2 px-3'>T</span>
                                        <span>Terms and Conditions</span>
                                    </div>
                                    <span>DRP refinery Automation</span>
                                    <span>Bid</span>
                                    <span>1 Day</span>
                                </div>
                                <div className="flex justify-between items-center bg-[#EFF3F5] px-2 rounded-md text-xs">
                                    <div className="h-auto p-3">
                                        <span className='mr-1 text-white bg-[#26BADA] rounded-full py-2 px-3'>G</span>
                                        <span>addendum 1</span>
                                    </div>
                                    <span>Southern Pipeline</span>
                                    <span>Bid</span>
                                    <span>8 Day</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-[1]">
                            {/* Pie Chart */}
                            <div className="bg-white rounded-md">
                                {/* <FullPieChart /> */}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex-[1]">
                    {/* Side cards */}
                    {/* <Highlights highlights={highlightsData} /> */}
                    {/* Calendar */}
                    <span className='text-lg my-2 block'>Calendar</span>
                    <div className="bg-white p-4">
                        {/* <Calendar /> */}
                        <hr />
                        <div className="flex flex-col mt-3 gap-1">
                            <span className='flex gap-2 items-center text-[#98A9BC]'>
                                <FaCalendarCheck />06:37PM - 09:15PM</span>
                            <p>DRX Refinery Clarifications Due</p>
                        </div>
                        <div className="flex flex-col mt-3 gap-1 ">
                            <span className='flex gap-2 items-center text-[#98A9BC]'>
                                <FaCalendarCheck />06:37PM - 09:15PM</span>
                            <p>DRX Refinery Clarifications Due</p>
                            <p className='text-sm'>Marketers/advertisers usually focus their efforts </p>
                        </div>
                    </div>
                    {/* Activity */}
                    {/* <Activity activities={activitiesData} /> */}

                </div>
            </div >
        </div>
    )
}




export default Dashboard
