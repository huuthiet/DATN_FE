import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderList state domain
 */

const selectMonthlyOrderListDomain = state =>
  state.monthlyOrderList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderList
 */

const makeSelectMonthlyOrderList = () =>
  createSelector(
    selectMonthlyOrderListDomain,
    substate => substate,
  );

export default makeSelectMonthlyOrderList;
export { selectMonthlyOrderListDomain };
