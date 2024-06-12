import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the RoomBill state domain
 */

const selectRoomBillDomain = state => state.roomBill || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RoomBill
 */

const makeSelectRoomBill = () =>
  createSelector(
    selectRoomBillDomain,
    substate => substate,
  );

export default makeSelectRoomBill;
export { selectRoomBillDomain };
