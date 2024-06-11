/*
 * MapPage Messages
 *
 * This contains all the text for the MapPage container.
 */
import { Delete } from '@material-ui/icons';
import {
  defineMessages
} from 'react-intl';

export const scope = 'MoneyInformation.containers';

export default defineMessages({
  Header: {
    id: `${scope}.MoneyInformation.Header`,
    defaultMessage: 'Quản lý thông tin tài khoản ngân hàng',
  },
  AddAccount: {
    id: `${scope}.AddAccount`,
    defaultMessage: 'Thêm tài khoản',
  },
  AccountNumber: {
    id: `${scope}.AccountNumber`,
    defaultMessage: 'Số tài khoản',
  },
  AccountName: {
    id: `${scope}.AccountName`,
    defaultMessage: 'Tên tài khoản',
  },
  BankName: {
    id: `${scope}.BankName`,
    defaultMessage: 'Tên ngân hàng',
  },
  Branch: {
    id: `${scope}.Branch`,
    defaultMessage: 'Chi nhánh',
  },
  Edit: {
    id: `${scope}.Edit`,
    defaultMessage: 'Sửa',
  },
  Delete: {
    id: `${scope}.Delete`,
    defaultMessage: 'Xóa',
  },
  DeleteSuccess: {
    id: `${scope}.DeleteSuccess`,
    defaultMessage: 'Xóa thành công',
  },
  DeleteFail: {
    id: `${scope}.DeleteFail`,
    defaultMessage: 'Xóa thất bại',
  },
  ConfirmDelete: {
    id: `${scope}.ConfirmDelete`,
    defaultMessage: 'Bạn có chắc chắn muốn xóa?',
  },
});
