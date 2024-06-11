/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'MoneyInformationDetail.containers';

export default defineMessages({
  updateBank: {
    id: `${scope}.updateBank`,
    defaultMessage: 'Cập nhật thông tin',
  },
  addBank: {
    id: `${scope}.addBank`,
    defaultMessage: 'Thêm thông tin tài khoản ngân hàng',
  },
  stk: {
    id: `${scope}.stk`,
    defaultMessage: 'Vui lòng nhập số tài khoản',
  },
  nameTk: {
    id: `${scope}.nameTk`,
    defaultMessage: 'Vui lòng nhập tên tài khoản',
  },
  bank: {
    id: `${scope}.bank`,
    defaultMessage: 'Vui lòng chọn ngân hàng',
  },
  branch: {
    id: `${scope}.branch`,
    defaultMessage: 'Vui lòng chọn chi nhánh',
  },
  imgBank: {
    id: `${scope}.imgBank`,
    defaultMessage: 'Hình ảnh chuyển khoản',
  },
  SizeImage: {
    id: `UpdateMotel.containers.SizeImage`,
    defaultMessage: 'Kích thước ảnh phải dưới 2MB',
  },
});
