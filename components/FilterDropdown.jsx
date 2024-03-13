'use client'
import React, { useState } from 'react';
import { FiChevronDown } from "react-icons/fi";

function FilterDropdown({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between p-2  rounded cursor-pointer text-xs text-black" onClick={toggleDropdown}>
        <div>{selectedOption || "ALL"}</div>
        <FiChevronDown />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-auto mt-1 bg-white border border-gray-300 rounded text-black">
          {options.map((option, index) => (
            <div key={index} className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-xs" onClick={() => handleOptionSelect(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
