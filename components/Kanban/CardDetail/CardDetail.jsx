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

function CardDetail({ card, setData, onClose }) {
  const searchParams = useSearchParams();
  const [values, setValues] = useState({ task: [], title: '', tags: [] });
  const [text, setText] = useState(values.title);
  const [input, setInput] = useState(false);
  const [labelShow, setLabelShow] = useState(false);

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
    console.log(prevData)
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
        
        <div className="flex items-center w-100 justify-between">
          <div className="flex items-center" onClick={onClose}>
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
          <div className="w-1/3 bg-[#f2f2f2] p-4">
            <div className='flex justify-between'>
              <h3 className="text-lg text-gray-700 font-semibold">Reviewer</h3>
              <div className='text-gray-700 font-semibold'>John Doe</div>
            </div>
            <div className='flex justify-between mt-4'>
              <h3 className="text-lg text-gray-700 font-semibold">Date</h3>
              <div className='text-gray-700 font-semibold'>12/25/2022</div>
            </div>
            <div className='flex justify-between mt-4'>
              <h3 className="text-lg text-gray-700 font-semibold">Time</h3>
              <div className='text-gray-700 font-semibold'>5:00 PM</div>
            </div>
            <div className='flex justify-between mt-4'>
              <h3 className="text-lg text-gray-700 font-semibold">Status</h3>
              <div className='text-gray-700 font-semibold'>Pending</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
