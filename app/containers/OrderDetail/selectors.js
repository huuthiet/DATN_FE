import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderDetail state domain
 */

const selectOrderDetailDomain = state => state.orderDetail || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderDetail
 */

const makeSelectOrderDetail = () =>
  createSelector(
    selectOrderDetailDomain,
    substate => substate,
  );

export default makeSelectOrderDetail;
export { selectOrderDetailDomain };
