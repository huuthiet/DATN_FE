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
    defaultMessage: 'Cập Nhật Thông Tin',
  },
  addBank: {
    id: `${scope}.addBank`,
    defaultMessage: 'Thêm thông tin tài khoản ngân hàng',
  },
  stk: {
    id: `${scope}.stk`,
    defaultMessage: 'Vui lòng nhập Số Tài Khoản',
  },
  nameTk: {
    id: `${scope}.nameTk`,
    defaultMessage: 'Vui lòng nhập Tên Tài Khoản',
  },
  bank: {
    id: `${scope}.bank`,
    defaultMessage: 'Vui lòng chọn Ngân Hàng',
  },
  branch: {
    id: `${scope}.branch`,
    defaultMessage: 'Vui lòng chọn Chi Nhánh',
  },
  imgBank: {
    id: `${scope}.imgBank`,
    defaultMessage: 'Hình ảnh Chuyển Khoản',
  },
  SizeImage: {
    id: `UpdateMotel.containers.SizeImage`,
    defaultMessage: 'Kích thước ảnh phải dưới 2MB',
  },
});
