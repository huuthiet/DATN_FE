import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the job state domain
 */

const selectJobDomain = state => state.job || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Job
 */

const makeSelectJob = () =>
  createSelector(
    selectJobDomain,
    substate => substate,
  );

const makeSelectBankInfo = () =>
  createSelector(
    selectJobDomain,
    substate => substate.bankInfo,
  );

export default makeSelectJob;
export { makeSelectBankInfo };
export { selectJobDomain };
