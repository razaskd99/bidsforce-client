"use client";
import React, {useEffect, useState} from "react";
import { useSidebar } from "@/context/SidebarContext/SidebarProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDesignationRecordByIDAction } from "@/app/api/admin-panel/actions/user";
import { getCookieValue } from "@/lib/scripts";


const data1 = [
  { icon: "/ico.svg", text: "Dashboard", link: "/dashboard", },
  { icon: "/doc.png", text: "opportunities", link: "/opportunities", },
  { icon: "/bids.svg", text: "rfx", link: "/rfx", },
  { icon: "/bids.svg", text: "Bids", link: "/bids", },
  { icon: "/desk.png", text: "my desk", link: "/my-desk", },
  { icon: "/doc.png", text: "approvals", link: "/approvals", },
  { icon: "/doc.png", text: "doc vault", link: "/doc-vault", },
  { icon: "/calendar.png", text: "time tracker", link: "/time-tracker", },
  { icon: "/calendar.png", text: "Calendar", link: "/calendar", },
  { icon: "/contacts.png", text: "contacts", link: "/contacts", },
  { icon: "/contacts.png", text: "resources", link: "/resources", },
  { icon: "/contacts.png", text: "settings", link: "/admin-panel", },
];

const data2 = [
  { icon: "/ico.svg", text: "Dashboard", link: "/dashboard", },
  { icon: "/doc.png", text: "opportunities", link: "/opportunities", },
  { icon: "/bids.svg", text: "rfx", link: "/rfx", },
  { icon: "/bids.svg", text: "bids", link: "/bids", },
  { icon: "/desk.png", text: "my desk", link: "/my-desk", },
  { icon: "/doc.png", text: "approvals", link: "/approvals", },
  { icon: "/doc.png", text: "doc vault", link: "/doc-vault", },
  { icon: "/calendar.png", text: "time tracker", link: "/time-tracker", },
  { icon: "/calendar.png", text: "Calendar", link: "/calendar", },
  { icon: "/contacts.png", text: "contacts", link: "/contacts", },
  { icon: "/contacts.png", text: "resources", link: "/resources", },
  { icon: "/contacts.png", text: "settings", link: "/admin-panel", },
];

const Sidenav = (props) => {
  const { isSidebarVisible } = useSidebar();
  const pathname = usePathname();
  const isLinkActive = (link) => {
    return pathname.includes(link);
  };
  const [designation, setDesignation] = useState('')

  let data = {}
    
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let userRec = await getCookieValue('userLoginData');
  //       const designationRecord = await getDesignationRecordByIDAction(userRec.designation_id);
  //       setDesignation(designationRecord.returnData.title);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);
  


  if (designation == 'Bid Manager') {
    data = data2
  } else {
    data = data1
  }

  return (
    <div>
      {isSidebarVisible ? <div className={`flex-[15%] bg-[#252631] min-w-[270px] h-auto min-h-screen transition-width duration-300 ease-in-out`}>
        <Link
          href="/" ><img
            src="/Logo.png"
            className="py-2 max-w-full"
            width={350}
            height={90}
            alt="Bid Force Logo"
          />
        </Link>
        <div className="">
          {data.map((item) => (
            <Link
              href={item.link}
              className={`flex gap-6 py-4 hover:bg-[#363741] pl-[28px]  hover:border-l-4 hover:border-[#26BADA] ${isLinkActive(item.link)
                ? "bg-[#363741] border-l-4 border-[#26BADA]"
                : "border-l-4 border-transparent"
                }`}
              key={item.text}
            >
              <Image src={item.icon} alt={item.text} width={22} height={25}  />
              <span className="text-white uppercase text-sm">{item.text}</span>
            </Link>
          ))}
        </div>
        {/* Recents */}
        {/* <div className="flex justify-between px-6 py-4 text-[#98A9BC] text-sm">
        <span>Recent</span>
        <span className="flex items-center gap-1"><Image src="/new.svg" width={14} height={16} />New</span>
      </div>
      <Link href="/" className="text-white px-6 py-4 block text-sm font-light border-l-4 border-[#00AAEC]" >DRX Refinery ..</Link>
      <Link href="/" className="text-white px-6 py-4 block text-sm font-light border-l-4 border-[#FE4D97]" >Southern Pipelines..</Link>
      <Link href="/" className="text-white px-6 py-4 block text-sm font-light border-l-4 border-[#6DD230]" > Sixth Terminal ...</Link> */}
      </div> : 
      <div className={`flex-[15%] bg-[#252631] h-auto min-h-screen min-w-[60px]`}>
      <Link
        href="/" ><img
          src="/Logo-Collapse.png"
          className="py-2 max-w-full m-auto"
          width={35}
          height={53}
          alt="Bid Force Logo"
        />
      </Link>
      <div className="">
        {data.map((item) => (
          <Link
            href={item.link}
            className={`flex gap-6 p-4 hover:bg-[#363741]  hover:border-l-4 hover:border-[#26BADA] ${isLinkActive(item.link)
              ? "bg-[#363741] border-l-4 border-[#26BADA]"
              : "border-l-4 border-transparent"
              }`}
            key={item.text}
          >
            <Image src={item.icon} alt={item.text} width={22} height={25}  />
            {/* <span className="text-white uppercase text-sm">{item.text}</span> */}
          </Link>
        ))}
      </div>
      </div>
      }
    </div>
  );
};

export default Sidenav;
