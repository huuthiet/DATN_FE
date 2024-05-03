/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { POST_CHANGE_PASSWORD_SUCCESS, POST_CHANGE_PASSWORD_FAIL } from './constants';

export const initialState = {
    currentUser: {},
    loginError: {},
    error: [],
    linkurl: 0,
};

/* eslint-disable default-case, no-param-reassign */
const changePasswordPageReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case POST_CHANGE_PASSWORD_SUCCESS:
                draft.currentUser = action.response.data.data;
                draft.linkurl = 1;
                break;
            case POST_CHANGE_PASSWORD_FAIL:
                draft.loginError = action.error.errors;
                draft.error = action.error.errors;
                draft.linkurl = 2;
                break;
        }
    });

export default changePasswordPageReducer;