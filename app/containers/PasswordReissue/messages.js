/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'PasswordReissue.containers';

export default defineMessages({
    ErrorCode: {
        id: `${scope}.ErrorCode`,
        defaultMessage: 'Vui lòng nhập mã xác nhận',
    },
    ErrorPW: {
        id: `${scope}.ErrorPW`,
        defaultMessage: 'Mật khẩu không hợp lệ, mật khẩu phải có ít nhất 6 ký tự',
    },
    ErrorPW1: {
        id: `${scope}.ErrorPW1`,
        defaultMessage: 'Vui lòng nhập mật khẩu',
    },
    ErrorPW2: {
        id: `${scope}.ErrorPW2`,
        defaultMessage: 'Mật khẩu không hợp lệ',
    },
    ErrorPWConfig: {
        id: `${scope}.ErrorPWConfig`,
        defaultMessage: 'Mật khẩu không đúng',
    },
    ErrorPWConfig1: {
        id: `${scope}.ErrorPWConfig1`,
        defaultMessage: 'Vui lòng nhập lại mật khẩu của bạn',
    },
    ReissuePW: {
        id: `${scope}.ReissuePW`,
        defaultMessage: 'Cấp lại mật khẩu',
    },
    Verification: {
        id: `${scope}.Verification`,
        defaultMessage: 'Mã xác nhận',
    },
    Password: {
        id: `${scope}.Password`,
        defaultMessage: 'Mật khẩu',
    },
    EnterPassword: {
        id: `${scope}.EnterPassword`,
        defaultMessage: 'Nhập lại mật khẩu',
    },
    IncorrectCode: {
        id: `${scope}.IncorrectCode`,
        defaultMessage: 'Mã Xác Nhận Không Đúng!',
    },
    Success: {
        id: `${scope}.Success`,
        defaultMessage: 'Thành Công',
    },
    Send: {
        id: `${scope}.Send`,
        defaultMessage: 'Gửi',
    },

});