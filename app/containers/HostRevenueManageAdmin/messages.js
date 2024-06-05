/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'HostRevenueManageAdmin.containers';

export default defineMessages({
    Header: {
        id: `${scope}.Header`,
        defaultMessage: 'Quản lý doanh thu',
    },
    Search: {
        id: `${scope}.Search`,
        defaultMessage: 'Tìm',
    },
    Export: {
        id: `${scope}.Export`,
        defaultMessage: 'Xuất',
    },
    ProcessWithdrawRequest: {
        id: `${scope}.ProcessWithdrawRequest`,
        defaultMessage: 'Xử lý yêu cầu rút tiền',
    },
});
