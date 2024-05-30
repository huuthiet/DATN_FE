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
    GET_BUILDING_REVENUE,
    GET_BUILDING_REVENUE_SUCCESS,
    GET_BUILDING_REVENUE_FAIL,
    CHANGE_STORE_DATA,
} from './constants';


export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function getBuildingRevenue(id) {
    return {
        type: GET_BUILDING_REVENUE,
        id,
    };
}
export function getBuildingRevenueSuccess(response) {
    return {
        type: GET_BUILDING_REVENUE_SUCCESS,
        response,
    };
}

export function getBuildingRevenueFail(error) {
    return {
        type: GET_BUILDING_REVENUE_FAIL,
        error,
    };
}

export function getMotelList(id) {
    return {
        type: GET_MOTEL_LIST,
        id,
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
