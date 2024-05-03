import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mapsPage state domain
 */

const selectMapsPageDomain = state => state.mapsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MapsPage
 */

const makeSelectMapsPage = () =>
  createSelector(
    selectMapsPageDomain,
    substate => substate,
  );

export default makeSelectMapsPage;
export { selectMapsPageDomain };
