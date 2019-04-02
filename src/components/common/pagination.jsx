import React from "react";
import _ from "lodash"; // kind of optimized underscore.js library that make js methods simpler(usully used with _)

const Pagination = props => {
  // [1 ... pageCount].map() maping each page number to a <li></li>
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  console.log(currentPage);
  const pageCount = itemsCount / pageSize;
  if (pageCount === 1) return null; // don't render single page
  const pages = _.range(1, pageCount + 1); // the range method don't go to the last one, so add + 1

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
