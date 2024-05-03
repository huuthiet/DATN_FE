/*
 *
 * RoomDetail reducer
 *
 */
import produce from 'immer';
import { GET_ROOM_SUCCESS, GET_ROOM_FAIL, CHANGE_STORE_DATA, DELETE_ROOM_SUCCESS } from './constants';

export const initialState = {
    room: {},
    showWarningPopup: false,
    motelRoom: {},
};

/* eslint-disable default-case, no-param-reassign */
const roomDetailReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case GET_ROOM_SUCCESS:
                draft.room = action.response;
                break;
            case GET_ROOM_FAIL:
                draft.room = action.error;
                break;
            case DELETE_ROOM_SUCCESS:
                draft.motelRoom = action.response;
                break;
            case CHANGE_STORE_DATA:
                draft[action.key] = action.value;
                break;
        }
    });

export default roomDetailReducer;