import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderList state domain
 */

const selectOrderListDomain = state =>
  state.transactionPaymentListHost || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderList
 */

const makeSelectTransactionPaymentListHost = () =>
  createSelector(
    selectOrderListDomain,
    substate => substate,
  );

export default makeSelectTransactionPaymentListHost;
export { selectOrderListDomain };
