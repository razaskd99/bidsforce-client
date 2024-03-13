'use client'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import Link from 'next/link';
const AdminPanelNavbar = () => {
  return (
    <div className="bg-gray-400 h-16 w-full flex justify-between items-center text-white px-7">
      <div className="flex items-center gap-8">
        <span><Image src="/Menu.png" width={22} height={25} alt="menu" /></span>
        <div className="w-[487px] flex items-center justify-between rounded-2xl bg-zinc-600 py-[6px] px-5">
          <input type="text" placeholder='Search for tasks, people and more' className='w-full text-white bg-transparent border-0 outline-none placeholder:text-white placeholder:text-sm' />
          <Link href="/"><Image src="/search ico.svg" width={18} height={21} alt='menu' /></Link>

        </div>
      </div>
      <div className=" flex items-center gap-6">
        <Link href='/rfx/new'><Image src="/Add.svg" width={18} height={21} alt="add" /></Link>
        <Link href='/messages' className='relative'><Image src="/msg-icon.svg" width={22} height={25} alt='message' />
          <span className='bg-[#6DD230] w-2 h-2 block absolute rounded-full top-0 right-[-5px] border border-white'></span>
        </Link>
        <Link href='/alerts' className='relative'>
          <Image src="/bell ico.svg" width={18} height={21} alt='bell' />
          <span className='bg-[#FE4D97] w-2 h-2 block absolute rounded-full top-0 right-0 border border-white'></span>
        </Link>
        <Link href='/profile'>
          <Image src="/man.jpeg" width={36} height={36} alt="man" className='rounded-full object-cover' />
        </Link>
      </div>
    </div>
  )
}

export default AdminPanelNavbar