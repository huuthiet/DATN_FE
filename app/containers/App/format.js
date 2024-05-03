export default function Money(number) {
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
export function MoneyVND(numberString) {
  const number = parseInt(numberString);
  return number.toLocaleString('vi-VN', {
    currency: 'VND',
  });
}
