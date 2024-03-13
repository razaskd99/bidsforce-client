import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';

const ActivityItem = ({ user, message, time, imageUrl }) => {
    return (
        <div className="flex bg-white gap-4 p-4">
            <Image src={imageUrl} alt="user" width={50} height={50} className='rounded-full object-cover' />
            <div className="flex flex-col gap-1">
                <span className='flex items-center'>
                    <p>{user}</p>
                    <span className='text-sm text-[#26BADA] ml-3'>{message}</span>
                </span>
                <span className='text-sm text-[#98A9BC]'>{time}</span>
            </div>
        </div>
    );
};

const Activity = ({ activities }) => {
    return (
        <div className="flex flex-col mt-5 gap-2">
            <div className="flex items-center justify-between mb-2">
                <p>Activity</p>
                <p className='flex text-sm gap-1 uppercase'>all projects <FaChevronDown /></p>
            </div>
            {activities.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
            ))}
        </div>
    );
};

export default Activity;
