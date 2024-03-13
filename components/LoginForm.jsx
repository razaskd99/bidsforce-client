"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { loginSubmit } from '@/app/api/auth/scripts';

import Image from 'next/image'

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
                        <img width="100%" height='100%' src={'/bidsforce logo Op1-01 2.png'} alt='ll' />
                    </div>
                </div>
                <div className={`pt-16 bg-white ${hide}`}>
                    <form className='flex flex-col justify-center items-center' onSubmit={loginSubmit}>
                        <div className="flex flex-col items-end gap-6 w-72">
                            <div className="relative w-full min-w-[200px] h-10">
                                <input
                                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[4px] border-blue-gray-200 focus:border-gray-900"
                                    placeholder=" "
                                    name='username'
                                    id='username'

                                />
                                <label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-[#98A9BC] peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                    Enter your email
                                </label>
                                <Image src="/question-icon.png" alt="question" width={14} height={14} className='absolute top-[4px] right-[4px] cursor-pointer' />
                            </div>
                            <div className="relative w-full min-w-[200px] h-11">
                                <input
                                    className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-[4px] peer text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:border-t-transparent border-blue-gray-200 focus:border-gray-900"
                                    placeholder=" " name='password' id='password' type='password' />
                                <label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-[#98A9BC] peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Enter your password
                                </label>
                                <Image src="/question-icon.png" alt='question' width={14} height={14} className='absolute top-[4px] right-[4px] cursor-pointer' />

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
                            <button onClick={(e) => { loginSubmit(e, active, setActive, hide, setHide, router, props.tenantID) }} className='bg-[#26BADA] w-full py-2 text-white' type='button' >sign in</button>
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
