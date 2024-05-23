import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profile state domain
 */

const selectPayDepositListDomain = state => state.historyMonthly || initialState;

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

export default makeSelectPayDepositList;
export { selectPayDepositListDomain };
