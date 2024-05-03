/*
 *
 * CreateMotel actions
 *
 */

import {
    DEFAULT_ACTION,
    SET_ROOM,
    POST_MOTEL_SUCCESS,
    POST_MOTEL_FAIL,
    POST_MOTEL,
    CHANGE_STORE_DATA,
    PUT_CREATE_ROOM,
    PUT_CREATE_ROOM_SUCCESS,
    PUT_CREATE_ROOM_FAIL,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function set_room(key, value) {
    return {
        type: SET_ROOM,
        key,
        value,
    };
}

export function postMotel(payload) {
    return {
        type: POST_MOTEL,
        payload,
    };
}

export function postMotelSuccess(response) {
    return {
        type: POST_MOTEL_SUCCESS,
        response,
    };
}

export function postMotelFail(error) {
    return {
        type: POST_MOTEL_FAIL,
        error,
    };
}

export function changeStoreData(key, value) {
    return {
        type: CHANGE_STORE_DATA,
        key,
        value,
    };
}

export function putCreateRoom(payload) {
    return {
        type: PUT_CREATE_ROOM,
        payload,
    };
}

export function putCreateRoomSuccess(response) {
    return {
        type: PUT_CREATE_ROOM_SUCCESS,
        response,
    };
}

export function putCreateRoomFail(error) {
    return {
        type: PUT_CREATE_ROOM_FAIL,
        error,
    };
}