function formatCurrency(number) {
  return new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
}
export default formatCurrency;
