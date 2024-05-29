import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the motel state domain
 */

const selectMotelListRoomDomain = state => state.motelListRoom || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Motel
 */

const makeSelectMotelListRoom = () =>
  createSelector(
    selectMotelListRoomDomain,
    substate => substate,
  );

export default makeSelectMotelListRoom;
export { selectMotelListRoomDomain };
