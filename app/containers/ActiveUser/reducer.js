/*
 *
 * activeUserPage reducer
 *
 */
import produce from 'immer';
import { POST_ACTIVE_USER_SUCCESS, POST_ACTIVE_USER_FAIL, CHANGE_STORE_DATA } from './constants';
// import * as dataLink from '../../utils/local';

export const initialState = {
    error: [],
    currentUser: {},
    activeUserError: {},
    actives: 0,
};

/* eslint-disable default-case, no-param-reassign */
const activeUserPageReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case POST_ACTIVE_USER_SUCCESS:
                draft.currentUser = action.response;
                draft.actives = 1;
                // dataLink.dataLink = 1;
                break;
            case POST_ACTIVE_USER_FAIL:
                draft.activeUserError = action.error.errors;
                draft.error = action.error.errors;
                draft.actives = 2;
                // dataLink.dataLink = 2;
                break;
            case CHANGE_STORE_DATA:
                draft[action.key] = action.value;
                break;
        }
    });

export default activeUserPageReducer;