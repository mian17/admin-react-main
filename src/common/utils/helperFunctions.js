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
  // const currentYear = 2027;
  // const years = [];
  startYear = startYear || 1980;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  years.splice(0, 1);
  return years;
}
