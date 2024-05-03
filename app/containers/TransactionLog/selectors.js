import {
  createSelector
} from 'reselect';
import {
  initialState
} from './reducer';

/**
 * Direct selector to the changePasswordPage state domain
 */

const selectTransactionLogDomain = state => state.transantionLog || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TransactionLog
 */

const makeSelectTransactionLog = () =>
  createSelector(
    selectTransactionLogDomain,
    substate => substate,
  );

export default makeSelectTransactionLog;
export {
  selectTransactionLogDomain
};
