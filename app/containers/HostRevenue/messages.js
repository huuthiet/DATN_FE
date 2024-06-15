/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { Cancel, Send } from '@material-ui/icons';
import { defineMessages } from 'react-intl';

export const scope = 'HostRevenue.containers';

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
    Withdraw: {
        id: `${scope}.Withdraw`,
        defaultMessage: 'Gửi yêu cầu rút tiền',
    },
    Bank: {
        id: `${scope}.Bank`,
        defaultMessage: 'Ngân hàng',
    },
    BankAccount: {
        id: `${scope}.BankAccount`,
        defaultMessage: 'Số tài khoản',
    },
    AmountToWithdraw: {
        id: `${scope}.AmountToWithdraw`,
        defaultMessage: 'Số tiền cần rút',
    },
    Note: {
        id: `${scope}.Note`,
        defaultMessage: 'Ghi chú',
    },
    Cancel: {
        id: `${scope}.Cancel`,
        defaultMessage: 'Hủy',
    },
    Send: {
        id: `${scope}.Send`,
        defaultMessage: 'Gửi yêu cầu',
    },
    Total: {
        id: `${scope}.Total`,
        defaultMessage: 'Tổng',
    },
    TotalRoomPrice: {
        id: `${scope}.TotalRoomPrice`,
        defaultMessage: 'Tổng tiền phòng',
    },
    RemainingRevenue: {
        id: `${scope}.RemainingRevenue`,
        defaultMessage: 'Doanh thu còn lại',
    },
    Revenue: {
        id: `${scope}.Revenue`,
        defaultMessage: 'Doanh thu',
    },
    CurrentMonth: {
        id: `${scope}.CurrentMonth`,
        defaultMessage: 'Doanh thu tháng hiện tại',
    },
    Electric: {
        id: `${scope}.Electric`,
        defaultMessage: 'Tiền điện tháng này',
    },
    NoData: {
        id: `${scope}.NoData`,
        defaultMessage: 'Không có dữ liệu',
    },
});
