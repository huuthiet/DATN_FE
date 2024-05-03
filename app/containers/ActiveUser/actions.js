/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, POST_ACTIVE_USER, POST_ACTIVE_USER_SUCCESS, POST_ACTIVE_USER_FAIL, GET_USER, CHANGE_STORE_DATA } from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}
export function getUser() {
    return {
        type: GET_USER,
    };
}

export function postActiveUser(payload) {
    return {
        type: POST_ACTIVE_USER,
        payload,
    };
}

export function postActiveUserSuccess(response) {
    return {
        type: POST_ACTIVE_USER_SUCCESS,
        response,
    };
}

export function postActiveUserFail(error) {
    return {
        type: POST_ACTIVE_USER_FAIL,
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