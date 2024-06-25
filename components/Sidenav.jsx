"use client";
import React, { useEffect, useState } from "react";
import { useSidebar } from "@/context/SidebarContext/SidebarProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCookieValue } from "@/lib/scripts";


const data1 = [
  { icon: "/sidenav/1.svg", text: "Dashboard", link: "/dashboard", title:"Dashboard" },
  { icon: "/doc.png", text: "Accounts", link: "/accounts", title:"Accounts" },
  { icon: "/sidenav/2.svg", text: "opportunities", link: "/opportunities", title:"Opportunities" },
  { icon: "/sidenav/3.svg", text: "rfx", link: "/rfx", title:"RFX" },
  { icon: "/sidenav/4.svg", text: "Bids", link: "/bids", title:"Bids" },
  { icon: "/bids.svg", text: "Orders", link: "/orders", title:"Orders" },
  { icon: "/sidenav/5.svg", text: "my desk", link: "/my-desk", title:"My Desk" },
  { icon: "/sidenav/6.svg", text: "approvals", link: "/approvals", title:"Approvals" },
  { icon: "/sidenav/7.svg", text: "doc vault", link: "/doc-vault", title:"Doc Vault" },
  { icon: "/sidenav/8.svg", text: "time tracker", link: "/time-tracker", title:"Time Tracker" },
  { icon: "/sidenav/9.svg", text: "Calendar", link: "/calendar", title:"Calendar" },
  { icon: "/sidenav/10.svg", text: "Users", link: "/users", title:"Users" },
  { icon: "/sidenav/11.svg", text: "resources", link: "/resources", title:"Resources" },
  { icon: "/sidenav/12.svg", text: "settings", link: "/admin-panel", title:"Settings" },
];

const data2 = [
  { icon: "/sidenav/1.svg", text: "Dashboard", link: "/dashboard", title:"Dashboard" },
  { icon: "/doc.png", text: "Accounts", link: "/accounts", title:"Accounts" },
  { icon: "/sidenav/2.svg", text: "opportunities", link: "/opportunities", title:"Opportunities" },
  { icon: "/sidenav/3.svg", text: "rfx", link: "/rfx", title:"RFX" },
  { icon: "/sidenav/4.svg", text: "bids", link: "/bids", title:"Bids" },
  { icon: "/bids.svg", text: "Orders", link: "/orders", title:"Orders" },
  { icon: "/sidenav/5.svg", text: "my desk", link: "/my-desk", title:"My Desk" },
  { icon: "/sidenav/6.svg", text: "approvals", link: "/approvals", title:"Approvals" },
  { icon: "/sidenav/7.svg", text: "doc vault", link: "/doc-vault", title:"Doc Vault" },
  { icon: "/sidenav/8.svg", text: "time tracker", link: "/time-tracker", title:"Time Tracker" },
  { icon: "/sidenav/9.svg", text: "Calendar", link: "/calendar", title:"Calendar" },
  { icon: "/sidenav/10.svg", text: "Users", link: "/users", title:"Users" },
  { icon: "/sidenav/11.svg", text: "resources", link: "/resources", title:"Resources" },
];

const Sidenav = (props) => {
  const { isSidebarVisible } = useSidebar();
  const pathname = usePathname();
  const isLinkActive = (link) => {
    return pathname.includes(link);
  };
  const [designation, setDesignation] = useState('')

  let data = {}

  useEffect(() => {
    const fetchData = async () => {
      try {
        let userRec = await getCookieValue('userLoginData');
        setDesignation(userRec.user_role);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  if (designation == 'Administrator') {
    data = data1
  } else {
    data = data2
  }

  return (
    <div className="m-0 p-0">
      <div className={`flex-[15%] bg-[#252631]  h-full min-h-screen transition-all duration-500 ease-in-out  ${isSidebarVisible ? 'w-[250px] ' : 'w-[65px]'}`}>
        <Link
          href="/" ><img
            src={isSidebarVisible ? "/Logo.png" : "/Logo-Collapse.png"}
            className="py-2 max-w-full transition-all duration-500"
            width={isSidebarVisible ? 350 : 50}
            height={isSidebarVisible ? 90 : 50}
            alt="Bid Force Logo"
          />
        </Link>
        <div className="">
          {data.map((item) => (
            <Link
              href={item.link}
              title={item.title}
              className={`flex gap-6 py-4 hover:bg-[#363741] pl-[20px]  hover:border-l-4 hover:border-[#26BADA] ${isLinkActive(item.link)
                ? "bg-[#363741] border-l-4 border-[#26BADA]"
                : "border-l-4 border-transparent"
                }`}
              key={item.text}
            >
              <Image src={item.icon} alt={item.text} width={22} height={25} />
              {isSidebarVisible && <span className="text-white uppercase text-sm transition-all duration-500">{item.text}</span>}
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
      </div>
    </div>
  );
};

export default Sidenav;
