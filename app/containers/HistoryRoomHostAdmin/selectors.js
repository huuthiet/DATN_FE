import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changePasswordPage state domain
 */

const selectHistoryRoomHostDomain = state =>
  state.historyRoomHostAdmin || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HistoryRoomHostAdmin
 */

const makeSelectHistoryRoomHost = () =>
  createSelector(
    selectHistoryRoomHostDomain,
    substate => substate,
  );

export default makeSelectHistoryRoomHost;
export { selectHistoryRoomHostDomain };
