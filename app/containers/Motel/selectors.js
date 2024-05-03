import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the motel state domain
 */

const selectMotelDomain = state => state.motel || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Motel
 */

const makeSelectMotel = () =>
  createSelector(
    selectMotelDomain,
    substate => substate,
  );

export default makeSelectMotel;
export { selectMotelDomain };
