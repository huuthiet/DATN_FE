import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the HostMotelRoomUser state domain
 */

const selectHostMotelRoomUserDomain = state =>
  state.hostMotelRoomUser || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HostMotelRoomUser
 */

const makeSelectHostMotelRoomUser = () =>
  createSelector(
    selectHostMotelRoomUserDomain,
    substate => substate,
  );

export default makeSelectHostMotelRoomUser;
export { selectHostMotelRoomUserDomain };
