import Image from 'next/image'
import Link from 'next/link'

export default async function SideNav() {

    const sideNavData = [
        {
            icon: '/ico.svg',
            text: 'Manage Users',
            link: '/user-manager/auth/users'
        },
        {
            icon: '/bids.svg',
            text: 'Register User',
            link: '/user-manager/auth/register'
        },    
        {
            icon: '/contacts.png',
            text: 'Change Password',
            link: '/user-manager/auth/password'
        },               
    ];
    
    return (
        <div className='w-[300px] bg-[#252631] h-auto min-h-screen '>
            <img src='/bidsforce logo Op1-01 2.png' className='py-2' />
            <div className=''>
                {sideNavData.map((item) => (
                    <Link href={item.link} className={`flex gap-6 py-4 hover:bg-[#363741] pl-[28px]  hover:border-l-4 hover:border-[#26BADA] ${!true ? 'bg-[#363741] border-l-4 border-[#26BADA]' : 'border-l-4 border-transparent'}`} key={item.text}>
                        <Image src={item.icon} width={22} height={22} alt={item.text} className='w-auto h-auto' />
                        <span className='text-white uppercase text-sm'>{item.text}</span>
                    </Link>
                ))}
            </div>
            
        </div>
    )
}

