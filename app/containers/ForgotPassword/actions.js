/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, POST_FORGOT_PASSWORD, POST_FORGOT_PASSWORD_SUCCESS, POST_FORGOT_PASSWORD_FAIL, GET_USER, CHANGE_STORE_DATA } from './constants';

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

export function postForgotPassword(payload) {
    return {
        type: POST_FORGOT_PASSWORD,
        payload,
    };
}

export function postForgotPasswordSuccess(response) {
    return {
        type: POST_FORGOT_PASSWORD_SUCCESS,
        response,
    };
}

export function postForgotPasswordFail(error) {
    return {
        type: POST_FORGOT_PASSWORD_FAIL,
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