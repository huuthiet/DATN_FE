import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the AddMoney state domain
 */

const selectAddMoneyDomain = state => state.addMoney || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddMoney
 */

const makeSelectAddMoney = () =>
  createSelector(
    selectAddMoneyDomain,
    substate => substate,
  );

export default makeSelectAddMoney;
export { selectAddMoneyDomain };
