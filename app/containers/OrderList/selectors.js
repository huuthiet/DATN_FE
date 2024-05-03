import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderList state domain
 */

const selectOrderListDomain = state => state.orderList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderList
 */

const makeSelectOrderList = () =>
  createSelector(
    selectOrderListDomain,
    substate => substate,
  );

export default makeSelectOrderList;
export { selectOrderListDomain };
