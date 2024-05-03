import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectEnergyBillingDomain = state => {
  const { energyBilling } = state;
  return energyBilling || initialState;
};

const makeSelectEnergyBilling = () =>
  createSelector(
    selectEnergyBillingDomain,
    substate => substate,
  );

export default makeSelectEnergyBilling;
