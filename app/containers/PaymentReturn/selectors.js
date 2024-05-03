import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the paymentReturn state domain
 */

const selectPaymentReturnDomain = state => state.paymentReturn || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PaymentReturn
 */

const makeSelectPaymentReturn = () =>
  createSelector(
    selectPaymentReturnDomain,
    substate => substate,
  );

export default makeSelectPaymentReturn;
export { selectPaymentReturnDomain };
