import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changePasswordPage state domain
 */

const selectHostMotelRoomDetailUserDomain = state =>
  state.hostMotelRoomDetailUser || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HostMotelRoomDetailUser
 */

const makeSelectHostMotelRoomDetailUser = () =>
  createSelector(
    selectHostMotelRoomDetailUserDomain,
    substate => substate,
  );

export default makeSelectHostMotelRoomDetailUser;
export { selectHostMotelRoomDetailUserDomain };
