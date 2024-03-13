import React from "react";
import Image from "next/image";
import Link from "next/link";

export default async function SideNavAdminPanel(props) {
  const sideNavData = [
    {icon: "/ico.svg",text: "Tenants",link: "/controlpanel/auth/members",},
    {icon: "/bids.svg",text: "Register Tenant",link: "/controlpanel/auth/register",},
    {icon: "/contacts.png",text: "Change Password",link: "/controlpanel/auth/password",},
  ];

  return (
    <aside id="layout-menu" class="layout-menu menu-vertical menu bg-[#252631] shadow-lg " >
      <div class="app-brand demo">
        <Link href={props.homeURL} class="app-brand-link d-block">
          <span class="app-brand-logo demo me-1">
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
        </Link>

        <Link
          href="javascript:void(0);"
          class="layout-menu-toggle menu-link no-underline text-large ms-auto"
        >
          <i class="mdi menu-toggle-icon d-xl-block align-middle mdi-20px"></i>
        </Link>
      </div>

      <div class="menu-inner-shadow"></div>

      <ul class="menu-inner py-1">
        <li class="menu-item active open ">
          <Link href="javascript:void(0);" class="menu-link no-underline ">
            <div data-i18n="Dashboards" className="text-xl text-[#26bada] mt-3">
              Admin Dashboards
            </div>
          </Link>
        </li>

        <li class="menu-item">
          <Link
            href="javascript:void(0);"
            class="menu-link no-underline menu-toggle text-white hover:bg-gray-300 font-normal "
          >
            <div data-i18n="Layouts">USERS</div>
          </Link>

          <ul class="menu-sub">
            <li class="menu-item">
              <Link
                href="/admin-panel/users"
                class="menu-link no-underline text-white hover:bg-gray-300"
              >
                <div data-i18n="Without navbar">Users</div>
              </Link>
            </li>
            <li class="menu-item">
              <Link
                href="/admin-panel/teams"
                class="menu-link no-underline text-white hover:bg-gray-300"
              >
                <div data-i18n="Without navbar">Teams</div>
              </Link>
            </li>
            <li class="menu-item">
              <Link
                href="/admin-panel/companies"
                class="menu-link no-underline text-white hover:bg-gray-300"
              >
                <div data-i18n="Without navbar">Companies</div>
              </Link>
            </li>
            <li class="menu-item">
              <Link
                href="/admin-panel/designation"
                class="menu-link no-underline text-white hover:bg-gray-300"
              >
                <div data-i18n="Without navbar">Designations</div>
              </Link>
            </li>
          </ul>
        </li>

        <li class="menu-item">
          <Link
            href="javascript:void(0);"
            class="menu-link no-underline menu-toggle text-white font-extrabold hover:bg-gray-300 font-normal "
          >
            <div data-i18n="Layouts">RFX PRE-REQUISITES</div>
          </Link>

          <ul class="menu-sub">
            <li class="menu-item">
              <Link
                href="/admin-panel/rfx/bid-validity"
                class="menu-link no-underline text-white hover:bg-gray-300"
              >
                <div data-i18n="Without menu">Bid Validity</div>
              </Link>
            </li>
            <li class="menu-item">
              <Link
                href="/admin-panel/rfx/rfx-type"
                class="menu-link no-underline text-white hover:bg-gray-300"
              >
                <div data-i18n="Without navbar">Rfx Type</div>
              </Link>
            </li>
            <li class="menu-item">
              <Link
                href="/admin-panel/rfx/rfx-content-submission"
                class="menu-link no-underline text-white hover:bg-gray-300"
              >
                <div data-i18n="Without navbar">RFx Content Submission</div>
              </Link>
            </li>
            <li class="menu-item">
              <Link
                href="/admin-panel/rfx/rfx-submission-mode"
                class="menu-link no-underline text-white hover:bg-gray-300"
              >
                <div data-i18n="Without navbar">RFx Submission Mode</div>
              </Link>
            </li>
            <li class="menu-item">
              <Link
                href="/admin-panel/rfx/rfx-stage"
                class="menu-link no-underline text-white hover:bg-gray-300"
              >
                <div data-i18n="Without navbar">RFx Stage</div>
              </Link>
            </li>
          </ul>
        </li>

        <li class="menu-item">
          <Link
            href="javascript:void(0);"
            class="menu-link no-underline menu-toggle text-white font-extrabold hover:bg-gray-300 font-normal "
          >
            <div data-i18n="Layouts">CUSTOMERS</div>
          </Link>

          <ul class="menu-sub">
            <li class="menu-item">
              <Link
                href="/admin-panel/customers"
                class="menu-link no-underline text-white hover:bg-gray-300"
              >
                <div data-i18n="Without navbar">Customers</div>
              </Link>
            </li>
            <li class="menu-item">
              <Link
                href="/admin-panel/opportunities"
                class="menu-link no-underline text-white hover:bg-gray-300"
              >
                <div data-i18n="Without navbar">Opportunities</div>
              </Link>
            </li>
          </ul>
        </li>

        <li class="menu-item">
          <Link
            href="javascript:void(0);"
            class="menu-link no-underline menu-toggle text-white font-extrabold hover:bg-gray-300 font-normal "
          >
            <div data-i18n="Layouts">STAGES</div>
          </Link>

          <ul class="menu-sub">
            <li class="menu-item">
              <Link
                href="/admin-panel/phase/rfx-stages"
                class="menu-link no-underline text-white hover:bg-gray-300"
              >
                <div data-i18n="Without navbar">Rfx Stages</div>
              </Link>
            </li>
            <li class="menu-item">
              <Link
                href="/admin-panel/phase/bid-stages"
                class="menu-link no-underline text-white hover:bg-gray-300"
              >
                <div data-i18n="Without navbar">Bid Staages</div>
              </Link>
            </li>
          </ul>
        </li>

        <li class="menu-item">
          <Link
            href="javascript:void(0);"
            class="menu-link no-underline menu-toggle text-white font-extrabold hover:bg-gray-300 font-normal "
          >
            <div data-i18n="Layouts">TEMPLATES</div>
          </Link>

          <ul class="menu-sub">
            <li class="menu-item">
              <Link
                href="/admin-panel/template-builder"
                class="menu-link no-underline text-white hover:bg-gray-300"
              >
                <div data-i18n="Without navbar">Create a Template</div>
              </Link>
            </li>
          </ul>
        </li>

        <li class="menu-header fw-medium mt-4">
          <span class="menu-header-text">Misc</span>
        </li>
      </ul>
    </aside>
  );
}
