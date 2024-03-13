import Breadcrumbs from "@/components/Breadcrumbs";
import SearchTable from "@/components/SearchTable";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import getConfig from 'next/config'

import { redirect } from 'next/navigation'

const Opportunitues = () => {
  const { serverRuntimeConfig } = getConfig() || {};

  let isLogin=false
  // get server side global store data
  if (serverRuntimeConfig) {
      isLogin = serverRuntimeConfig.IS_LOGIN;
  }

  if(!isLogin) redirect("/login")

  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "CRM Opportunities", href: "/rfx" },
  ];
  const rows  = [
    {id: 1, checkbox: 'dddd.png',description: 'Urea Plant Expansion',rfxid: 'RFX-101132',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '8 Jul 2021',contacts: 'Sara Andrew',status: 'RFx Issued',
      biId:'BID-187678',new: 'New', issue:'19 June, 2022', sales: 'Tysen',}
    ]

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="w-[260px] flex items-center justify-between rounded-2xl bg-white py-[6px] px-5 my-4 ml-auto">
        <input
          type="text"
          placeholder="Search within results"
          className="w-full text-black bg-transparent border-0 outline-none placeholder:text-[#778CA2] placeholder:text-sm"
        />
        <button>
          <IoIosSearch className="transform scale-x-[-1] text-[#778CA2]" />
        </button>
      </div>
      <SearchTable rows={rows} />
    </div>
  );
};

export default Opportunitues;
