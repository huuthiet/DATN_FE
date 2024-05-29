import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the motelDetail state domain
 */

const selectMotelDetailDomain = state => state.motelDetail || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MotelDetail
 */

const makeSelectMotelDetail = () =>
  createSelector(
    selectMotelDetailDomain,
    substate => substate,
  );

export default makeSelectMotelDetail;
export { selectMotelDetailDomain };
