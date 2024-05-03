import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profile state domain
 */

const selectListDeviceEnergyDomain = state => state.listDeviceEnergy || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Profile
 */

const makeSelectListDeviceEnergy = () =>
  createSelector(
    selectListDeviceEnergyDomain,
    substate => substate,
  );

export default makeSelectListDeviceEnergy;
export { selectListDeviceEnergyDomain };
