/*
 *
 * RoomDetail actions
 *
 */

import {
    DEFAULT_ACTION,
    GET_ROOM,
    GET_ROOM_SUCCESS,
    GET_ROOM_FAIL,
    DELETE_ROOM,
    DELETE_ROOM_SUCCESS,
    DELETE_ROOM_FAIL,
    CHANGE_STORE_DATA
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function getRoom(id) {
    return {
        type: GET_ROOM,
        id
    };
}

export function getRoomSuccess(response) {
    return {
        type: GET_ROOM_SUCCESS,
        response
    };
}

export function getRoomFail(error) {
    return {
        type: GET_ROOM_FAIL,
        error
    };
}
export function deleteRoom(id) {
    return {
        type: DELETE_ROOM,
        id
    };
}

export function deleteRoomSuccess(response) {
    return {
        type: DELETE_ROOM_SUCCESS,
        response
    };
}

export function deleteRoomFail(error) {
    return {
        type: DELETE_ROOM_FAIL,
        error
    };
}
export function changeStoreData(key, value) {
    return {
        type: CHANGE_STORE_DATA,
        key,
        value,
    };
}