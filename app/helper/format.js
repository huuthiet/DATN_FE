import moment from 'moment';

export default function Money(number) {
  return `${number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} đ`;
}

export function convertDate(date) {
  return moment(date).format('DD/MM/YYYY');
}
