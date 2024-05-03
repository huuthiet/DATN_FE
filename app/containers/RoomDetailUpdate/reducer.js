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
    PUT_ROOM_DETAIL_UPDATE_SUCCESS,
    PUT_ROOM_DETAIL_UPDATE_FAIL,
} from './constants';



export const initialState = {
    showSuccessPopup: false,
    showErrorPopup: false,
    content: '',
    action: 0,
    roomdetailupdate: {},
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
            case PUT_ROOM_DETAIL_UPDATE_SUCCESS:
                draft.roomdetailupdate = action.response;
                break;
            case PUT_ROOM_DETAIL_UPDATE_FAIL:
                draft.roomdetailupdate = action.error;
                break;
        }
    });

export default roomDetailReducer;