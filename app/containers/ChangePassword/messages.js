/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'ChangePassword.containers';

export default defineMessages({

    enterPWold: {
        id: `${scope}.enterPWold`,
        defaultMessage: 'Vui lòng nhập mật khẩu cũ'
    },
    enterPWoldNew: {
        id: `${scope}.enterPWoldNew`,
        defaultMessage: 'Vui lòng nhập mật khẩu mới'
    },
    password: {
        id: `${scope}.password`,
        defaultMessage: 'Mật khẩu không hợp lệ, mật khẩu phải có ít nhất 6 ký tự',
    },
    requiredPassword: {
        id: `${scope}.requiredPassword`,
        defaultMessage: 'Vui lòng nhập mật khẩu',
    },
    matchesPassword: {
        id: `${scope}.matchesPassword`,
        defaultMessage: 'Mật khẩu không hợp lệ',
    },
    changePassword: {
        id: `${scope}.changePassword`,
        defaultMessage: 'Thay đổi mật khẩu',
    },
    IncorrectOldPassword: {
        id: `${scope}.IncorrectOldPassword`,
        defaultMessage: 'Mật khẩu cũ không chính xác!',
    },
    send: {
        id: `${scope}.send`,
        defaultMessage: 'Gửi',
    },
    doesNotPassWord: {
        id: `${scope}.doesNotPassWord`,
        defaultMessage: 'Mật khẩu không trùng khớp!',
    },

});