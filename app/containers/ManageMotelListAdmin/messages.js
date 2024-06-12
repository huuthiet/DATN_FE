/*
 * export const scope = 'ManageMotelListAdmin.containers';
 Messages
 *
 * This contains all the text for the export const scope = 'ManageMotelListAdmin.containers';
 container.
 */
import { Delete } from '@material-ui/icons';
import { defineMessages } from 'react-intl';

export const scope = 'ManageMotelListAdmin.containers';

export default defineMessages({
  Header: {
    id: `${scope}.Header`,
    defaultMessage: 'Quản lý các tòa nhà',
  },
  STT: {
    id: `${scope}.STT`,
    defaultMessage: 'STT',
  },
  HostName: {
    id: `${scope}.HostName`,
    defaultMessage: 'Tên chủ nhà: ',
  },
  BuildingName: {
    id: `${scope}.BuildingName`,
    defaultMessage: 'Tên tòa nhà',
  },
  BuildingImage: {
    id: `${scope}.BuildingImage`,
    defaultMessage: 'Hình ảnh',
  },
  Address: {
    id: `${scope}.Address`,
    defaultMessage: 'Địa chỉ',
  },
  RoomQuantity: {
    id: `${scope}.RoomQuantity`,
    defaultMessage: 'Số phòng',
  },
  Rented: {
    id: `${scope}.Rented`,
    defaultMessage: 'Đã thuê',
  },
  Deposited: {
    id: `${scope}.Deposited`,
    defaultMessage: 'Đã cọc',
  },
  RoomList: {
    id: `${scope}.RoomList`,
    defaultMessage: 'Danh sách các phòng',
  },
  DeleteBuilding: {
    id: `${scope}.DeleteBuilding`,
    defaultMessage: 'Xóa tòa nhà',
  },
  Delete: {
    id: `${scope}.Delete`,
    defaultMessage: 'Xóa',
  },
  Detail: {
    id: `${scope}.Detail`,
    defaultMessage: 'Xem chi tiết',
  },
  ConfirmDeleteBuilding: {
    id: `${scope}.ConfirmDeleteBuilding`,
    defaultMessage: 'Bạn có chắc chắn muốn xóa tòa nhà này không?',
  },
});
