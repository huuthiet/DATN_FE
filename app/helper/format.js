import moment from 'moment';

export default function Money(number) {
  // Tách phần nguyên và phần thập phân
  const parts = number.toString().split('.');
  // Phần nguyên: thêm dấu chấm mỗi ba chữ số
  parts[0] = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  // Kết hợp phần nguyên và phần thập phân lại với nhau
  return `${parts.join(',')} đ`;
}

export function convertDate(date) {
  return moment(date).format('DD/MM/YYYY');
}
