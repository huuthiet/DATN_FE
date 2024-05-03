/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, POST_PASSWORD_REISSUE, POST_PASSWORD_REISSUE_SUCCESS, POST_PASSWORD_REISSUE_FAIL } from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function postPasswordReissue(payload) {
    return {
        type: POST_PASSWORD_REISSUE,
        payload,
    };
}

export function postPasswordReissueSuccess(response) {
    return {
        type: POST_PASSWORD_REISSUE_SUCCESS,
        response,
    };
}

export function postPasswordReissueFail(error) {
    return {
        type: POST_PASSWORD_REISSUE_FAIL,
        error,
    };
}