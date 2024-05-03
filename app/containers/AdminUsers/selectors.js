import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminUsers state domain
 */

const selectAdminUsersDomain = state => state.adminUsers || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminUsers
 */

const makeSelectAdminUsers = () =>
  createSelector(
    selectAdminUsersDomain,
    substate => substate,
  );

export default makeSelectAdminUsers;
export { selectAdminUsersDomain };
