export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-TH", {
    style: "currency",
    currency: "THB",
  }).format(amount);
};
