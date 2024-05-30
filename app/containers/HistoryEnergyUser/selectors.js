import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changePasswordPage state domain
 */

const selectHistoryEnergyUserDomain = state =>
  state.historyEnergy || initialState;

const makeSelectHistoryEnergyUser = () =>
  createSelector(
    selectHistoryEnergyUserDomain,
    substate => substate,

  );



export default makeSelectHistoryEnergyUser;
export { selectHistoryEnergyUserDomain };
