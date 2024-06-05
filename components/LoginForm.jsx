"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { loginSubmit } from '@/app/api/auth/scripts';

import Image from 'next/image'
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { TextField, Tooltip } from '@mui/material';


const LoginForm = (props) => {

    const [active, setActive] = useState('hidden');
    const [hide, setHide] = useState('block');
    const [validTenant, setValidTenant] = useState(false);
    const router = useRouter()

    return (
        <div className="flex items-center justify-center wrapper h-[100vh] ">
            <div className='max-w-[550px] w-full login'>
                <div className='bg-[#252631] h-[200px] flex justify-center items-center'>
                    <div className='w-[396px]'>
                        <img src={'/bidsforce logo Op1-01 2.png'} alt='ll' />
                    </div>
                </div>
                <div className={`pt-16 bg-white ${hide}`}>
                    <form className='flex flex-col justify-center items-center' >
                        <div className="flex flex-col items-end gap-6 w-72">
                            <div className="relative w-full">
                                <Tooltip title="Enter Email here" className='absolute right-0.5 top-0.5 w-4 opacity-0  z-20 bg-[#98A9BC] cursor-pointer ' placement="top-end">.</Tooltip>
                                <AiOutlineQuestionCircle className="absolute right-0.5 top-0.5 z-10 text-[#98A9BC]" />
                                <TextField
                                    id="username"
                                    name="username"
                                    label="Enter your email"
                                    variant="outlined"
                                    className="bg-white w-full"
                                    autoComplete='off'
                                />
                            </div>
                            <div className="relative w-full">
                                <Tooltip title="Enter Password here" className='absolute right-0.5 top-0.5 w-4 opacity-0  z-20 bg-[#98A9BC] cursor-pointer ' placement="top-end">.</Tooltip>
                                <AiOutlineQuestionCircle className="absolute right-0.5 top-0.5 z-10 text-[#98A9BC] cursor-pointer" />
                                <TextField
                                    id="password"
                                    label="Enter your password"
                                    type='password'
                                    variant="outlined"
                                    className="bg-white w-full"
                                    autoComplete="new-password"

                                />
                            </div>
                        </div>
                        <div className='flex gap-12 my-[30px]'>
                            <div className="">
                                <input type="checkbox" id="myCheckbox" name="myCheckbox" />
                                <label for="myCheckbox" className='text-[#98A9BC] text-[14px] font-[400] p-2'>Remember me</label>
                            </div>
                            <a href='/forget' className='text-[#26BADA] text-[14px] font-[400]'>Recover password</a>
                        </div>
                        <div className='w-[300px] pb-12'>
                            <button onClick={(e) => { loginSubmit(e, active, setActive, hide, setHide, router, props.tenantID, props.homeURL) }} className='bg-[#26BADA] w-full py-2 text-white' type='button' >sign in</button>
                        </div>

                        <div id="login-alert" className="hidden p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <span className="font-medium"> </span>
                        </div>
                    </form>
                </div>

                <div className={`py-16  flex flex-col justify-center mx-auto items-center bg-white ${active}`}>
                    <div className='w-[154px]'>
                        <img id="welcome-profile-pic" src='/images/users/profile.jpg' />
                    </div>
                    <span id="welcome-msg" className='font-[400] text-[30px] text-center inline mb-12'>Welcome  Michael !</span>
                </div>

            </div>
        </div>

    )
}

export default LoginForm


