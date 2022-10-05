export const currencyFormatOptions = {
  style: "currency",
  currency: "VND",
};

export function formatMoney(price) {
  return new Intl.NumberFormat("vi-VN", currencyFormatOptions).format(price);
}
