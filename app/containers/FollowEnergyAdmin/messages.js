/*
 * FollowEnergyAdmin Messages
 *
 * This contains all the text for the FollowEnergyAdmin container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'FollowEnergyAdmin.containers';
export const scopeCreateModel = 'FollowEnergyAdmin.containers';
export default defineMessages({
  Header: {
    id: `${scope}.Header`,
    defaultMessage: 'Theo dõi điện năng',
  },
  RoomName: {
    id: `${scope}.RoomName`,
    defaultMessage: 'Tên phòng: ',
  },
  OneDay: {
    id: `${scope}.OneDay`,
    defaultMessage: '1 ngày',
  },
  OneMonth: {
    id: `${scope}.OneMonth`,
    defaultMessage: '1 tháng',
  },
  Export: {
    id: `${scope}.Export`,
    defaultMessage: 'Xuất file',
  },
  Download: {
    id: `${scope}.Download`,
    defaultMessage: 'Tải xuống',
  },
  Cancel: {
    id: `${scope}.Cancel`,
    defaultMessage: 'Hủy',
  },
  DateAlert: {
    id: `${scope}.DateAlert`,
    defaultMessage: 'Vui lòng nhập ngày kết thúc lớn hơn ngày bắt đầu!',
  },
  TotalElectric: {
    id: `${scope}.TotalElectric`,
    defaultMessage: 'Tổng hợp thông tin',
  },
  TotalWater: {
    id: `${scope}.TotalWater`,
    defaultMessage: 'Số nước: ',
  },
  TotalElectricUsage: {
    id: `${scope}.TotalElectricUsage`,
    defaultMessage: 'Số điện: ',
  },
  NoData: {
    id: `${scope}.NoData`,
    defaultMessage: 'Không có dữ liệu',
  },
  Total: {
    id: `${scope}.Total`,
    defaultMessage: 'Tổng: ',
  },
  ElectricUsageDetail: {
    id: `${scope}.ElectricUsageDetail`,
    defaultMessage: 'Chi tiết tiêu thụ điện',
  },
  Time: {
    id: `${scope}.Time`,
    defaultMessage: 'Thời gian',
  },
  ElectricUsage: {
    id: `${scope}.ElectricUsage`,
    defaultMessage: 'Số điện (kWh)',
  },
  WaterUsage: {
    id: `${scope}.WaterUsage`,
    defaultMessage: 'Số nước (m3)',
  },
  TotalCost: {
    id: `${scope}.TotalCost`,
    defaultMessage: 'Thành tiền (VND)',
  },

});
