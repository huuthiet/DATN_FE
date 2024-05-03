import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the createMotel state domain
 */

const selectCreateMotelDomain = state => state.createMotel || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CreateMotel
 */

const makeSelectCreateMotel = () =>
  createSelector(
    selectCreateMotelDomain,
    substate => substate,
  );

export default makeSelectCreateMotel;
export { selectCreateMotelDomain };
