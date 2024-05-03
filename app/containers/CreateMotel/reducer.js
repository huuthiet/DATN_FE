/*
 *
 * CreateMotel reducer
 *
 */
import produce from 'immer';
import {
    POST_MOTEL_SUCCESS,
    POST_MOTEL_FAIL,
    CHANGE_STORE_DATA,
} from './constants';

export const initialState = {
    showSuccessPopup: false,
    showErrorPopup: false,
    content: '',
    action: 0,
};

/* eslint-disable default-case, no-param-reassign */
const createMotelReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case POST_MOTEL_SUCCESS:
                draft.showSuccessPopup = true;
                draft.action = 1;
                break;
            case POST_MOTEL_FAIL:
                draft.showErrorPopup = true;
                draft.action = 2;
                break;
            case CHANGE_STORE_DATA:
                draft[action.key] = action.value;
                break;
        }
    });

export default createMotelReducer;