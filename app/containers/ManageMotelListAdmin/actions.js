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
    DELETE_MOTEL,
    DELETE_MOTEL_SUCCESS,
    DELETE_MOTEL_FAIL,
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

export function deleteMotel(id, idHost) {
    console.log("id motel", id);
    console.log("id host", idHost);
    return {
      type: DELETE_MOTEL,
      id,
      idHost,
    };
}
export function deleteMotelSuccess(response) {
    return {
        type: DELETE_MOTEL_SUCCESS,
        response,
    };
}
export function deleteMotelFail(error) {
    return {
        type: DELETE_MOTEL_FAIL,
        error,
    };
}
