import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderList state domain
 */

const selectOrderListDomain = state =>
  state.transactionPaymentList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderList
 */

const makeSelectTransactionPaymentList = () =>
  createSelector(
    selectOrderListDomain,
    substate => substate,
  );

export default makeSelectTransactionPaymentList;
export { selectOrderListDomain };
