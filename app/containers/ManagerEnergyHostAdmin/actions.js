/*
 *
 * Profile actions
 *
 */

import {
    DEFAULT_ACTION,
    GET_MOTEL_LIST,
    GET_MOTEL_LIST_SUCCESS,
    GET_MOTEL_LIST_FAIL,
    CHANGE_STORE_DATA,
} from './constants';


export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function getMotelList() {
    return {
        type: GET_MOTEL_LIST,
    };
}
export function getMotelListSuccess(response) {
    return {
        type: GET_MOTEL_LIST_SUCCESS,
        response,
    };
}
export function getMotelListFail(error) {
    return {
        type: GET_MOTEL_LIST_FAIL,
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
