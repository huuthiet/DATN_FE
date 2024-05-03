import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the passwordReissuePage state domain
 */

const selectPasswordReissuePageDomain = state => state.passwordReissuePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LpasswordReissuePage
 */

const makeSelectPasswordReissuePage = () =>
    createSelector(
        selectPasswordReissuePageDomain,
        substate => substate,
    );

export default makeSelectPasswordReissuePage;
export { selectPasswordReissuePageDomain };