/*
 *
 * MapsPage actions
 *
 */

import { DEFAULT_ACTION, GET_LIST_ROOM, GET_LIST_ROOM_SUCCESS, GET_LIST_ROOM_FAIL, CHANGE_STORE_DATA } from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function getListRoom() {
    return {
        type: GET_LIST_ROOM,
    };
}

export function getListRoomSuccess(response) {
    return {
        type: GET_LIST_ROOM_SUCCESS,
        response
    };
}

export function getListRoomFail(error) {
    return {
        type: GET_LIST_ROOM_FAIL,
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