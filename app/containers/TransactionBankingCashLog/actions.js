/*
 *
 * Profile actions
 *
 */

import {
    DEFAULT_ACTION,
    CHANGE_STORE_DATA,
    GET_PENDING_ACCEPT_BANKING_CASH_LIST_SUCCESS,
    GET_PENDING_ACCEPT_BANKING_CASH_LIST_FAIL,
    GET_PENDING_ACCEPT_BANKING_CASH_LIST,
} from './constants';


export function getPendingAcceptBankingCashList() {
    return {
        type: GET_PENDING_ACCEPT_BANKING_CASH_LIST,
    };
}

export function getPendingAcceptBankingCashListSuccess(response) {
    return {
        type: GET_PENDING_ACCEPT_BANKING_CASH_LIST_SUCCESS,
        response,
    };
}

export function getPendingAcceptBankingCashListFail(error) {
    return {
        type: GET_PENDING_ACCEPT_BANKING_CASH_LIST_FAIL,
        error,
    };
}
// export function defaultAction() {
//     return {
//         type: DEFAULT_ACTION,
//     };
// }

export function changeStoreData(key, value) {
    return {
        type: CHANGE_STORE_DATA,
        key,
        value,
    };
}
