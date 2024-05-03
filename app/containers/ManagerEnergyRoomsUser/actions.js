/*
 *
 * Profile actions
 *
 */

import {
    DEFAULT_ACTION,
    CHANGE_STORE_DATA,
    GET_JOBS_SUCCESS,
    GET_JOBS_FAIL,
    GET_JOBS,
} from './constants';


export function getJobs() {
    return {
        type: GET_JOBS,
    };
}

export function getJobsSuccess(response) {
    return {
        type: GET_JOBS_SUCCESS,
        response,
    };
}

export function getJobsFail(error) {
    return {
        type: GET_JOBS_FAIL,
        error,
    };
}
export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}


export function changeStoreData(key, value) {
    return {
        type: CHANGE_STORE_DATA,
        key,
        value,
    };
}
