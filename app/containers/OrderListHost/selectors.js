import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderListHost state domain
 */

const selectOrderListHostDomain = state => state.orderListHost || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderListHost
 */

const makeSelectOrderListHost = () =>
  createSelector(
    selectOrderListHostDomain,
    substate => substate,
  );

export default makeSelectOrderListHost;
export { selectOrderListHostDomain };
