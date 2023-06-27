import React from "react";

function Pagination({ currentPage, totalPages, handlePageChange }) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="box-pagination">
      <button
        className={currentPage > 1 ? "page-item" : "page-item disabled"}
        onClick={handlePreviousPage}
        disabled={currentPage > 1 ? false : true}
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`page-item ${currentPage === page ? "active" : ""}`}
        >
          {page}
        </button>
      ))}
      <button
        className={
          currentPage < totalPages ? "page-item" : "page-item disabled"
        }
        onClick={handleNextPage}
        disabled={currentPage < totalPages ? false : true}
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
}

export default Pagination;
