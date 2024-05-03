import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the jobDetailUser state domain
 */

const selectJobDetailUserDomain = state => state.jobDetailUser || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by JobDetailUser
 */

const makeSelectJobDetailUser = () =>
    createSelector(
        selectJobDetailUserDomain,
        substate => substate,
    );

export default makeSelectJobDetailUser;
export { selectJobDetailUserDomain };