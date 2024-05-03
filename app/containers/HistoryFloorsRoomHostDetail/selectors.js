import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changePasswordPage state domain
 */

const selectHistoryFloorsRoomHostDetailDomain = state =>
  state.historyFloorsRoomHostDetail || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HistoryFloorsRoomHostDetail
 */

const makeSelectHistoryFloorsRoomHostDetail = () =>
  createSelector(
    selectHistoryFloorsRoomHostDetailDomain,
    substate => substate,
  );

export default makeSelectHistoryFloorsRoomHostDetail;
export { selectHistoryFloorsRoomHostDetailDomain };
