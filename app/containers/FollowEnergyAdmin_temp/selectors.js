import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDataEnergyDomain = state => state.dataEnergy || initialState;

const makeSelectDataEnergy = () =>
  createSelector(
    selectDataEnergyDomain,
    substate => substate,
  );

export default makeSelectDataEnergy;
export { selectDataEnergyDomain };
