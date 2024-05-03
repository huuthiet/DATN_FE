import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the AdminUsersDetail state domain
 */

const selectAdminUsersDetailDomain = state =>
  state.adminUsersDetail || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminUsersDetail
 */

const makeSelectAdminUsersDetail = () =>
  createSelector(
    selectAdminUsersDetailDomain,
    substate => substate,
  );

export default makeSelectAdminUsersDetail;
export { selectAdminUsersDetailDomain };
