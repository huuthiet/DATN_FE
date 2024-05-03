import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the jobVerify state domain
 */

const selectJobVerifyDomain = state => state.jobVerify || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by JobVerify
 */

const makeSelectJobVerify = () =>
  createSelector(
    selectJobVerifyDomain,
    substate => substate,
  );

export default makeSelectJobVerify;
export { selectJobVerifyDomain };
