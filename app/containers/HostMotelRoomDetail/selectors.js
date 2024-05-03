import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changePasswordPage state domain
 */

const selectHostMotelRoomDetailDomain = state =>
  state.hostMotelRoomDetail || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HostMotelRoomDetail
 */

const makeSelectHostMotelRoomDetail = () =>
  createSelector(
    selectHostMotelRoomDetailDomain,
    substate => substate,
  );

export default makeSelectHostMotelRoomDetail;
export { selectHostMotelRoomDetailDomain };
