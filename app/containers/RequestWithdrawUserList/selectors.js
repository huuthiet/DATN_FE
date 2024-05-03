import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the withdrawList state domain
 */

// selectWithdrawListDomain
const selectWithdrawListDomain = state =>
  state.requestWithdrawUserList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Withdraw List
 */

const makeSelectRequestWithdrawUserList = () =>
  createSelector(
    selectWithdrawListDomain,
    substate => substate,
  );

export default makeSelectRequestWithdrawUserList;
export { selectWithdrawListDomain };
