/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'profile.containers';

export default defineMessages({
  cancellation: {
    id: `${scope}.cancellation`,
    defaultMessage: 'Hủy đặt cọc',
  },
  cancellationtext: {
    id: `${scope}.cancellationtext`,
    defaultMessage:
      'Bạn sẽ mất tiền đặt cọc khi hủy! Bạn có thực sự muốn hủy không?',
  },
  profile: {
    id: `${scope}.profile`,
    defaultMessage: 'Thông tin cá nhân',
  },
  profileupdate: {
    id: `${scope}.profileupdate`,
    defaultMessage: 'Cập nhật thông tin',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Tên',
  },
  aboutmap: {
    id: `${scope}.aboutmap`,
    defaultMessage: 'Về bản đồ',
  },
  uploadAvata: {
    id: `${scope}.uploadAvata`,
    defaultMessage: 'Tải ảnh',
  },

  sdt: {
    id: `${scope}.sdt`,
    defaultMessage: 'Số điện thoại',
  },
  wallet: {
    id: `${scope}.wallet`,
    defaultMessage: 'Số dư trong ví',
  },
  addnew: {
    id: `${scope}.addnew`,
    defaultMessage: 'Thêm tòa nhà mới',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Chỉnh sửa',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Xóa',
  },
  empty: {
    id: `${scope}.empty`,
    defaultMessage: 'Danh sách trống',
  },
  //danh sách phòng đã thuê
  listroom: {
    id: `${scope}.listroom`,
    defaultMessage: 'Danh sách phòng đã thuê',
  },
  //danh sách các tòa nhà
  listbuilding: {
    id: `${scope}.listbuilding`,
    defaultMessage: 'Danh sách tòa nhà',
  },
  detelesuccess: {
    id: `${scope}.detelesuccess`,
    defaultMessage: 'Đã xoá thành công',
  },
  errorMessage: {
    id: `${scope}.errorMessage`,
    defaultMessage: 'Phòng đang cho thuê, không thể xóa!',
  },
  reallyMessage: {
    id: `${scope}.reallyMessage`,
    defaultMessage: 'Bạn có thực sự muốn xóa?',
  },
});
