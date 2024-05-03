/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'orderPay.containers';

export default defineMessages({
  orderPay: {
    id: `${scope}.orderPay`,
    defaultMessage: 'Thông Tin Hóa Đơn',
  },
  order: {
    id: `${scope}.order`,
    defaultMessage: 'Đơn Hàng',
  },
  uploadUNC: {
    id: `${scope}.uploadUNC`,
    defaultMessage: 'Tải UNC',
  },
  ImageUNC: {
    id: `${scope}.ImageUNC`,
    defaultMessage: 'Hình',
  },
  paymentMethod: {
    id: `${scope}.paymentMethod`,
    defaultMessage: 'Phương thức thanh toán',
  },
  orderDay: {
    id: `${scope}.orderDay`,
    defaultMessage: 'Ngày đặt hàng',
  },
});
