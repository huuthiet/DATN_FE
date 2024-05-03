import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profileUpdate state domain
 */

const selectProfileUpdateDomain = state => state.profileUpdate || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProfileUpdate
 */

const makeSelectProfileUpdate = () =>
  createSelector(
    selectProfileUpdateDomain,
    substate => substate,
  );

export default makeSelectProfileUpdate;
export { selectProfileUpdateDomain };
