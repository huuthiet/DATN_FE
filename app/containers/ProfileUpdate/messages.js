/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'profileUpdate.containers';
export const scopeSignUp = 'SignUp.containers';

export default defineMessages({
  profile: {
    id: `${scope}.profile`,
    defaultMessage: 'Thông tin cá nhân',
  },
  update: {
    id: `${scope}.update`,
    defaultMessage: 'Cập nhật',
  },
  female: {
    id: `${scope}.female`,
    defaultMessage: 'Nữ',
  },
  male: {
    id: `${scope}.male`,
    defaultMessage: 'Nam',
  },
  Other: {
    id: `${scope}.Other`,
    defaultMessage: 'Khác',
  },

  uploadAvata: {
    id: `${scope}.uploadAvata`,
    defaultMessage: 'Tải Ảnh Avatar',
  },
  frontId: {
    id: `${scope}.frontId`,
    defaultMessage: 'Tải Ảnh Mặt Trước',
  },
  backId: {
    id: `${scope}.backId`,
    defaultMessage: 'Tải Ảnh Mặt Sau',
  },

  firstName: {
    id: `${scopeSignUp}.firstName`,
    defaultMessage: 'Vui lòng nhập tên',
  },
  lastName: {
    id: `${scopeSignUp}.lastName`,
    defaultMessage: 'Vui lòng nhập họ',
  },
  gender: {
    id: `${scopeSignUp}.gender`,
    defaultMessage: 'Vui lòng nhập giới tính',
  },
  address: {
    id: `${scopeSignUp}.address`,
    defaultMessage: 'Vui lòng nhập địa chỉ',
  },
  nationalId: {
    id: `${scopeSignUp}.nationalId`,
    defaultMessage: 'Vui lòng nhập CMND',
  },
  dob: {
    id: `${scopeSignUp}.dob`,
    defaultMessage: 'Vui lòng nhập ngày sinh',
  },
  dobMax: {
    id: `${scope}.dobMax`,
    defaultMessage: 'Vui lòng nhập ngày sinh > 18 ',
  },
  phoneNumber: {
    id: `${scopeSignUp}.phoneNumber`,
    defaultMessage: 'Vui lòng nhập số điện thoại',
  },
  email: {
    id: `${scopeSignUp}.email`,
    defaultMessage: 'Vui lòng nhập email',
  },
  password: {
    id: `${scopeSignUp}.password`,
    defaultMessage: 'Mật khẩu không hợp lệ, mật khẩu phải có ít nhất 6 ký tự',
  },
  requiredPassword: {
    id: `${scopeSignUp}.requiredPassword`,
    defaultMessage: 'Vui lòng nhập mật khẩu',
  },
  firstNameenter: {
    id: `${scopeSignUp}.firstNameenter`,
    defaultMessage: 'Nhập tên',
  },
  lastNameenter: {
    id: `${scopeSignUp}.lastNameenter`,
    defaultMessage: 'Nhập họ',
  },
  phoneNumberenter: {
    id: `${scopeSignUp}.phoneNumberenter`,
    defaultMessage: 'Nhập số điện thoại',
  },
  emailenter: {
    id: `${scopeSignUp}.emailenter`,
    defaultMessage: 'Nhập email',
  },
  passwordenter: {
    id: `${scopeSignUp}.passwordenter`,
    defaultMessage: 'Nhập mật khẩu',
  },
  requiredPasswordenter: {
    id: `${scopeSignUp}.requiredPasswordenter`,
    defaultMessage: 'Nhập lại mật khẩu',
  },
  matchesPassword: {
    id: `${scopeSignUp}.matchesPassword`,
    defaultMessage: 'Mật khẩu không hợp lệ',
  },
});
