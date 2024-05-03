import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the withdrawList state domain
 */

// selectWithdrawListDomain
const selectWithdrawListDomain = state =>
  state.requestWithdrawList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Withdraw List
 */

const makeSelectRequestWithdrawList = () =>
  createSelector(
    selectWithdrawListDomain,
    substate => substate,
  );

export default makeSelectRequestWithdrawList;
export { selectWithdrawListDomain };
