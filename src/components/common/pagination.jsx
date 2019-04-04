import React from "react";
import PropTypes from "prop-types"; // add-on to check the props types
import _ from "lodash"; // kind of optimized underscore.js library that make js methods simpler(usully used with _)

const Pagination = props => {
  // [1 ... pageCount].map() maping each page number to a <li></li>
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  console.log(currentPage);
  const pageCount = Math.ceil(itemsCount / pageSize);
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
// the first porpTypes is different than the one is exported, so has to be camelCase
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
