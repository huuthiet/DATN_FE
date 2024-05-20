/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { Wifi } from '@material-ui/icons';
import { defineMessages } from 'react-intl';

export const scope = 'CreateRoom.containers';
export const scopeCreateModel = 'CreateMotel.containers';

export default defineMessages({
  wifiPrice: {
    id: `${scopeCreateModel}.wifiPrice`,
    defaultMessage: 'Giá xe',
  },
  garbagePrice: {
    id: `${scopeCreateModel}.garbagePrice`,
    defaultMessage: 'Phí Dịch Vụ',
  },
  available: {
    id: `${scope}.available`,
    defaultMessage: 'Còn trống',
  },
  rented: {
    id: `${scope}.rented`,
    defaultMessage: 'Đã Thuê',
  },
  unknown: {
    id: `${scope}.unknown`,
    defaultMessage: 'Không có phòng',
  },
  deposited: {
    id: `${scope}.deposited`,
    defaultMessage: 'Đã đặt cọc',
  },
  CreateNewRoom: {
    id: `${scope}.CreateNewRoom`,
    defaultMessage: 'Tạo phòng mới',
  },
  NameRoom: {
    id: `${scope}.NameRoom`,
    defaultMessage: 'Tên phòng',
  },
  AcreageRoom: {
    id: `${scope}.AcreageRoom`,
    defaultMessage: 'Diện tích phòng',
  },
  PriceName: {
    id: `${scope}.PriceName`,
    defaultMessage: 'Giá phòng',
  },
  electricityPrice: {
    id: `${scope}.electricityPrice`,
    defaultMessage: 'Giá điện',
  },
  waterPrice: {
    id: `${scope}.waterPrice`,
    defaultMessage: 'Giá nước',
  },
  MultipleImage: {
    id: `${scope}.MultipleImage`,
    defaultMessage: '',
  },
  ImageUpload: {
    id: `${scope}.ImageUpload`,
    defaultMessage: 'Upload Hình',
  },
  MinMonthRented: {
    id: `${scope}.MinMonthRented`,
    defaultMessage: 'Số Tháng Tối Thiểu Thuê',
  },
  CheckInDate: {
    id: `${scope}.CheckInDate`,
    defaultMessage: 'Ngày nhận phòng',
  },
  ErrTotalSizeImage: {
    id: `${scope}.ErrTotalSizeImage`,
    defaultMessage: 'Tổng kích thước các ảnh dưới 4mb',
  },
  ListRoomAcc: {
    id: `${scope}.ListRoomAcc`,
    defaultMessage: 'Danh sách cơ sở vật chất trong phòng',
  },
  washingDrying: {
    id: `${scope}.washingDrying`,
    defaultMessage: 'Giặt và sấy khô',
  },
  parkingLot: {
    id: `${scope}.parkingLot`,
    defaultMessage: 'Bãi đậu xe',
  },
  television: {
    id: `${scope}.television`,
    defaultMessage: 'Truyền hình',
  },
  AirConditioner: {
    id: `${scope}.AirConditioner`,
    defaultMessage: 'Máy điều hòa',
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
  wifi: {
    id: `${scope}.wifi`,
    defaultMessage: 'Wifi',
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
    defaultMessage: 'Vòi sen',
  },
  FreeTime: {
    id: `${scope}.FreeTime`,
    defaultMessage: 'Giờ giấc tự do',
  },
  PrivateEntrance: {
    id: `${scope}.PrivateEntrance`,
    defaultMessage: 'Lối vào riêng',
  },
  AddRoom: {
    id: `${scope}.AddRoom`,
    defaultMessage: 'Thêm phòng',
  },
  UpdateRoom: {
    id: `${scope}.UpdateRoom`,
    defaultMessage: 'Cập nhật',
  },
  AutoUpdate: {
    id: `${scope}.AutoUpdate`,
    defaultMessage: 'Tự động cập nhật',
  },
  AdditionalDescription: {
    id: `${scope}.AdditionalDescription`,
    defaultMessage: 'Mô tả thêm',
  },
  Furniture: {
    id: `${scope}.Furniture`,
    defaultMessage: 'Nội thất',
  },
  Price: {
    id: `${scope}.Price`,
    defaultMessage: 'Giá Tiền:',
  },
  ElectricPrice: {
    id: `${scope}.ElectricPrice`,
    defaultMessage: 'Giá điện',
  },
  WaterPrice: {
    id: `${scope}.WaterPrice`,
    defaultMessage: 'Giá nước',
  },
  WifiPrice: {
    id: `${scope}.WifiPrice`,
    defaultMessage: 'Giá wifi',
  },
  GarbagePrice: {
    id: `${scope}.GarbagePrice`,
    defaultMessage: 'Dịch vụ',
  },
  DepositPrice: {
    id: `${scope}.DepositPrice`,
    defaultMessage: 'Tiền Đặt Cọc',
  },
  MinimumMonth: {
    id: `${scope}.MinimumMonth`,
    defaultMessage: 'Số tháng thuê tối thiểu: ',
  },
  Information: {
    id: `${scope}.Information`,
    defaultMessage: 'THÔNG TIN PHÒNG',
  },
  Utilities: {
    id: `${scope}.Utilities`,
    defaultMessage: 'Tiện ích',
  },
  Deposit: {
    id: `${scope}.Deposit`,
    defaultMessage: 'Đặt cọc',
  },
  ErrPopup: {
    id: `${scope}.ErrPopup`,
    defaultMessage: 'Bạn Muốn Xóa Phòng Này',
  },
  // edit
  EditRoom: {
    id: `${scope}.EditRoom`,
    defaultMessage: 'Chỉnh sửa',
  },
  // delete
  DeleteRoom: {
    id: `${scope}.DeleteRoom`,
    defaultMessage: 'Xóa phòng',
  },
});
