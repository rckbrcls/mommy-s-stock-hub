export function formatCurrencyInput(value: string) {
  const numericValue = value.replace(/[^0-9]/g, "");
  if (numericValue) {
    const formattedValue = (parseFloat(numericValue) / 100).toFixed(2);
    return `R$ ${formattedValue.replace(".", ",")}`;
  }
  return "";
}

export function parseCurrency(value: string) {
  return parseFloat(value.replace("R$", "").replace(",", ".")) || 0;
}
