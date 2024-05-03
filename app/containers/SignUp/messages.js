/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'SignUp.containers';

export default defineMessages({
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
    email: {
        id: `${scope}.email`,
        defaultMessage: 'Vui lòng nhập email',
    },
    password: {
        id: `${scope}.password`,
        defaultMessage: 'Mật khẩu không hợp lệ, mật khẩu phải có ít nhất 6 ký tự',
    },
    requiredPassword: {
        id: `${scope}.requiredPassword`,
        defaultMessage: 'Vui lòng nhập mật khẩu',
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
    passwordenter: {
        id: `${scope}.passwordenter`,
        defaultMessage: 'Nhập mật khẩu',
    },
    requiredPasswordenter: {
        id: `${scope}.requiredPasswordenter`,
        defaultMessage: 'Nhập lại mật khẩu',
    },
    matchesPassword: {
        id: `${scope}.matchesPassword`,
        defaultMessage: 'Mật khẩu không hợp lệ',
    },
    Chooseaccount: {
        id: `${scope}.Chooseaccount`,
        defaultMessage: 'Chọn một loại tài khoản',
    },
    host: {
        id: `${scope}.host`,
        defaultMessage: 'Chủ Trọ',
    },
    findroom: {
        id: `${scope}.findroom`,
        defaultMessage: 'Tìm Phòng',
    },
    hello: {
        id: `${scope}.hello`,
        defaultMessage: 'Xin chào!',
    },
    completetheform: {
        id: `${scope}.completetheform`,
        defaultMessage: 'Vui lòng điền vào form bên dưới để bắt đầu',
    },
    emailphoneError: {
        id: `${scope}.emailphoneError`,
        defaultMessage: 'Số điện thoại đã được đăng ký! Hay Email đã đăng ký',
    },
    Haveaccount: {
        id: `${scope}.Haveaccount`,
        defaultMessage: 'Có tài khoản',
    },
    login: {
        id: `${scope}.login`,
        defaultMessage: 'Đăng nhập',
    },
    CreateAccount: {
        id: `${scope}.CreateAccount`,
        defaultMessage: 'Tạo tài khoản',
    },


});