import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the jobListUser state domain
 */

const selectJobListUserDomain = state => state.jobListUser || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by JobList
 */

const makeSelectJobListUser = () =>
  createSelector(
    selectJobListUserDomain,
    substate => substate,
  );

export default makeSelectJobListUser;
export { selectJobListUserDomain };
