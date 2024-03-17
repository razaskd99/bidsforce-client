'use client'

import { onChangeListHeadCheckbox } from "@/app/api/controlpanel/utility";
import Image from "next/image";
import Link from "next/link";


export default async function ListHeadElements() {



return(
    <thead className="text-xs text-black-700 uppercase bg-[#F8FAFB] dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" className="p-5">
                <div className="flex items-center">
                    <input onChange={(e)=>onChangeListHeadCheckbox(e)} id="checkbox-item-list-title" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-item-list-title" className="sr-only">checkbox</label>
                </div>
            </th>
            <th scope="col" className="px-6 py-3">
                Tenant
            </th>
            <th scope="col" className="px-6 py-3">
                Created On
            </th>
            <th scope="col" className="px-6 py-3">
                Email
            </th>
            <th scope="col" className="px-6 py-3">
                Phone
            </th>
            <th scope="col" className="px-6 py-3">
                Status
            </th>
            <th scope="col" className="px-6 py-3">
                Action
            </th>
        </tr>
    </thead>
    )

};