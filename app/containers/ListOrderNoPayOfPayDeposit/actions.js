/*
 *
 * Profile actions
 *
 */

import {
    DEFAULT_ACTION,
    CHANGE_STORE_DATA,
    GET_LIST_ORDER_NO_PAY_OF_PAY_DEPOSIT_SUCCESS,
    GET_LIST_ORDER_NO_PAY_OF_PAY_DEPOSIT_FAIL,
    GET_LIST_ORDER_NO_PAY_OF_PAY_DEPOSIT,
} from './constants';


export function getListOrderNoPay(payload) {
    return {
        type: GET_LIST_ORDER_NO_PAY_OF_PAY_DEPOSIT,
        payload
    };
}

export function getListOrderNoPaySuccess(response) {
    return {
        type: GET_LIST_ORDER_NO_PAY_OF_PAY_DEPOSIT_SUCCESS,
        response,
    };
}

export function getListOrderNoPayFail(error) {
    return {
        type: GET_LIST_ORDER_NO_PAY_OF_PAY_DEPOSIT_FAIL,
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
