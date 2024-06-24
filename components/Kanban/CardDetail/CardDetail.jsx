'use client'

import BidDialog from '@/components/BidRequestDailogue';
import PopupInput from '@/components/PopupInput';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { FiArrowLeft, FiMoreHorizontal } from "react-icons/fi";
import { BsFlag, BsChevronRight } from 'react-icons/bs';
import { FaRegFilePdf } from 'react-icons/fa6';
import Editable from '../Editable/Editable';
import Label from '../Label/Label';
import { useEffect, useState } from 'react';
import { Trash, X } from 'react-feather';
import { v4 as uuidv4 } from 'uuid';

function CardDetail({ card, setData, onClose, }) {
  const searchParams = useSearchParams();
  const [values, setValues] = useState({ task: [], title: '', tags: [] });
  const [text, setText] = useState(values.title);
  const [input, setInput] = useState(false);
  const [labelShow, setLabelShow] = useState(false);
  const [isTimeLogPopupOpen, setIsTimeLogPopupOpen] = useState(false);

  const handleTimeLogClick = () => {
    setIsTimeLogPopupOpen(true);
  };

  const handleCloseTimeLogPopup = () => {
    setIsTimeLogPopupOpen(false);
  };

  const handleTimeLogSubmit = () => {
    // Handle submit logic here
    handleCloseTimeLogPopup();
  };

  useEffect(() => {
    setValues({
      task: card.task || [],
      title: card.title || '',
      tags: card.tags || []
    });
    setText(card.title || '');
  }, [card]);

  const addTask = (value) => {
    const newTask = { id: uuidv4(), task: value, completed: false };
    setValues(prevValues => {
      const updatedTasks = [...prevValues.task, newTask];
      updateCardTasks(updatedTasks);
      return { ...prevValues, task: updatedTasks };
    });
  };

  const updateCardTasks = (tasks) => {
    setData(prevData => prevData.map(board => ({
      ...board,
      card: board.card.map(c => (c.id === card.id ? { ...c, task: tasks } : c))
    })));
  };

  const removeTask = (id) => {
    setValues(prevValues => {
      const remainingTasks = prevValues.task.filter(item => item.id !== id);
      updateCardTasks(remainingTasks);
      return { ...prevValues, task: remainingTasks };
    });
  };

  const updateTask = (id) => {
    setValues(prevValues => {
      const updatedTasks = prevValues.task.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      updateCardTasks(updatedTasks);
      return { ...prevValues, task: updatedTasks };
    });
  };

  const updateTitle = (value) => {
    setValues(prevValues => ({ ...prevValues, title: value }));
    setData(prevData => prevData.map(board => ({
      ...board,
      card: board.card.map(c => (c.id === card.id ? { ...c, title: value } : c))
    })));
  };

  const removeTag = (id) => {
    setValues(prevValues => {
      const tempTags = prevValues.tags.filter(item => item.id !== id);
      setData(prevData => prevData.map(board => ({
        ...board,
        card: board.card.map(c => (c.id === card.id ? { ...c, tags: tempTags } : c))
      })));
      return { ...prevValues, tags: tempTags };
    });
  };

  const addTag = (value, color) => {
    const newTag = { id: uuidv4(), tagName: value, color: color };
    setValues(prevValues => {
      const updatedTags = [...prevValues.tags, newTag];
      setData(prevData => prevData.map(board => ({
        ...board,
        card: board.card.map(c => (c.id === card.id ? { ...c, tags: updatedTags } : c))
      })));
      return { ...prevValues, tags: updatedTags };
    });
  };

  const handleClickListener = (e) => {
    if (e.code === "Enter") {
      setInput(false);
      updateTitle(text === "" ? values.title : text);
    }
  };

  const calculatePercent = () => {
    const totalTask = values.task.length;
    const completedTask = values.task.filter(item => item.completed).length;
    return Math.floor((completedTask * 100) / totalTask) || 0;
  };

  return (
    <div className="bg-white">
      <div className="p-4">
        <div className="flex items-center w-100 justify-between">
          <div className="flex items-center" onClick={onClose}>
            <FiArrowLeft className="text-[#26BADA] mr-2" />
            <p className="text-[#26BADA]">Back to Desk</p>
          </div>
          <div className="flex items-center">
            <button
              className="border border-[#26BADA] text-[#26BADA] px-4 py-2 mr-2"
              onClick={handleTimeLogClick}
            >
              TIME LOG
            </button>
            <button className="bg-[#26BADA] text-white px-4 py-2 mr-2">Mark as Complete</button>
            <FiMoreHorizontal className="text-[#26BADA] text-xl" />
          </div>

          {isTimeLogPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-md shadow-lg w-[600px] max-w-full">
                <h2 className="text-xl mb-4 p-4">Log Hours</h2>
                <div className="bg-[#F8FAFB] p-4">
                  <div className="flex items-center ">
                    <input type="text" placeholder="Actual Time Spent (Hours)" className="border border-gray-300 rounded-sm p-4 mb-4 w-full" />
                    <div className='flex flex-col gap-1 justify-center text-center w-full'>
                      <p className='text-[#778CA2]'>Estimated time</p>
                      <p>6 Hours, 30 mins</p>
                    </div>
                  </div>
                  <textarea
                    placeholder="Notes"
                    className="w-full rounded-sm border border-gray-300 p-2 mb-4"
                    rows="4"
                  >

                  </textarea>
                </div>
                <div className="flex justify-start p-4">
                  <button
                    className="border border-[#26BADA] rounded-md text-[#26BADA] px-4 py-2 mr-2 min-w-40"
                    onClick={handleCloseTimeLogPopup} >CANCEL</button>
                  <button
                    className="bg-[#26BADA] text-white px-4 py-2 rounded-md  min-w-40"
                    onClick={handleTimeLogSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {input ? (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleClickListener}
            onBlur={() => setInput(false)}
            autoFocus
          />
        ) : (
          <h5 style={{ cursor: "pointer" }} onClick={() => setInput(true)}>
            {values.title}
          </h5>
        )}

        <div className="tag-container flex items-center justify-start gap-2">
          {values.tags.length ? (
            values.tags.map(item => (
              <span
                key={item.id}
                className="flex items-center justify-between gap-2 text-white px-2 py-1"
                style={{ backgroundColor: item.color }}
              >
                {item.tagName.length > 10 ? item.tagName.slice(0, 6) + "..." : item.tagName}
                <X onClick={() => removeTag(item.id)} style={{ width: "15px", height: "15px" }} />
              </span>
            ))
          ) : (
            <span style={{ color: "#ccc" }} className="d-flex justify-content-between align-items-center gap-2">
              <i>No Labels</i>
            </span>
          )}
          <button onClick={() => setLabelShow(!labelShow)} className='bg-[#26BADA] text-white px-2 py-1 ml-2'>Add Label</button>
        </div>
        {labelShow && (
          <Label
            tags={values.tags}
            color={["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF5"]}
            addTag={addTag}
            onClose={() => setLabelShow(false)}
          />
        )}



        <div className="flex p-4">
          <div className="w-2/3 pr-4">
            <h2 className="text-lg">{card.title}</h2>
            <p className='text-[#778CA2] text-justify'>{card.description || 'Description Empty'}</p>

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

            <Editable
              parentClass={"task__editable mt-4 border border-[#26BADA] text-[#26BADA] px-4 py-2 mr-2 max-w-[200px] cursor-pointer"}
              name={"Add Task"}
              btnName={"ADD SUB TASK"}
              onSubmit={addTask}
            />

            <div className="flex flex-wrap -mx-4">
              {values.task.map((task) => (
                <div key={task.id} className="w-full md:w-1/3 px-4 mb-8">
                  <div className="bg-white shadow-md rounded-lg p-4 h-full">
                    <span className='text-[#778CA2] mb-2 block'>Title: {task.task.title}</span>
                    <span className='text-[#778CA2] mb-2 block'>Description: {task.task.description}</span>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" checked={task.completed} onChange={() => updateTask(task.id)} />
                        <label className="text-gray-700">Complete</label>
                      </div>
                      <button onClick={() => removeTask(task.id)} className="text-red-500 flex items-center">
                        <Trash className="mr-2" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="">
              <p className='text-[#778CA2] my-5'>Attached Documents</p>
              <div className="bg-[#ffffff] shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]">
                <div className='flex gap-2 items-center'>
                  <FaRegFilePdf className='text-[#f40f02]' />
                  <p>Document name</p>
                </div>
                <button className='bg-[#E3FCEF] text-[#3D9167] px-4 py-2'>Download</button>
              </div>
              <div className="bg-[#ffffff] shadow-sm flex items-center w-full p-2 justify-between mb-3 border-b border-[#babec2]">
                <div className='flex gap-2 items-center'>
                  <FaRegFilePdf className='text-[#f40f02]' />
                  <p>Document name</p>
                </div>
                <button className='bg-[#E3FCEF] text-[#3D9167] px-4 py-2'>Download</button>
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
          <div className='w-1/3'>
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

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
// Changes made to ...