'use client'
import { logout, logoutUser } from '@/app/api/util/action/account';
import { useSidebar } from '@/context/SidebarContext/SidebarProvider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const [profilePic, setProfilePic] = useState('/avatar.png')

    useEffect(() => {
      const fetchData = async () => {
        try {
          let userRec = await getCookieValue('userLoginData');
          if(userRec.user_profile_photo && userRec.user_profile_photo != "") {
            setProfilePic(userRec.user_profile_photo)
          }
        } catch (error) {
        }
      };
    
      fetchData();
    }, []);


  return (
    <div className="bg-[#26BADA] h-16 w-full flex justify-between items-center text-white px-7">
      <div className="flex items-center gap-8">
        <span className='cursor-pointer' onClick={toggleSidebar}><Image src="/Menu.png" className='w-auto h-auto' width={22} height={25} alt='menu' /></span>
        <div className="w-[487px] flex items-center justify-between rounded-2xl bg-[#51C8E1] py-[6px] px-5">
          <input type="text" placeholder='Search for tasks, people and more' className='w-full text-white bg-transparent border-0 outline-none placeholder:text-white placeholder:text-sm' />
          <Link href="/"><Image src="/search ico.svg" width={18} height={21} className='w-auto h-auto' alt='search' /></Link>

        </div>
      </div>
      <div className=" flex items-center gap-6">
        <Link href='/rfx/new'><Image src="/Add.svg" width={18} height={19} alt='add' className='w-auto h-auto' /></Link>
        <Link href='#' className='relative'><Image src="/msg-icon.svg" width={22} height={25}  className='w-auto h-auto' alt='message' />
          <span className='bg-[#6DD230] w-2 h-2 block absolute rounded-full top-0 right-[-5px] border border-white'></span>
        </Link>
        <Link href='#' className='relative'>
          <Image src="/bell ico.svg" width={18} height={21} alt='notifications' className='w-auto h-auto' />
          <span className='bg-[#FE4D97] w-2 h-2 block absolute rounded-full top-0 right-0 border border-white'></span>
        </Link>
        <Link href='#'>
          <Image src={profilePic} width={36} height={36} alt='profile' className='rounded-full object-cover' />
        </Link>
        <Link href='#' onClick={async () => {
          const updatedLikes = await logoutUser();
          window.location.replace('/login');

        }}>
          <LuLogOut className='text-xl' />
        </Link>
      </div>
    </div>
  )
}

export default Navbar