import React, { Component } from "react";
// moved here from movieTable to make it generic
// interface has to include:
// columns: array
// sortColumn: object
// onSort: function
class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              style={{ cursor: "pointer" }}
              key={column.path}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.lable}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
