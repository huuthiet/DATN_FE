/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'auth.containers';

export default defineMessages({
    logout: {
        id: `${scope}.logout`,
        defaultMessage: 'Đăng xuất',
    },
    login: {
        id: `${scope}.login`,
        defaultMessage: 'Đăng nhập',
    },
    sdt: {
        id: `${scope}.sdt`,
        defaultMessage: 'Số điện thoại',
    },
    entersdt: {
        id: `${scope}.entersdt`,
        defaultMessage: 'Nhập số điện thoại',
    },
    password: {
        id: `${scope}.password`,
        defaultMessage: 'Mật khẩu',
    },
    enterpassword: {
        id: `${scope}.enterpassword`,
        defaultMessage: 'Nhập mật khẩu',
    },
    unaccount: {
        id: `${scope}.unaccount`,
        defaultMessage: 'Bạn chưa có tài khoản?',
    },
    registration: {
        id: `${scope}.registration`,
        defaultMessage: 'Đăng ký',
    },
    forgotpass: {
        id: `${scope}.forgotpass`,
        defaultMessage: 'Bạn quên mật khẩu của mình!',
    },
    forgotpw: {
        id: `${scope}.forgotpw`,
        defaultMessage: 'Quên mật khẩu',
    },
    phoneMessage: {
        id: `${scope}.phoneMessage`,
        defaultMessage: 'Vui lòng nhập số điện thoại',
    },
    pwMessage: {
        id: `${scope}.pwMessage`,
        defaultMessage: 'Vui lòng nhập mật khẩu',
    },
    errorMessage: {
        id: `${scope}.errorMessage`,
        defaultMessage: 'Số điện thoại hoặc Mật khẩu không đúng',
    },

});