import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderList state domain
 */

const selectOrderListDomain = state =>
  state.transactionPaymentUserList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderList
 */

const makeSelectTransactionPaymentUserList = () =>
  createSelector(
    selectOrderListDomain,
    substate => substate,
  );

export default makeSelectTransactionPaymentUserList;
export { selectOrderListDomain };
