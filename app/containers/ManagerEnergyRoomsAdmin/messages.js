/*
 * ManagerEnergyRoomsAdmin Messages
 *
 * This contains all the text for the ManagerEnergyRoomsAdmin container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'ManagerEnergyRoomsAdmin.containers';
export const scopeCreateModel = 'ManagerEnergyRoomsAdmin.containers';
export default defineMessages({
  Header: {
    id: `${scope}.Header`,
    defaultMessage: 'Quản lý điện năng các phòng tòa',
  },
  RoomName: {
    id: `${scope}.RoomName`,
    defaultMessage: 'Tên phòng: ',
  },
  MeterQuantity: {
    id: `${scope}.MeterQuantity`,
    defaultMessage: 'Số lượng đồng hồ: ',
  },
  Detail: {
    id: `${scope}.Detail`,
    defaultMessage: 'Xem chi tiết',
  },
  EnergyHistory: {
    id: `${scope}.EnergyHistory`,
    defaultMessage: 'Lịch sử điện năng',
  },
  NoMeter: {
    id: `${scope}.NoMeter`,
    defaultMessage: 'Chưa có đồng hồ',
  },
});
