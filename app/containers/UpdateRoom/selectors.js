import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the updateRoom state domain
 */

const selectUpdateRoomDomain = state => state.updateRoom || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UpdateRoom
 */

const makeSelectUpdateRoom = () =>
  createSelector(
    selectUpdateRoomDomain,
    substate => substate,
  );

export default makeSelectUpdateRoom;
export { selectUpdateRoomDomain };
