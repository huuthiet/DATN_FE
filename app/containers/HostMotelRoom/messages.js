/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import {
  defineMessages
} from 'react-intl';

export const scope = 'HostMotelRoom.containers';

export default defineMessages({
  Header: {
    id: `${scope}.Header`,
    defaultMessage: 'Danh sách các chủ trọ',
  },
  STT: {
    id: `${scope}.STT`,
    defaultMessage: 'STT',
  },
  FullName: {
    id: `${scope}.FullName`,
    defaultMessage: 'Họ và tên',
  },
  PhoneNumber: {
    id: `${scope}.PhoneNumber`,
    defaultMessage: 'Số điện thoại',
  },
  PersonalInformation: {
    id: `${scope}.PersonalInformation`,
    defaultMessage: 'Thông tin cá nhân',
  },
  BuildingNumber: {
    id: `${scope}.BuildingNumber`,
    defaultMessage: 'Số tòa',
  },
  ListBuilding: {
    id: `${scope}.ListBuilding`,
    defaultMessage: 'Danh sách các tòa nhà',
  },
  Deposit: {
    id: `${scope}.Deposit`,
    defaultMessage: 'Quản lý tiền cọc',
  },
  WithdrawalsRequest: {
    id: `${scope}.WithdrawalsRequest`,
    defaultMessage: 'Quản lý yêu cầu rút tiền',
  },
  Revenue: {
    id: `${scope}.Revenue`,
    defaultMessage: 'Doanh thu',
  },
  Detail: {
    id: `${scope}.Detail`,
    defaultMessage: 'Chi tiết',
  },
});
