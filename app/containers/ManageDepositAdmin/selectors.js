import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profile state domain
 */

const selectManagerBuildingHostDomain = state => state.motelListByOwner || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Profile
 */

const makeSelectManagerBuildingHost = () =>
  createSelector(
    selectManagerBuildingHostDomain,
    substate => substate,
  );

const makeSelectBuildingRevenue = () =>
  createSelector(
    selectManagerBuildingHostDomain,
    substate => substate.buildingRevenue,
  );

export default makeSelectManagerBuildingHost;
export { selectManagerBuildingHostDomain, makeSelectBuildingRevenue };


