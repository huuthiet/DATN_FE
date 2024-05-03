import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the jobDetail state domain
 */

const selectJobDetailDomain = state => state.jobDetail || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by JobDetail
 */

const makeSelectJobDetail = () =>
  createSelector(
    selectJobDetailDomain,
    substate => substate,
  );

export default makeSelectJobDetail;
export { selectJobDetailDomain };
