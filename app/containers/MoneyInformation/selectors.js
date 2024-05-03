import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the MoneyInformation state domain
 */

const selectMoneyInformationDomain = state =>
  state.moneyInformation || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MoneyInformation
 */

const makeSelectMoneyInformation = () =>
  createSelector(
    selectMoneyInformationDomain,
    substate => substate,
  );

export default makeSelectMoneyInformation;
export { selectMoneyInformationDomain };
