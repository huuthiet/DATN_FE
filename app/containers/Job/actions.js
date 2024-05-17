/*
 *
 * Job actions
 *
 */

import {
    DEFAULT_ACTION,
    POST_JOB,
    POST_JOB_SUCCESS,
    POST_JOB_FAIL,
    CHANGE_STORE_DATA,
    GET_BANK_INFO,
    GET_BANK_INFO_SUCCESS,
    GET_BANK_INFO_FAIL,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function getBankInfo(id) {
    return {
        type: GET_BANK_INFO,
        id
    };

}

export function getBankInfoListSuccess(response) {
    return {
        type: GET_BANK_INFO_SUCCESS,
        response,
    };
}

export function getBankInfoListFail(error) {
    return {
        type: GET_BANK_INFO_FAIL,
        error,
    };
}

export function postJob(formData) {
    return {
        type: POST_JOB,
        formData,
    };
}

export function postJobSuccess(response) {
    return {
        type: POST_JOB_SUCCESS,
        response,
    };
}

export function postJobFail(error) {
    return {
        type: POST_JOB_FAIL,
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