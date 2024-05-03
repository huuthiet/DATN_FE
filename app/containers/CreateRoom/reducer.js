/*
 *
 * roomDetail reducer
 *
 */
import produce from 'immer';
import {
    POST_MOTEL_SUCCESS,
    POST_MOTEL_FAIL,
    CHANGE_STORE_DATA,
    GET_ROOM_SUCCESS,
    GET_ROOM_FAIL,
    PUT_CREATE_ROOM_SUCCESS,
    PUT_CREATE_ROOM_FAIL,
} from './constants';



export const initialState = {
    showSuccessPopup: false,
    showErrorPopup: false,
    content: '',
    action: 0,
    roomdetailupdate: {},
    action: 0,
};

/* eslint-disable default-case, no-param-reassign */
const roomDetailReducer = (state = initialState, action) =>
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
            case GET_ROOM_SUCCESS:
                draft.room = action.response;
                break;
            case GET_ROOM_FAIL:
                draft.room = action.error;
                break;
            case PUT_CREATE_ROOM_SUCCESS:
                draft.roomdetailupdate = action.response;
                draft.action = 1;
                break;
            case PUT_CREATE_ROOM_FAIL:
                draft.roomdetailupdate = action.error;
                break;
        }
    });

export default roomDetailReducer;