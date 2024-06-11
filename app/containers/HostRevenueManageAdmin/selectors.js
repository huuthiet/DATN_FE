import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changePasswordPage state domain
 */

const selectHostMotelRoomDetailUserDomain = state =>
  state.hostMotelRoomDetailUser || initialState;
const selectHostRevenue = state =>
  state.hostRevenue || initialState;
const selectWithdraw = state =>
  state.withdraw || initialState;

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

const makeSelectHostRevenue = () =>
  createSelector(
    selectHostRevenue,
    substate => substate,
  );

const makeSelectWithdraw = () =>
  createSelector(
    selectWithdraw,
    substate => substate.withdraw,
  );



export default makeSelectHostMotelRoomDetailUser;
export { makeSelectHostRevenue, selectHostMotelRoomDetailUserDomain, makeSelectWithdraw };
