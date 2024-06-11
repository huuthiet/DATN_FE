import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profile state domain
 */

const selectPayDepositListDomain = state => state.pendingAcceptDepositList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Profile
 */

const makeSelectPayDepositList = () =>
  createSelector(
    selectPayDepositListDomain,
    substate => substate,
  );

const makeSelectWithdrawalList = () => {
  createSelector(
    selectPayDepositListDomain,
    substante => substante,
  )
}

export default makeSelectPayDepositList;
export { selectPayDepositListDomain, makeSelectWithdrawalList };
