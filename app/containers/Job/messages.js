/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'Job.containers';

export default defineMessages({
  ErrrCheckInDate: {
    id: `${scope}.ErrrCheckInDate`,
    defaultMessage: 'Vui lòng chọn ngày nhận phòng',
  },
  ErrrFullName: {
    id: `${scope}.ErrrFullName`,
    defaultMessage: 'Vui lòng nhập tên đầy đủ',
  },
  ErrrPhone: {
    id: `${scope}.ErrrPhone`,
    defaultMessage: 'Vui lòng nhập số điện thoại',
  },
  ErrrMonth: {
    id: `${scope}.ErrrMonth`,
    defaultMessage: 'Vui lòng nhập số tháng thuê',
  },
  ErrrPayment: {
    id: `${scope}.ErrrPayment`,
    defaultMessage: 'Vui lòng chọn hình thức thanh toán',
  },
  InternalWallet: {
    id: `${scope}.InternalWallet`,
    defaultMessage: 'Ví nội bộ',
  },
  InternalCash: {
    id: `${scope}.InternalCash`,
    defaultMessage: 'Tiền mặt',
  },
  AmountOfMoney: {
    id: `${scope}.AmountOfMoney`,
    defaultMessage: 'Số tiền: ',
  },
  AmountOfMoneyDec: {
    id: `${scope}.AmountOfMoneyDec`,
    defaultMessage:
      ' Sẽ trừ nó vào ví của bạn, bạn có thực sự muốn thanh toán không?',
  },
  AmountOfMoneyTransfer: {
    id: `${scope}.AmountOfMoneyTransfer`,
    defaultMessage: 'Vui lòng chọn tên ngân hàng để thực hiện chuyển tiền!',
  },
  Accept: {
    id: `${scope}.Accept`,
    defaultMessage: 'Chấp Nhận',
  },
  Cancel: {
    id: `${scope}.Cancel`,
    defaultMessage: 'Hủy',
  },
  CheckinDate: {
    id: `${scope}.CheckinDate`,
    defaultMessage: 'Ngày nhận phòng',
  },
  PeopleRomSet: {
    id: `${scope}.PeopleRomSet`,
    defaultMessage: 'Người đặt phòng',
  },
  FullName: {
    id: `${scope}.FullName`,
    defaultMessage: 'Nhập tên đầy đủ...',
  },
  Phone: {
    id: `${scope}.Phone`,
    defaultMessage: 'Số điện thoại',
  },
  EnterPhone: {
    id: `${scope}.EnterPhone`,
    defaultMessage: 'Nhập số điện thoại...',
  },
  PriceRentedMonth: {
    id: `${scope}.PriceRentedMonth`,
    defaultMessage: 'Giá thuê một tháng',
  },
  RentalContract: {
    id: `${scope}.RentalContract`,
    defaultMessage: 'Hợp đồng cho thuê: Số Tháng',
  },
  BondMoney: {
    id: `${scope}.BondMoney`,
    defaultMessage: 'Tiền thế chân tài sản',
  },
  TotalMoney: {
    id: `${scope}.TotalMoney`,
    defaultMessage: 'Tổng tiền',
  },
  Deposited: {
    id: `${scope}.Deposited`,
    defaultMessage: 'Tiền cọc giữ phòng',
  },
  PaymentUponCheckIn: {
    id: `${scope}.PaymentUponCheckIn`,
    defaultMessage: 'Thanh toán khi nhận phòng',
  },
  BlankFromDate: {
    id: `${scope}.BlankFromDate`,
    defaultMessage: 'Trống từ ngày',
  },
  Finish: {
    id: `${scope}.Finish`,
    defaultMessage: 'Hoàn thành',
  },
  DC: {
    id: `${scope}.DC`,
    defaultMessage: 'ĐẶT CỌC',
  },
});
