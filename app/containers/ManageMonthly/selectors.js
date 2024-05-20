import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changePasswordPage state domain
 */

const selectHistoryRoomHostDomain = state =>
  state.historyRoomHost || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HistoryRoomHost
 */

const makeSelectHistoryRoomHost = () =>
  createSelector(
    selectHistoryRoomHostDomain,
    substate => substate,
  );

export default makeSelectHistoryRoomHost;
export { selectHistoryRoomHostDomain };
