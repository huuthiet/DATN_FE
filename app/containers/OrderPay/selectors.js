import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the OrderPay state domain
 */

const selectOrderPayDomain = state => state.orderPay || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderPay
 */

const makeSelectOrderPay = () =>
  createSelector(
    selectOrderPayDomain,
    substate => substate,
  );

export default makeSelectOrderPay;
export { selectOrderPayDomain };
