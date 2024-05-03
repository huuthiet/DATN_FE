import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the roomDetail state domain
 */

const selectRoomDetailDomain = state => state.roomDetail || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CroomDetail
 */

const makeSelectRoomDetail = () =>
  createSelector(
    selectRoomDetailDomain,
    substate => substate,
  );

export default makeSelectRoomDetail;
export { selectRoomDetailDomain };
