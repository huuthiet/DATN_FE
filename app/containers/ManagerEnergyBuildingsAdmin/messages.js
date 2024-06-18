/*
 * ManagerEnergyBuildingAdmin Messages
 *
 * This contains all the text for the ManagerEnergyBuildingAdmin container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'ManagerEnergyBuildingAdmin.containers';

export default defineMessages({
  Header: {
    id: `${scope}.Header`,
    defaultMessage: 'Quản lý điện năng các tòa nhà',
  },
  Detail: {
    id: `${scope}.Detail`,
    defaultMessage: 'Xem chi tiết',
  },
  HostName: {
    id: `${scope}.HostName`,
    defaultMessage: 'Tên chủ trọ: ',
  },
  NoData: {
    id: `${scope}.NoData`,
    defaultMessage: 'Không có dữ liệu',
  },
});
