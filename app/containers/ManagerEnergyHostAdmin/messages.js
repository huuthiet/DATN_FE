/*
 * ManagerEnergyHostAdmin Messages
 *
 * This contains all the text for the ManagerEnergyHostAdmin container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'ManagerEnergyHostAdmin.containers';

export default defineMessages({
  Header: {
    id: `${scope}.Header`,
    defaultMessage: 'Quản lý điện năng các chủ trọ',
  },
  HostName: {
    id: `${scope}.HostName`,
    defaultMessage: 'Tên chủ trọ',
  },
  PhoneNumber: {
    id: `${scope}.PhoneNumber`,
    defaultMessage: 'Số điện thoại',
  },
  Detail: {
    id: `${scope}.Detail`,
    defaultMessage: 'Chi tiết',
  },
});
