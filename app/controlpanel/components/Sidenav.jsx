import Image from "next/image";
import Link from "next/link";

export default async function SideNav() {
  const sideNavData = [
    {
      icon: "/ico.svg",
      text: "Tenants",
      link: "/controlpanel/auth/members",
    },
    {
      icon: "/bids.svg",
      text: "Register Tenant",
      link: "/controlpanel/auth/register",
    },
    {
      icon: "/contacts.png",
      text: "Change Password",
      link: "/controlpanel/auth/password",
    },
  ];

  return (
    // {<div className='w-[300px] bg-[#252631] h-auto min-h-screen '>
    //     <img src='/bidsforce logo Op1-01 2.png 999' className='py-2' />
    //     <div className=''>
    //         {sideNavData.map((item) => (
    //             <Link href={item.link} className={`flex gap-6 py-4 hover:bg-[#363741] pl-[28px]  hover:border-l-4 hover:border-[#26BADA] ${!true ? 'bg-[#363741] border-l-4 border-[#26BADA]' : 'border-l-4 border-transparent'}`} key={item.text}>
    //                 <Image src={item.icon} width={22} height={22} alt={item.text} className='w-auto h-auto' />
    //                 <span className='text-white uppercase text-sm'>{item.text}</span>
    //             </Link>
    //         ))}
    //     </div>

    // </div>}

    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-zinc-200 shadow-lg"
    >
      <div className="app-brand demo">
        <a href="index.html" className="app-brand-link d-block">
          <span className="app-brand-logo demo me-1">
            <span style={{ color: "var(--bs-primary)" }} className="bg-dark">
              <Image
                src="/Logo.png"
                alt="Bid Force"
                width={370}
                height={90}
                className="w-100"
              />
            </span>
          </span>
        </a>

        <a
          href="javascript:void(0);"
          className="layout-menu-toggle menu-link text-large ms-auto"
        >
          <i className="mdi menu-toggle-icon d-xl-block align-middle mdi-20px"></i>
        </a>
      </div>

      <div className="menu-inner-shadow"></div>

      <ul className="menu-inner py-1">
        <li className="menu-item active open ">
          <a href="javascript:void(0);" className="menu-link ">
            <div data-i18n="Dashboards" className="text-xl text-[#26bada] mt-3">
              Control Panel
            </div>
          </a>
        </li>

        <li className="menu-item">
          <Link
            href="javascript:void(0);"
            className="menu-link menu-toggle text-black font-extrabold hover:bg-gray-300 "
          >
            <div data-i18n="Layouts">TENANTS</div>
          </Link>

          <ul className="menu-sub">
            <li className="menu-item">
              <Link
                href="/controlpanel/auth/register"
                className="menu-link text-black hover:bg-gray-300"
              >
                <div data-i18n="Without navbar">Create a Tenant</div>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                href="/controlpanel/auth/members"
                className="menu-link text-black hover:bg-gray-300"
              >
                <div data-i18n="Without menu">Tenants</div>
              </Link>
            </li>
          </ul>
        </li>

        <li className="menu-item">
          <Link
            href="javascript:void(0);"
            className="menu-link menu-toggle text-black font-extrabold hover:bg-gray-300 "
          >
            <div data-i18n="Layouts">SETTINGS</div>
          </Link>

          <ul className="menu-sub">
            <li className="menu-item">
              <Link
                href="/controlpanel/auth/password"
                className="menu-link text-black hover:bg-gray-300"
              >
                <div data-i18n="Without navbar">Change Password</div>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}
