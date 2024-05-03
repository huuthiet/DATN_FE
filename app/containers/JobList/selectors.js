import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the jobList state domain
 */

const selectJobListDomain = state => state.jobList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by JobList
 */

const makeSelectJobList = () =>
  createSelector(
    selectJobListDomain,
    substate => substate,
  );

export default makeSelectJobList;
export { selectJobListDomain };
