/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import {
  defineMessages
} from 'react-intl';

export const scope = 'WithdrawalRequest.containers';

export default defineMessages({
  Header: {
    id: `${scope}.Header`,
    defaultMessage: 'Quản lý yêu cầu rút tiền',
  },
  Accept: {
    id: `${scope}.Accept`,
    defaultMessage: 'Chấp nhận',
  },
  Reject: {
    id: `${scope}.Reject`,
    defaultMessage: 'Từ chối',
  },
  STT: {
    id: `${scope}.STT`,
    defaultMessage: 'STT',
  },
  KeyPayment: {
    id: `${scope}.KeyPayment`,
    defaultMessage: 'Mã giao dịch',
  },
  BankName: {
    id: `${scope}.BankName`,
    defaultMessage: 'Ngân hàng',
  },
  AccountNumber: {
    id: `${scope}.AccountNumber`,
    defaultMessage: 'Số tài khoản',
  },
  AccountName: {
    id: `${scope}.AccountName`,
    defaultMessage: 'Tên tài khoản',
  },
  Amount: {
    id: `${scope}.Amount`,
    defaultMessage: 'Số tiền',
  },
  Time: {
    id: `${scope}.Time`,
    defaultMessage: 'Thời gian',
  },
  PaymentMethod: {
    id: `${scope}.PaymentMethod`,
    defaultMessage: 'Phương thức thanh toán',
  },
  BuildingName: {
    id: `${scope}.BuildingName`,
    defaultMessage: 'Tên tòa nhà',
  },
  Description: {
    id: `${scope}.Description`,
    defaultMessage: 'Mô tả',
  },
  Note: {
    id: `${scope}.Note`,
    defaultMessage: 'Ghi chú từ người dùng',
  },
  Status: {
    id: `${scope}.Status`,
    defaultMessage: 'Trạng thái',
  },
  UNC: {
    id: `${scope}.UNC`,
    defaultMessage: 'Minh chứng',
  },
  UploadUNC: {
    id: `${scope}.UploadUNC`,
    defaultMessage: 'Tải lên minh chứng',
  },
  Waiting: {
    id: `${scope}.Waiting`,
    defaultMessage: 'Chờ xác nhận',
  },
  Accepted: {
    id: `${scope}.Accepted`,
    defaultMessage: 'Đã được duyệt',
  },
  Rejected: {
    id: `${scope}.Rejected`,
    defaultMessage: 'Đã bị từ chối',
  },
  ConfirmReject: {
    id: `${scope}.ConfirmReject`,
    defaultMessage: 'Xác nhận từ chối?',
  },
  ConfirmAccept: {
    id: `${scope}.ConfirmAccept`,
    defaultMessage: 'Xác nhận chấp nhận?',
  },
  RejectSuccess: {
    id: `${scope}.RejectSuccess`,
    defaultMessage: 'Từ chối thành công!',
  },
  AcceptSuccess: {
    id: `${scope}.AcceptSuccess`,
    defaultMessage: 'Chấp nhận thành công!',
  },
});
