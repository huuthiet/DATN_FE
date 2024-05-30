import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profile state domain
 */

const selectListOrderNoPayOfPayDepositListDomain = state => state.listOrderNoPayOfPayDeposit || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Profile
 */

const makeSelectListOrderNoPayOfPayDepositList = () =>
  createSelector(
    selectListOrderNoPayOfPayDepositListDomain,
    substate => substate,
  );

export default makeSelectListOrderNoPayOfPayDepositList;
export { selectListOrderNoPayOfPayDepositListDomain };
