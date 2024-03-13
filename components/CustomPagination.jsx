import React from 'react';
import PropTypes from 'prop-types';

const CustomPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <span
          key={i}
          className={`pagination-item px-3 py-1 cursor-pointer ${currentPage === i ? 'bg-[#26BADA] text-white' : ''}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </span>
      );
    }

    return pages;
  };

  return <div className="custom-pagination flex justify-end gap-2 mt-4">{renderPagination()}</div>;
};

CustomPagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default CustomPagination;
