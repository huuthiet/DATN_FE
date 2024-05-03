/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'ForgotPassword.containers';

export default defineMessages({
    errorMessage: {
        id: `${scope}.errorMessage`,
        defaultMessage: 'Số điện thoại hoặc Mật khẩu không đúng',
    },
    EmailMessage: {
        id: `${scope}.EmailMessage`,
        defaultMessage: 'Vui lòng nhập email của bạn để gửi mã xác nhận',
    },
    ForgotPassword: {
        id: `${scope}.ForgotPassword`,
        defaultMessage: 'Quên mật khẩu',
    },
    enterEmailCode: {
        id: `${scope}.enterEmailCode`,
        defaultMessage: 'Nhập email của bạn để nhận mã xác nhận',
    },
    emailnotexists: {
        id: `${scope}.emailnotexists`,
        defaultMessage: 'Email không tồn tại!',
    },
    send: {
        id: `${scope}.send`,
        defaultMessage: 'Gửi',
    },

});