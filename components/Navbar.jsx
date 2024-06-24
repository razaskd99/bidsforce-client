"use client";
import { logout, logoutUser } from "@/app/api/util/action/account";
import { useSidebar } from "@/context/SidebarContext/SidebarProvider";
import { getCookieValue } from "@/lib/scripts";
import { Logout, Settings } from "@mui/icons-material";
import { User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { showMainLoader102 } from "@/app/api/util/utility";

const Navbar = () => {
  const router = useRouter();
  const menuRef = useRef(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { toggleSidebar } = useSidebar();
  const [profilePic, setProfilePic] = useState("/avatar.png");
  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState('');
  const [name, setName] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();


  useEffect(() => {
    const fetchData = async () => {
      try {
        let userRec = await getCookieValue("userLoginData");
        if (userRec.first_name) {
          setProfilePic(userRec.profile_image);
          setEmail(userRec.email);
          setName(userRec.first_name + ' ' + userRec.last_name);
          setUserID(userRec.user_id);
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close menu if clicked outside
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfileDropdown = () => {
   setProfileDropdownOpen((prevState) => !prevState);
   
  };

  
  const profileClick = () => {
    if (!pathname.includes('/users/detail/' + userID)) {
      showMainLoader102();
      setOpenMenu(false); 
      router.push('/users/detail/' + userID);       
    }
  };

  const logoutClick = async () => {    
    showMainLoader102();
    const updatedLikes = await logoutUser();
    window.location.replace("/login");          
  };


  return (
    <div className="bg-[#26BADA] h-16 w-full flex justify-between items-center text-white px-7">
      <div className="flex items-center gap-8">
        <span className="cursor-pointer" onClick={toggleSidebar}>
          <Image
            src="/Menu.png"
            className="w-auto h-auto"
            width={22}
            height={25}
            alt="menu"
          />
        </span>
        <div className="w-[487px] flex items-center justify-between rounded-2xl bg-[#51C8E1] py-[6px] px-5">
          <input
            type="text"
            placeholder="Search for tasks, people and more"
            className="w-full text-white bg-transparent border-0 outline-none placeholder:text-white placeholder:text-sm"
          />
          <Link href="/">
            <Image
              src="/search ico.svg"
              width={18}
              height={21}
              className="w-auto h-auto"
              alt="search"
            />
          </Link>
        </div>
      </div>
      <div className=" flex items-center gap-6">
        <Link href="/opportunities">
          <Image
            src="/Add.svg"
            width={18}
            height={19}
            alt="add"
            className="w-auto h-auto"
          />
        </Link>
        <Link href="#" className="relative">
          <Image
            src="/msg-icon.svg"
            width={22}
            height={25}
            className="w-auto h-auto"
            alt="message"
          />
          <span className="bg-[#6DD230] w-2 h-2 block absolute rounded-full top-0 right-[-5px] border border-white"></span>
        </Link>
        <Link href="#" className="relative">
          <Image
            src="/bell ico.svg"
            width={18}
            height={21}
            alt="notifications"
            className="w-auto h-auto"
          />
          <span className="bg-[#FE4D97] w-2 h-2 block absolute rounded-full top-0 right-0 border border-white"></span>
        </Link>
        <Link href="#">
          <img
            src={profilePic}
            width={36}
            height={36}
            alt="profile"
            className="rounded-full object-cover"
            onClick={toggleProfileDropdown}
          />
          
          {profileDropdownOpen  && <div id="dropdownAvatar" ref={menuRef} class="z-10 absolute top-16 right-2 bg-white divide-y divide-gray-100 rounded-md shadow w-60 dark:bg-gray-700 dark:divide-gray-600">
              <div class="flex px-4 py-3 text-sm bg-gray-100 text-gray-900 dark:text-white gap-2">
                <img src={profilePic} width={36} height={36} className="rounded-full" />
                <div>
                  <div className="text-md font-medium">{name}</div>
                  <div class="font-light truncate text-gray-400">{email}</div>
                </div>
              </div>
              <ul class="text-sm text-black font-medium dark:text-gray-00" aria-labelledby="dropdownUserAvatarButton">
                <li className="flex hover:bg-gray-100 px-3 py-3 dark:hover:bg-gray-900 dark:hover:text-white">
                  <User2Icon className="text-gray-400"/>
                  <Link
                    class="block px-4 py-2" 
                    href={'/users/detail/' + userID} 
                    onClick={profileClick}  
                  >YOUR PROFILE</Link>
                </li>
                <li className="flex hover:bg-gray-100 px-3 py-3 dark:hover:bg-gray-900 dark:hover:text-white">
                  <Settings className="text-gray-400"/> <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-white">SETTINGS</a>
                </li>
                <li className="flex hover:bg-gray-100 px-3 py-3 dark:hover:bg-gray-900 dark:hover:text-white">
                  <Logout className="text-gray-400"/> 
                  <Link 
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-white"
                    href="/login" 
                    onClick={logoutClick} 
                  >SIGN OUT</Link>
                </li>
              </ul>    
          </div>}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
