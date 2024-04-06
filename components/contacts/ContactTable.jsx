'use client'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from "next/image";
import { LuMessagesSquare } from "react-icons/lu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import CustomPagination from "../CustomPagination";

// Define a function for rendering option cell
const renderOptionCell = () => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <LuMessagesSquare style={{ marginRight: 4, fontSize: 18, color: "#98A9BC" }} />
    <IoIosNotificationsOutline style={{ marginRight: 4, fontSize: 18, color: "#98A9BC" }} />
    <HiOutlineDotsHorizontal style={{ marginRight: 4, fontSize: 18, color: "#98A9BC" }} />
  </div>
);

const ContactTable = ({ rows }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Calculate the index of the first and last item to be displayed on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page of items
  const currentItems = rows.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-600 w-full  overflow-auto">
      <table className="table-auto w-full border-separate border-spacing-y-3 bg-[#f2f4f6] mt-4">
        <tbody>
          {currentItems.map((row) => (
            <tr key={row.id} className="bg-white ">
              <td className="px-4 py-2">
{
                <img src={row.profile_image} width={40} height={40} className="rounded-full" />
}
              </td>
              <td className="px-4 py-2">{row.first_name +' '+ row.first_name}</td>
              <td className="px-4 py-2">{row.email}</td>
              <td className="px-4 py-2">{row.contact_number}</td>
              <td className="px-4 py-2">{row.time_zone}</td>
              <td className="px-4 py-2">{row.working_hours}</td>
              <td className="px-4 py-2">{row.work_location}</td>
              <td className="px-4 py-2">{renderOptionCell()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CustomPagination
        totalItems={rows.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

ContactTable.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default ContactTable;
