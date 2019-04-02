import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items) // wrapping the items inside the lodash wrapper to chian lodash methods
    .slice(startIndex)
    .take(pageSize)
    .value(); // converting lodash object to a regular array
}
