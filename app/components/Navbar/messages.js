/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'navbar.containers';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Trang chủ',
  },
  managerHost: {
    id: `${scope}.managerHost`,
    defaultMessage: 'Quản lý điện năng các chủ trọ',
  },
  energyRoomsUser: {
    id: `${scope}.energyRoomsUser`,
    defaultMessage: 'Quản lý điện năng',
  },
  energyRoomsBillUser: {
    id: `${scope}.energyRoomsBillUser`,
    defaultMessage: 'Quản lý hóa đơn các phòng đã thuê',
  },
  energyManager: {
    id: `${scope}.energyManager`,
    defaultMessage: 'Quản lý điện năng các tòa',
  },
  energyManagerHost: {
    id: `${scope}.energyManagerHost`,
    defaultMessage: 'Quản lý tiền điện, nước',
  },
  energyRooms: {
    id: `${scope}.energyRooms`,
    defaultMessage: 'Quản lý điện năng các phòng',
  },

  energyUser: {
    id: `${scope}.energyUser`,
    defaultMessage: 'Quản lý điện năng tiêu thụ',
  },
  contact: {
    id: `${scope}.contact`,
    defaultMessage: 'Điều khoản',
  },
  about: {
    id: `${scope}.about`,
    defaultMessage: 'Giới thiệu',
  },
  hi: {
    id: `${scope}.hi`,
    defaultMessage: 'Xin chào',
  },
  infor: {
    id: `${scope}.infor`,
    defaultMessage: 'Thông tin cá nhân',
  },
  user: {
    id: `${scope}.user`,
    defaultMessage: 'Quản lý người dùng',
  },
  host: {
    id: `${scope}.host`,
    defaultMessage: 'Quản lý chủ trọ',
  },
  hostRoomRevenue: {
    id: `${scope}.hostRoomRevenue`,
    defaultMessage: 'Quản lý doanh thu',
  },
  hostRoomHist: {
    id: `${scope}.hostRoomHist`,
    defaultMessage: 'Quản lý tòa nhà',
  },
  acceptMotels: {
    id: `${scope}.acceptMotels`,
    defaultMessage: 'Kiểm duyệt tòa nhà',
  },
  acceptHosts: {
    id: `${scope}.acceptHosts`,
    defaultMessage: 'Kiểm duyệt chủ trọ',
  },
  billList: {
    id: `${scope}.billList`,
    defaultMessage: 'Danh Sách Hóa Đơn',
  },
  reportProblemList: {
    id: `${scope}.reportProblemList`,
    defaultMessage: 'Danh Sách Sự Cố',
  },

  roomManager: {
    id: `${scope}.roomManager`,
    defaultMessage: 'Quản lý phòng',
  },
  money: {
    id: `${scope}.money`,
    defaultMessage: 'Quản lý tài khoản ngân hàng',
  },
  orderPendingPayList: {
    id: `${scope}.orderPendingPayList`,
    defaultMessage: 'Hóa đơn chờ thanh toán',
  },
  payDeposits: {
    id: `${scope}.payDeposits`,
    defaultMessage: 'Danh sách trả cọc',
  },
  transactionPayment: {
    id: `${scope}.transactionPayment`,
    defaultMessage: 'Quản lý giao dịch',
  },
  LogtransactionPayment: {
    id: `${scope}.LogtransactionPayment`,
    defaultMessage: 'Nhật ký nạp tiền',
  },
  job: {
    id: `${scope}.job`,
    defaultMessage: 'Quản lý đơn hàng',
  },
  order: {
    id: `${scope}.order`,
    defaultMessage: 'Quản lý đặt cọc',
  },
  manageMonthly: {
    id: `${scope}.manageMonthly`,
    defaultMessage: 'Quản lý thanh toán hàng tháng',
  },
  monthlyOrder: {
    id: `${scope}.monthlyOrder`,
    defaultMessage: 'Quản lý thanh toán hằng tháng',
  },
  changepassword: {
    id: `${scope}.changepassword`,
    defaultMessage: 'Đổi mật khẩu',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Đăng xuất',
  },
  signin_signup: {
    id: `${scope}.signin_signup`,
    defaultMessage: 'Đăng nhập/Đăng ký',
  },
  agree: {
    id: `${scope}.agree`,
    defaultMessage: 'Đồng ý',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Hủy',
  },
  question_logout: {
    id: `${scope}.question_logout`,
    defaultMessage: 'Bạn thực sự muốn đăng xuất?',
  },
  search_location: {
    id: `${scope}.search_location`,
    defaultMessage: 'Tìm kiếm vị trí...',
  },
  filter: {
    id: `${scope}.filter`,
    defaultMessage: 'Filter',
  },
  utilities: {
    id: `${scope}.utilities`,
    defaultMessage: 'Tiện ích',
  },
  priceRange: {
    id: `${scope}.priceRange`,
    defaultMessage: 'Khoảng giá',
  },
  TransactionLog: {
    id: `${scope}.TransactionLog`,
    defaultMessage: 'Nhật ký giao dịch',
  },
  TransactionBankingCashLog: {
    id: `${scope}.TransactionBankingCashLog`,
    defaultMessage: 'Nhật ký giao dịch',
  },
  addMoney: {
    id: `${scope}.addMoney`,
    defaultMessage: 'Nạp tiền',
  },
  withdrawPayment: {
    id: `${scope}.withdrawPayment`,
    defaultMessage: 'Quản lý yêu cầu rút tiền',
  },
  LogRequestWithdraw: {
    id: `${scope}.LogRequestWithdraw`,
    defaultMessage: 'Nhật Ký Rút Tiền',
  },
  withdraw: {
    id: `${scope}.withdraw`,
    defaultMessage: 'Rút tiền',
  },
  wallet: {
    id: `${scope}.wallet`,
    defaultMessage: 'Số dư',
  },
  washingDrying: {
    id: `${scope}.washingDrying`,
    defaultMessage: 'Giặt ủi',
  },
  parkingLot: {
    id: `${scope}.parkingLot`,
    defaultMessage: 'Giữ xe',
  },
  television: {
    id: `${scope}.television`,
    defaultMessage: 'Truyền hình',
  },
  AirConditioner: {
    id: `${scope}.AirConditioner`,
    defaultMessage: 'Điều hòa',
  },
  toiletBowl: {
    id: `${scope}.toiletBowl`,
    defaultMessage: 'Bồn cầu',
  },
  Mezzanine: {
    id: `${scope}.Mezzanine`,
    defaultMessage: 'Gác lửng',
  },
  washstand: {
    id: `${scope}.washstand`,
    defaultMessage: 'Bồn rửa mặt',
  },
  clearTheRoom: {
    id: `${scope}.clearTheRoom`,
    defaultMessage: 'Dọn phòng',
  },
  WoodFloor: {
    id: `${scope}.WoodFloor`,
    defaultMessage: 'Sàn gỗ',
  },
  Wardrobe: {
    id: `${scope}.Wardrobe`,
    defaultMessage: 'Tủ quần áo',
  },
  shower: {
    id: `${scope}.shower`,
    defaultMessage: 'Vòi hoa sen',
  },
  FreeTime: {
    id: `${scope}.FreeTime`,
    defaultMessage: 'Giờ giấc tự do',
  },
  PrivateEntrance: {
    id: `${scope}.PrivateEntrance`,
    defaultMessage: 'Lối đi riêng',
  },
  wifi: {
    id: `${scope}.wifi`,
    defaultMessage: 'Internet',
  },
  Accept: {
    id: `${scope}.Accept`,
    defaultMessage: 'Chấp Nhận',
  },
  Cancel: {
    id: `${scope}.Cancel`,
    defaultMessage: 'Hủy',
  },
  RangePrice: {
    id: `${scope}.RangePrice`,
    defaultMessage: 'Khoảng Giá',
  },
  MinPrice: {
    id: `${scope}.MinPrice`,
    defaultMessage: 'Giá nhỏ nhất',
  },
  MaxPrice: {
    id: `${scope}.MaxPrice`,
    defaultMessage: 'Giá lớn nhất',
  },
});
