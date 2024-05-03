/*
 *
 * forgotpasswordPage reducer
 *
 */
import produce from 'immer';
import { POST_FORGOT_PASSWORD_SUCCESS, POST_FORGOT_PASSWORD_FAIL, CHANGE_STORE_DATA } from './constants';
// import * as dataLink from '../../utils/local';

export const initialState = {
    error: [],
    currentUser: {},
    forgotpasswordError: {},
    actives: 0,
};

/* eslint-disable default-case, no-param-reassign */
const forgotpasswordPageReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case POST_FORGOT_PASSWORD_SUCCESS:
                draft.currentUser = action.response;
                draft.actives = 1;
                // dataLink.dataLink = 1;
                break;
            case POST_FORGOT_PASSWORD_FAIL:
                draft.forgotpasswordError = action.error.errors;
                draft.error = action.error.errors;
                draft.actives = 2;
                // dataLink.dataLink = 2;
                break;
            case CHANGE_STORE_DATA:
                draft[action.key] = action.value;
                break;
        }
    });

export default forgotpasswordPageReducer;