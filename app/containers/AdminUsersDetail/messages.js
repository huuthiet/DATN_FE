/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';
export const scopeSignUp = 'SignUp.containers';

export const scope = 'AdminUsersDetail.containers';
export const scopeUpdate = 'profileUpdate.containers';

export default defineMessages({
  UpdateProfile: {
    id: `${scope}.UpdateProfile`,
    defaultMessage: 'Cập nhật thông tin',
  },
  uploadAvata: {
    id: `${scopeUpdate}.uploadAvata`,
    defaultMessage: 'Tải ảnh đại diện',
  },
  frontId: {
    id: `${scopeUpdate}.frontId`,
    defaultMessage: 'Tải ảnh mặt trước',
  },
  backId: {
    id: `${scopeUpdate}.backId`,
    defaultMessage: 'Tải ảnh mặt sau',
  },
  dob: {
    id: `${scopeSignUp}.dob`,
    defaultMessage: 'Vui lòng nhập ngày sinh',
  },
  dobMax: {
    id: `${scopeUpdate}.dobMax`,
    defaultMessage: 'Vui lòng nhập ngày sinh > 18 ',
  },

  female: {
    id: `${scopeUpdate}.female`,
    defaultMessage: 'Nữ',
  },
  gender: {
    id: `${scopeSignUp}.gender`,
    defaultMessage: 'Vui lòng nhập giới tính',
  },
  male: {
    id: `${scopeUpdate}.male`,
    defaultMessage: 'Nam',
  },
  Other: {
    id: `${scopeUpdate}.Other`,
    defaultMessage: 'Khác',
  },

  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'Vui lòng nhập tên',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Vui lòng nhập họ',
  },
  phoneNumber: {
    id: `${scope}.phoneNumber`,
    defaultMessage: 'Vui lòng nhập số điện thoại',
  },
  address: {
    id: `${scopeSignUp}.address`,
    defaultMessage: 'Vui lòng nhập địa chỉ',
  },
  nationalId: {
    id: `${scopeSignUp}.nationalId`,
    defaultMessage: 'Vui lòng nhập CCCD',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Vui lòng nhập email',
  },
  idDevice: {
    id: `${scope}.idDevice`,
    defaultMessage: 'Mã số đồng hồ điện',
  },
  firstNameenter: {
    id: `${scope}.firstNameenter`,
    defaultMessage: 'Nhập tên',
  },
  lastNameenter: {
    id: `${scope}.lastNameenter`,
    defaultMessage: 'Nhập họ',
  },
  phoneNumberenter: {
    id: `${scope}.phoneNumberenter`,
    defaultMessage: 'Nhập số điện thoại',
  },
  emailenter: {
    id: `${scope}.emailenter`,
    defaultMessage: 'Nhập email',
  },
});
