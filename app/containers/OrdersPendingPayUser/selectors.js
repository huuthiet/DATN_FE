import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profile state domain
 */

const selectPendingAcceptBankCashListDomain = state =>
  state.ordersPendingPayUserList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Profile
 */

const makeSelectPendingAcceptBankCashList = () =>
  createSelector(
    selectPendingAcceptBankCashListDomain,
    substate => substate,
  );

export default makeSelectPendingAcceptBankCashList;
export { selectPendingAcceptBankCashListDomain };
