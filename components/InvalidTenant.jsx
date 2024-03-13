"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { loginSubmit } from '@/app/api/auth/scripts';
import { RiAlertFill } from "react-icons/ri";
import Image from 'next/image'

const InvalidTenant = (props) => {

    const [active, setActive] = useState('hidden');
    const [hide, setHide] = useState('block');
    const [validTenant, setValidTenant] = useState(false);
    const router = useRouter()

    return (
        <div className="flex items-center justify-center wrapper ">
            <div className='max-w-[550px] w-full login '>

                <div className={`flex items-center justify-center py-16 ${hide}`}>
                    <div className="bg-gradient-to-br from-[#AF997E] to-[#5D524D] bg-opacity-15 p-8 rounded-lg shadow-lg text-center">
                        <RiAlertFill className="text-yellow-500  text-6xl mx-auto mb-3" />
                        <h1 className="text-2xl text-white">{props.msg}</h1>
                    </div>
                </div>

                <div className={`py-16  flex flex-col justify-center mx-auto items-center bg-white ${active}`}>
                    <div className='w-[154px]'>
                        <img src='/FES - Michael Gates (Account Manager).png' />
                    </div>
                    <span id="welcome-msg" className='font-[400] text-[30px] text-center inline mb-12'>Welcome  Michael !</span>
                </div>

            </div>
        </div>

    )
}

export default InvalidTenant
