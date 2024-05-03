import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ReportProblemList state domain
 */

const selectReportProblemListDomain = state =>
  state.reportProblemList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReportProblemList
 */

const makeSelectReportProblemList = () =>
  createSelector(
    selectReportProblemListDomain,
    substate => substate,
  );

export default makeSelectReportProblemList;
export { selectReportProblemListDomain };
