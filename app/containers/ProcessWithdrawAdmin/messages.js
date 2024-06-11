/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import {
  defineMessages
} from 'react-intl';

export const scope = 'WithdrawalRequest.containers';

export default defineMessages({
  Header: {
    id: `${scope}.Header`,
    defaultMessage: 'Quản lý yêu cầu rút tiền',
  },
  Accept: {
    id: `${scope}.Accept`,
    defaultMessage: 'Chấp nhận',
  },
  Reject: {
    id: `${scope}.Reject`,
    defaultMessage: 'Từ chối',
  },
});
