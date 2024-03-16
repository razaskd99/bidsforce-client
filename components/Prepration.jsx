import React from 'react'
import { IoIosSearch } from 'react-icons/io'
import { LuFilter } from 'react-icons/lu'
import FilterDropdown from './FilterDropdown'
import { RxCross1 } from "react-icons/rx";
import TaskCard from './TaskCard';
import { IoMdAddCircleOutline } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";


const Prepration = ({handleChangeStatus}) => {
    const ProjectFilterOptions = ["Project A", "Project B", "Project C"]
    const StatusFilterOptions = ["Project A", "Project B", "Project C"]
    const AssignFilterOptions = ["Project A", "Project B", "Project C"]
    const tasks = [
        { id: 1, title: 'Organization Chart  ', company: 'DRP Refinery Automation ', assignedTo: 'John Doe', tasksCompleted: 3, totalTasks: 5, stage: 'To Do' },
        { id: 2, title: 'Technical Support from Factory', company: 'DRP Refinery Automation ', assignedTo: 'Jane Smith', tasksCompleted: 2, totalTasks: 5, stage: 'Progress' },
        { id: 3, title: 'Power & Heat Load Calculation  ', company: 'DRP Refinery Automation ', assignedTo: 'Alex Johnson', tasksCompleted: 5, totalTasks: 5, stage: 'Review' },
        { id: 4, title: 'Project Executon Plan  ', company: 'DRP Refinery Automation ', assignedTo: 'Michael Brown', tasksCompleted: 5, totalTasks: 5, stage: 'Completed' }
    ];
    const groupedTasks = {
        todo: tasks.filter(task => task.stage === 'To Do'),
        progress: tasks.filter(task => task.stage === 'Progress'),
        review: tasks.filter(task => task.stage === 'Review'),
        completed: tasks.filter(task => task.stage === 'Completed'),
    };

    return (
        <div className='p-5 bg-white shadow-sm h-full min-h-screen'>
            <div className="flex justify-between items-center">
                <h1 className='text-xl'>My Desk</h1>
                <button className='bg-[#26BADA]  border border-[#26BADA] text-white uppercase text-sm px-8 py-3 min-w-[200px] rounded-sm '
                 onClick={handleChangeStatus}
                >SKIP FOR NOW</button>
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
            <div className="flex items-center my-1 gap-1 text-sm">
                <span className='text-[#778CA2] ml-1'>Filtered Result</span>
                <span className='text-[#778CA2] border border-[#F8FAFB] bg-[#F8FAFB] px-2 py-1 rounded-sm flex items-center gap-1'>Activity <RxCross1 className='text-sm cursor-pointer' /> </span>
            </div>
            <div className="kanban-board flex gap-2">
                <div className="column p-1 w-[25%] bg-[#EFF3F5]">
                    <span className='bg-[#26BADA] w-full  px-2 py-3 rounded-t-lg text-[#fff] flex justify-between'>
                        <p>To Do  {groupedTasks.todo.length}</p>
                        <div className="flex gap-2">
                            <IoMdAddCircleOutline />
                            <BsThreeDots />
                        </div>
                    </span>
                    {groupedTasks.todo.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
                <div className="column p-1 w-[25%] bg-[#EFF3F5]">
                    <span className='bg-[#26BADA] w-full  px-2 py-3 rounded-t-lg text-[#fff] flex justify-between'>
                        <p>In Progress  {groupedTasks.progress.length}</p>
                        <div className="flex gap-2">
                            <IoMdAddCircleOutline />
                            <BsThreeDots />
                        </div>
                    </span>
                    {groupedTasks.progress.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
                <div className="column p-1 w-[25%] bg-[#EFF3F5]">
                    <span className='bg-[#26BADA] w-full  px-2 py-3 rounded-t-lg text-[#fff] flex justify-between'>
                        <p>Review  {groupedTasks.review.length}</p>
                        <div className="flex gap-2">
                            <IoMdAddCircleOutline />
                            <BsThreeDots />
                        </div>
                    </span>
                    {groupedTasks.review.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
                <div className="column p-1 w-[25%] bg-[#EFF3F5]">
                    <span className='bg-[#26BADA] w-full  px-2 py-3 rounded-t-lg text-[#fff] flex justify-between'>
                        <p>Completed  {groupedTasks.completed.length}</p>
                        <div className="flex gap-2">
                            <IoMdAddCircleOutline />
                            <BsThreeDots />
                        </div>
                    </span>
                    {groupedTasks.completed.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Prepration