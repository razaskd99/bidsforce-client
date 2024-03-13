"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  deleteTenenatRequest,
  updateTenenatRequest,
} from "@/app/api/controlpanel/scripts";

export default function TenantListingButtons(props) {
  const [openModal, setOpenModal] = useState(false);
  const [tenants, setTenants] = useState({ ...props.tenantData });

  let tenantData = [
    {
      name: "subscription_start_date",
      lebal: "Subscription Start",
      value: tenants.subscription_start_date,
      type: "date",
    },
    {
      name: "subscription_end_date",
      lebal: "Subscription End",
      value: tenants.subscription_end_date,
      type: "date",
    },
    { name: "tenant_name", lebal: "Tenant Name", value: tenants.tenant_name },
    {
      name: "tenant_title",
      lebal: "Tenant Title",
      value: tenants.tenant_title,
    },
    {
      lebal: "Description",
      name: "tenant_description",
      value: tenants.tenant_description,
      type: "textarea",
    },
    { name: "tenant_logo", lebal: "Logo", value: "Logo", type: "file" },
  ];

  let contactData = [
    {
      name: "contact_person",
      lebal: "Contact Name",
      value: tenants.contact_person,
    },
    { name: "contact_email", lebal: "Email", value: tenants.contact_email },
    { name: "contact_phone", lebal: "Phone", value: tenants.contact_phone },
    { name: "location_zip", lebal: "Zip", value: tenants.location_zip },
    {
      name: "location_country",
      lebal: "Country",
      value: tenants.location_country,
    },
    { name: "location_state", lebal: "State", value: tenants.location_state },
    {
      lebal: "Address",
      name: "contact_address",
      value: tenants.contact_address,
      type: "textarea",
    },
  ];

  const handleChangeValues = (e) => {
    let data = { ...tenants, [e.target.name]: e.target.value };
    setTenants({ ...data });

    console.log(tenants);
  };

  const handleCancel = (e) => {
    setOpenModal(false);
  };

  return (
    <>
      <div class="">
        <div class=" col-md-12 mb-4 justify-content-center d-flex">
          <button
            onClick={() => setOpenModal(true)}
            class="btn btn-outline-primary w-[120px] mr-3 waves-effect "
            type="button"
          >
            Edit
          </button>
          <button
            onClick={(e) =>
              deleteTenenatRequest(
                e,
                props.apiBackendURL,
                props.accessToken,
                props.tenant_id
              )
            }
            type="button"
            class="btn btn-primary w-[120px] waves-effect "
          >
            Delete
          </button>
        </div>
      </div>

      {openModal && (
        <>
          <div
            id="authentication-modal"
            class="show overflow-y-auto overflow-x-hidden fixed top-0 right-0 m-auto z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
          >
            <div class="relative p-4 w-1/2 max-h-full">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Tenant & Contact Details
                  </h3>
                  <button
                    onClick={() => setOpenModal(false)}
                    type="button"
                    class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>

                <div class="p-4 md:p-5">
                  <form class="space-y-4 pb-3" action="#">
                    <div className="grid grid-cols-2 gap-10 ">
                      <div className="mt-0" key={0}>
                        <span className=" block text-[#778CA2]">
                          Subscription Type
                        </span>
                        <select
                          onChange={handleChangeValues}
                          name="subscription_type"
                          className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                        >
                          <option>Select Type</option>
                          <option
                            value="Beginer"
                            selected={
                              tenants.susubscription_type === "Beginer"
                                ? true
                                : false
                            }
                          >
                            Beginer
                          </option>
                          <option
                            value="Premium"
                            selected={
                              tenants.susubscription_type === "Premium"
                                ? true
                                : false
                            }
                          >
                            Premium
                          </option>
                          <option
                            value="Professional"
                            selected={
                              tenants.susubscription_type === "Professional"
                                ? true
                                : false
                            }
                          >
                            Professional
                          </option>
                        </select>
                      </div>
                      <div className="mt-0" key={0}>
                        <span className=" block text-[#778CA2]">
                          Tenant Status
                        </span>
                        <select
                          onChange={handleChangeValues}
                          name="tenant_status"
                          className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                        >
                          <option>Select Status</option>
                          <option
                            value="Active"
                            selected={tenants == "Active" ? true : false}
                          >
                            Active
                          </option>
                          <option
                            value="Inactive"
                            selected={
                              tenants.tenant_status == "Inactive" ? true : false
                            }
                          >
                            Inactive
                          </option>
                          <option
                            value="Cancelled"
                            selected={
                              tenants.tenant_status == "Cancelled"
                                ? true
                                : false
                            }
                          >
                            Cancelled
                          </option>
                        </select>
                      </div>
                      {tenantData.map((item, index) => (
                        <div
                          className={`mt-0 ${
                            item.name === "Description" ? "col-span-2" : ""
                          }`}
                          key={index}
                        >
                          <span className=" block text-[#778CA2]">
                            {item.lebal}
                          </span>
                          {item.type && item.type === "textarea" ? (
                            <textarea
                              name={item.name}
                              onChange={handleChangeValues}
                              className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                              value={item.value}
                              rows={3}
                            />
                          ) : item.type && item.type === "file" ? (
                            <input
                              type="file"
                              name={item.name}
                              onChange={handleChangeValues}
                              className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                            />
                          ) : (
                            <input
                              type={
                                item.type && item.type === "date"
                                  ? "date"
                                  : "text"
                              }
                              name={item.name}
                              onChange={handleChangeValues}
                              className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                              value={item.value}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-10 pt-3 border-t">
                      {contactData.map((item, index) => (
                        <div
                          className={`mt-0 ${
                            item.name === "Description" ? "col-span-2" : ""
                          }`}
                          key={index}
                        >
                          <span className=" block text-[#778CA2]">
                            {item.lebal}
                          </span>
                          {item.type && item.type === "textarea" ? (
                            <textarea
                              name={item.name}
                              onChange={handleChangeValues}
                              className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                              value={item.value}
                              rows={3}
                            />
                          ) : item.type && item.type === "file" ? (
                            <input
                              type="file"
                              name={item.name}
                              onChange={handleChangeValues}
                              className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                            />
                          ) : (
                            <input
                              type="text"
                              name={item.name}
                              onChange={handleChangeValues}
                              className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                              value={item.value}
                            />
                          )}
                        </div>
                      ))}
                      <div className="mt-0" key={0}>
                        <span className=" block text-[#778CA2]">
                          Email is verified?
                        </span>
                        <select
                          name="email_verified"
                          onChange={handleChangeValues}
                          className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                        >
                          <option>Select Status</option>
                          <option
                            selected={!tenants.email_verified ? true : false}
                          >
                            No
                          </option>
                          <option
                            selected={tenants.email_verified ? true : false}
                          >
                            Yes
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="flex justify-center">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="text-[#26bada] uppercase font-[14px] w-[206px] h-[46px] bg-white border border-[#26bada] hover:bg-[#26abc9] hover:text-white py-3 mt-[25px] mb-[25px] rounded-md mr-[15px] mr-10px"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          updateTenenatRequest(
                            e,
                            props.apiBackendURL,
                            props.accessToken,
                            tenants
                          );
                          setOpenModal(false);
                        }}
                        className="text-white uppercase font-[14px] w-[206px] h-[46px] bg-[#26bada] hover:bg-[#26abc9] py-3 mt-[25px] mb-[25px] rounded-md"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 w-screen h-screen bg-gray-600 opacity-75 z-10"></div>
        </>
      )}
    </>
  );
}
