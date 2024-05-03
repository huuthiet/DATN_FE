import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the BillListAdminAdmin state domain
 */

const selectBillListAdminDomain = state => state.billListAdmin || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BillListAdmin
 */

const makeSelectBillListAdmin = () =>
  createSelector(
    selectBillListAdminDomain,
    substate => substate,
  );

export default makeSelectBillListAdmin;
export { selectBillListAdminDomain };
