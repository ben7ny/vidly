import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
// instead of pass the prop and destructuring, you can destructure it in the argument
const Table = ({ onSort, sortColumn, columns, data }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
