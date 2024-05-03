import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ReportProblemListAdmin state domain
 */

const selectReportProblemListAdminDomain = state =>
  state.reportProblemListAdmin || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReportProblemListAdmin
 */

const makeSelectReportProblemListAdmin = () =>
  createSelector(
    selectReportProblemListAdminDomain,
    substate => substate,
  );

export default makeSelectReportProblemListAdmin;
export { selectReportProblemListAdminDomain };
