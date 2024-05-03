import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the updateMotel state domain
 */

const selectUpdateMotelDomain = state => state.updateMotel || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UpdateMotel
 */

const makeSelectUpdateMotel = () =>
  createSelector(
    selectUpdateMotelDomain,
    substate => substate,
  );

export default makeSelectUpdateMotel;
export { selectUpdateMotelDomain };
