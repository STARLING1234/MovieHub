import React from "react";
import ReactPaginate from "react-paginate";
import "./index.css";

const Paginate = ReactPaginate.default || ReactPaginate;

const index = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageClick = (event) => {
    onPageChange(event.selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // TMDB API limits responses to max 500 pages.
  const pageCount = Math.min(totalPages || 0, 500);

  if (pageCount <= 1) return null;

  return (
    <div className="pagination-wrapper">
      <Paginate
        breakLabel="..."
        nextLabel="Next →"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="← Prev"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
        containerClassName="pagination-container"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item prev-item"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        nextLinkClassName="page-link"
        breakClassName="page-item break-item"
        breakLinkClassName="page-link"
        activeClassName="active"
        disabledClassName="disabled"
      />
    </div>
  );
};

export default index;