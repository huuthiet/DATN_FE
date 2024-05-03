import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the forgotPassword state domain
 */

const selectForgotPasswordDomain = state => state.forgotPassword || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LorgotPassword
 */

const makeSelectForgotPassword = () =>
    createSelector(
        selectForgotPasswordDomain,
        substate => substate,
    );

export default makeSelectForgotPassword;
export { selectForgotPasswordDomain };