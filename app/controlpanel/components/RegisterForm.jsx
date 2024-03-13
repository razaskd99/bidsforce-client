'use client'

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createTenenatRequest } from "@/app/api/controlpanel/scripts";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function RegisterTenantForm(props) {



  let tenantData = [
    { name: 'subscription_start_date', lebal: 'Subscription Start', value: 'Subscription Start', type: 'date', required: true },
    { name: 'subscription_end_date', lebal: 'Subscription End', value: 'Subscription End', type: 'date', required: true },
    { name: 'tenant_name', lebal: 'Tenant Name', value: 'Tenant name', required: true },
    { name: 'tenant_title', lebal: 'Tenant Title', value: 'Tenant Title', required: true },
    { name: 'domain_url', lebal: 'Tenant URL', value: 'Tenant URL', required: true },
    { name: 'tenant_logo', lebal: 'Logo', value: 'Logo', type: 'file' },
    {
      lebal: 'Description',
      name: 'tenant_description',
      value: 'Description',
      type: 'textarea'
    },

  ];

  let contactData = [
    { name: 'contact_person', lebal: 'Contact Name', required: true },
    { name: 'contact_email', lebal: 'Email', required: true },
    { name: 'contact_phone', lebal: 'Phone', required: true },
    { name: 'location_zip', lebal: 'Zip' },
    { name: 'location_country', lebal: 'Country' },
    { name: 'location_state', lebal: 'State' },
    {
      lebal: 'Address',
      name: 'contact_address',
      type: 'textarea'
    },
  ];

  const breadcrumbItems = [
    { label: "Control Penal", href: "/controlpanel/auth/members" },
    { label: "Register Tenant", href: "/controlpanel/auth/register" },
  ];


  const handleChange = async (e) => {

  }

  const [subType, setSubType] = useState("");
  const handleSubTypChange = (event) => {
    setSubType(event.target.value);
  };

  const [tenantStatus, setTenantStatus] = useState("");
  const handletenantStatusChange = (event) => {
    setTenantStatus(event.target.value);
  };

  const [emialVerified, setEmialVerified] = useState("");
  const handleEmailVerifiedChange = (event) => {
    setEmialVerified(event.target.value);
  };

  return (

    < >
      <h3 className="text-black uppercase font-bold text-2xl my-4">Tenant Details</h3>
      <div className="grid grid-cols-2 gap-10 flex-[2]">
        <div className='mt-0' key={0}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="subscription_type"  >Subscription Type*</InputLabel>
              <Select
                labelId="subscription_type"
                id="subscription_type"
                className="bg-white"
                value={subType}
                label="Subscription Type"
                onChange={handleSubTypChange}
              >
                <MenuItem value="Select Type">Select Type</MenuItem>
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Premium">Premium</MenuItem>
                <MenuItem value="Professional">Professional</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* <span className=" block text-[#778CA2]">Subscription Type <small className="text-red-600 text-sm">(required*)</small></span>
          <select id="subscription_type" className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full">
            <option>Select Type</option>
            <option>Beginer</option>
            <option>Premium</option>
            <option>Professional</option>
          </select> */}
        </div>
        <div className='mt-0' key={1}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="tenant_status"  >Tenant Status*</InputLabel>
              <Select
                labelId="tenant_status"
                id="tenant_status"
                className="bg-white"
                value={tenantStatus}
                label="Tenant Status"
                onChange={handletenantStatusChange}
              >
                <MenuItem value="Select Type">Select Status</MenuItem>
                <MenuItem value="Beginner">Active</MenuItem>
                <MenuItem value="Premium">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* <span className=" block text-[#778CA2]">Tenant Status <small className="text-red-600 text-sm">(required*)</small></span>
          <select id="tenant_status" className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full">
            <option>Select Status</option>
            <option selected>Active</option>
            <option>Inactive</option>
          </select> */}
        </div>
        {tenantData.map((item, index) => (
          <div className={`mt-0 ${item.name === 'Description' ? 'col-span-2' : ''}`} key={index + 3}>
            {item.type && item.type === 'textarea' ? (
              <textarea
                id={item.name}
                className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                rows={5}
              />
            ) : (
              item.type && item.type === 'file' ? (<input type="file" id={item.name}
                className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full bg-white"
              />) : (
                <>
                  {item.type && item.type === 'date' ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker label={item.lebal + (item.required ? " *" : "")} className="w-full bg-white" />
                      </DemoContainer>
                    </LocalizationProvider>
                  ) : <TextField id={item.id} label={item.lebal + (item.required ? " *" : "")} variant="outlined" className="w-full bg-white" />
                  }
                </>
              )
            )}
          </div>
        ))}
      </div>

      <h3 className="text-black uppercase font-bold text-2xl my-5">Contact Details</h3>
      <div className="grid grid-cols-2 gap-10 flex-[2]">
        {contactData.map((item, index) => (
          <div className={`mt-0 ${item.name === 'Description' ? 'col-span-2' : ''}`} key={index + 15}>
            {/* <span className=" block text-[#778CA2]">{item.lebal} {item.required ? <small className="text-red-600 text-sm">(required*)</small> : ''}</span> */}
            {item.type && item.type === 'textarea' ? (
              <textarea
                id={item.name}

                className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
                value={item.value}
                rows={3}
              />
            ) : (

              <TextField id={item.name} label={item.lebal + (item.required ? " *" : "")} variant="outlined" className="w-full bg-white" />

              // <input
              //   type="text"
              //   id={item.name}

              //   className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full"
              //   value={item.value}
              // />
            )}
          </div>
        ))}
        <div className='mt-0' key={0}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="emial_verified"  >Email is verified?*</InputLabel>
              <Select labelId="emial_verified" id="emial_verified" className="bg-white" value={emialVerified}
                label="Email is verified"
                onChange={handleEmailVerifiedChange}
              >
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* <span className=" block text-[#778CA2]">Email is verified?</span>
          <select id="email_verified" className="border border-gray-200 p-2 outline-1 outline-gray-300 w-full">
            <option>Select Status</option>
            <option selected>No</option>
            <option>Yes</option>
          </select> */}
        </div>
      </div>



      <div className="flex justify-center my-10 gap-4">
        <button
          type="button"
          onClick={() => window.location = '/controlpanel/auth/members'}
          className="text-[#26bada] uppercase text-[14px] p-6 min-w-[220px] bg-white border border-[#26bada] hover:bg-[#26abc9] py-3 rounded-md"
          >Cancel</button>
        <button
          type="button"
          onClick={(e) => createTenenatRequest(e, props.apiBackendURL, props.accessToken)}
          className="text-white uppercase text-[14px] min-w-[220px] bg-[#26bada] hover:bg-[#26abc9] py-3 rounded-md"
        >Save Tenant</button>
      </div>


      <div id="tenantRegisterMessage" className="hidden fixed w-[83%] bottom-10 p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
        <div className="flex items-center">
          <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only title">Info</span>
          <h3 className="text-lg font-medium">Error Message</h3>
        </div>
        <div className="mt-2 mb-4 text-sm content">
          Please fill in the required fields which are maked as (required*).
        </div>
        <div className="flex">
          <button type="button" className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800" data-dismiss-target="#alert-additional-content-2" aria-label="Close">
            Dismiss
          </button>
        </div>
      </div>

    </>




  );
};

