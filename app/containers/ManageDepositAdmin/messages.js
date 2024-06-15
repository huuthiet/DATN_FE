/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'ManageDepositAdmin.containers';

export default defineMessages({
  Header: {
    id: `${scope}.Header`,
    defaultMessage: 'Quản lý cọc',
  },
  STT: {
    id: `${scope}.STT`,
    defaultMessage: 'STT',
  },
  BuildingName: {
    id: `${scope}.BuildingName`,
    defaultMessage: 'Tên nhà trọ',
  },
  Address: {
    id: `${scope}.Address`,
    defaultMessage: 'Địa chỉ',
  },
  ManageDeposit: {
    id: `${scope}.ManageDeposit`,
    defaultMessage: 'Quản lý duyệt cọc',
  },
  ManageCheckInCost: {
    id: `${scope}.ManageCheckInCost`,
    defaultMessage: 'Duyệt thanh toán khi nhận phòng',
  },
  ManageBill: {
    id: `${scope}.ManageBill`,
    defaultMessage: 'Hóa đơn chờ thanh toán',
  },
  Detail: {
    id: `${scope}.Detail`,
    defaultMessage: 'Xem chi tiết',
  },
  RefundDeposit: {
    id: `${scope}.RefundDeposit`,
    defaultMessage: 'Quản lý hoàn cọc',
  },
  DepositHistory: {
    id: `${scope}.DepositHistory`,
    defaultMessage: 'Lịch sử cọc',
  },
});
