import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  // conditional mathed to halp to render more than one
  // it checks if the item.content is truthy is function that retuen a movie or item
  // got the item and colum from the map
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    // using data and item names, so can be used everywhere
    // you can not use dynamic {item[genre.name]} for nested map and just work for simple one(use lodash instead)
    // you can populate each row with a data you get from column to build a column(data pass to item which movies are on page)
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
