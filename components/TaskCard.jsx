import Image from 'next/image';
import React from 'react';
import { VscChecklist } from "react-icons/vsc";
import { TbMessages } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";


const TaskCard = ({ task }) => {
  return (
    <div className="task-card bg-white rounded-md my-4 shadow-sm p-2 pb-0 relative overflow-hidden">
      <span className='text-[10px] px-2 py-1 bg-[#00a9ec60] text-[#00AAEC] absolute right-0 top-0  '>{task.template}</span>
      <h3 className='text-[13px] mt-4 '>{task.title}</h3>
      <p className='text-[13px] mt-1 text-[#98A9BC]'>{task.company}</p>
      <div className="flex items-center justify-between text-[#98A9BC]  text-[11px] mt-3 m  mb-6  ">
        <div className="flex items-center gap-1">
          <Image src={task.image} alt={task.assignedTo} width={20} height={20} className='rounded-full mr-2' />
          <VscChecklist />
          <p>{task.tasksCompleted}/{task.totalTasks}</p>
          <TbMessages />
          <p>{task.tasksCompleted}</p>
        </div>
        <div className="flex items-center gap-2">
          <FaRegCalendarAlt />
          <p>{task.dueDate}</p>
        </div>


      </div>
      <div className=" h-[6px] w-full bg-neutral-200 dark:bg-neutral-600  absolute bottom-0 right-0 left-0">
        <div className="h-[6px] bg-pink-600" style={{ width: `${(task.tasksCompleted / task.totalTasks) * 100}%` }}></div>
      </div>
      <div className="progress-bar" ></div>
    </div>
  );
};

export default TaskCard;
