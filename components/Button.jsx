'use client'
import React, { useState } from 'react'
import {useRouter } from 'next/navigation';
import { authenticateUser, loginSubmit } from '@/app/api/auth/scripts';

const Button = () => {
    const [active, setActive] = useState('hidden');
    const [hide, setHide] = useState('block');
    const router = useRouter()
  return (
    <button onClick={(e) => { loginSubmit(e, active, setActive, hide, setHide, router) }} className='bg-[#26BADA] w-full py-2 text-white' type='button' >sign in</button>

  )
}

export default Button