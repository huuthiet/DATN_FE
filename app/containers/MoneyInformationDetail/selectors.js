import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the MoneyInformationDetail state domain
 */

const selectMoneyInformationDetailDomain = state =>
  state.moneyInformationDetail || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MoneyInformationDetail
 */

const makeSelectMoneyInformationDetail = () =>
  createSelector(
    selectMoneyInformationDetailDomain,
    substate => substate,
  );

export default makeSelectMoneyInformationDetail;
export { selectMoneyInformationDetailDomain };
