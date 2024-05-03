import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the BillList state domain
 */

const selectBillListDomain = state => state.billList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BillList
 */

const makeSelectBillList = () =>
  createSelector(
    selectBillListDomain,
    substate => substate,
  );

export default makeSelectBillList;
export { selectBillListDomain };
