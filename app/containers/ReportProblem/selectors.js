import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ReportProblem state domain
 */

const selectReportProblemDomain = state => state.reportProblem || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReportProblem
 */

const makeSelectReportProblem = () =>
  createSelector(
    selectReportProblemDomain,
    substate => substate,
  );

export default makeSelectReportProblem;
export { selectReportProblemDomain };
