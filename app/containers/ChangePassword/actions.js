/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, POST_CHANGE_PASSWORD, POST_CHANGE_PASSWORD_SUCCESS, POST_CHANGE_PASSWORD_FAIL } from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function postChangePassword(payload) {
    return {
        type: POST_CHANGE_PASSWORD,
        payload,
    };
}

export function postChangePasswordSuccess(response) {
    return {
        type: POST_CHANGE_PASSWORD_SUCCESS,
        response,
    };
}

export function postChangePasswordFail(error) {
    return {
        type: POST_CHANGE_PASSWORD_FAIL,
        error,
    };
}