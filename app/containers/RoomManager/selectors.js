import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the roomManage state domain
 */

const selectRoomManageDomain = state => state.roomManage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RoomManage
 */

const makeSelectRoomManage = () =>
    createSelector(
        selectRoomManageDomain,
        substate => substate,
    );

export default makeSelectRoomManage;
export { selectRoomManageDomain };