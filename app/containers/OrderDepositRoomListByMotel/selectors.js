import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changePasswordPage state domain
 */

const selectHistoryFloorsRoomHostDomain = state =>
  state.historyFloorsRoomHost || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HistoryFloorsRoomHost
 */

const makeSelectHistoryFloorsRoomHost = () =>
  createSelector(
    selectHistoryFloorsRoomHostDomain,
    substate => substate,
  );

export default makeSelectHistoryFloorsRoomHost;
export { selectHistoryFloorsRoomHostDomain };
