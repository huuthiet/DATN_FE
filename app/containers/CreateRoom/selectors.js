import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Createroom state domain
 */

const selectCreateRoomDomain = state => state.createRoom || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CCreateroom
 */

const makeSelectCreateRoom = () =>
    createSelector(
        selectCreateRoomDomain,
        substate => substate,
    );

export default makeSelectCreateRoom;
export { selectCreateRoomDomain };