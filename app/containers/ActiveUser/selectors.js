import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the activeUser state domain
 */

const selectActiveUserDomain = state => state.activeUser || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LorgotPassword
 */

const makeSelectActiveUser = () =>
    createSelector(
        selectActiveUserDomain,
        substate => substate,
    );

export default makeSelectActiveUser;
export { selectActiveUserDomain };