"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ totalPages }) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const getPageRange = () => {
    const range = [];
    const maxVisiblePages = 4; // Adjust as needed

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      let start = Math.max(currentPage - 2, 1);
      let end = Math.min(start + maxVisiblePages - 1, totalPages);

      if (end === totalPages) {
        start = Math.max(totalPages - maxVisiblePages + 1, 1);
      }

      if (start > 1) {
        range.push(1);
        if (start > 2) {
          range.push("...");
        }
      }

      for (let i = start; i <= end; i++) {
        range.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) {
          range.push("...");
        }
        range.push(totalPages);
      }
    }

    return range;
  };

  return (
    <>
      <div className="flex items-center justify-between space-x-3">
        <button
          disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              window.location.href = createPageURL(1);
            }
          }}
          className={`cursor-pointer text-gray-800 text-md font-bold ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
        >
          &lt;&lt;
        </button>

        <button
          disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              window.location.href = createPageURL(currentPage - 1);
            }
          }}
          className={`cursor-pointer text-gray-800 text-md font-bold ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
        >
          <ChevronLeft />
        </button>

        {/* Render page numbers */}
        <div className="flex space-x-2">
          {getPageRange().map((pageNumber, index) => (
            <Link key={index} href={createPageURL(pageNumber)}>
              <button
                className={`cursor-pointer text-lg font-lighter align-middle text-center ${
                  currentPage === pageNumber 
                    ? "bg-[#26BADA] text-white"
                    : "text-gray-400"
                } rounded px-3 py-1`}
              >
                {pageNumber}
              </button>
            </Link>
          ))}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => {
            if (currentPage < totalPages) {
              window.location.href = createPageURL(currentPage + 1);
            }
          }}
          className={`cursor-pointer text-gray-800 text-md font-bold ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
        >
          <ChevronRight />
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() => {
            if (currentPage < totalPages) {
              window.location.href = createPageURL(totalPages);
            }
          }}
          className={`cursor-pointer text-gray-800 text-md font-bold ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
        >
          &gt;&gt;
        </button>
      </div>
    </>
  );
}
