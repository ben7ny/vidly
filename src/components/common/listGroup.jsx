import React from "react";
const ListGroup = props => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem
  } = props; //use dynamic property instead of {item.name} and key={item._id} incase if some object lack them

  return (
    <ul className="list-group">
      {items.map((item, index) => (
        <li
          style={{ cursor: "pointer" }}
          onClick={() => onItemSelect(item)}
          className={
            selectedItem === item ? "list-group-item active" : "list-group-item"
          }
          key={item[valueProperty]} // had to use otherwise does not bypass All Genres without key: _id or pass  _id = "" string
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

// instead of puting them in parent componenet and over crowd it, stor them here and if other object lack this atributes you can modify them
// these two exist in the current object
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
