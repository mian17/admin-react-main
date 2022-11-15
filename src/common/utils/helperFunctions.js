import IndeterminateCheckbox from "../components/IndeterminateCheckbox";

export const currencyFormatOptions = {
  style: "currency",
  currency: "VND",
};

export function formatMoney(price) {
  return new Intl.NumberFormat("vi-VN", currencyFormatOptions).format(price);
}

export function makeYears(startYear) {
  const currentYear = new Date().getFullYear(),
    years = [];
  startYear = startYear || 1980;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  years.splice(0, 1);
  return years;
}

export function createIndeterminateCheckboxes(hooks) {
  hooks.visibleColumns.push((columns) => {
    return [
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => (
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        ),
      },
      ...columns,
    ];
  });
}
