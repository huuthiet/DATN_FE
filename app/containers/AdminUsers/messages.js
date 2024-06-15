/*
 * AdminUsers Messages
 *
 * This contains all the text for the AdminUsers container.
 */
import { Wifi } from '@material-ui/icons';
import { defineMessages } from 'react-intl';

export const scope = 'AdminUsers.containers';
export const scopeCreateModel = 'AdminUsers.containers';

export default defineMessages({
  Header: {
    id: `${scope}.Header`,
    defaultMessage: 'Quản lý người dùng',
  },
  STT: {
    id: `${scope}.STT`,
    defaultMessage: 'STT',
  },
  FullName: {
    id: `${scope}.FullName`,
    defaultMessage: 'Họ và tên',
  },
  Email: {
    id: `${scope}.Email`,
    defaultMessage: 'Email',
  },
  PhoneNumber: {
    id: `${scope}.PhoneNumber`,
    defaultMessage: 'Số điện thoại',
  },
  Permission: {
    id: `${scope}.Permission`,
    defaultMessage: 'Quyền',
  },
  Action: {
    id: `${scope}.Action`,
    defaultMessage: 'Thao tác',
  },
  DeleteSuccess: {
    id: `${scope}.DeleteSuccess`,
    defaultMessage: 'Xóa thành công',
  },
  UpdateSuccess: {
    id: `${scope}.UpdateSuccess`,
    defaultMessage: 'Cập nhật thành công',
  },
  ConfirmDelete: {
    id: `${scope}.ConfirmDelete`,
    defaultMessage: 'Bạn có chắc chắn muốn xóa?',
  },
  ConfirmResetPassword: {
    id: `${scope}.ConfirmResetPassword`,
    defaultMessage: 'Bạn có chắc chắn muốn reset mật khẩu?',
  },
  UpdateProfile: {
    id: `${scope}.UpdateProfile`,
    defaultMessage: 'Cập nhật thông tin',
  },
  RoomDetail: {
    id: `${scope}.RoomDetail`,
    defaultMessage: 'Chi tiết phòng',
  },
  DeleteProfile: {
    id: `${scope}.DeleteProfile`,
    defaultMessage: 'Xóa tài khoản',
  },
  ResetPassword: {
    id: `${scope}.ResetPassword`,
    defaultMessage: 'Đặt lại mật khẩu',
  },

});
