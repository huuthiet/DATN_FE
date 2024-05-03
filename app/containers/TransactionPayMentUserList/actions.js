/*
 *
 * TransactionPayMentUserList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_TRANSACTIONPAYMENT_USER_LIST,
  GET_TRANSACTIONPAYMENT_USER_LIST_SUCCESS,
  GET_TRANSACTIONPAYMENT_USER_LIST_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getTransactionPayMentUserList() {
  return {
    type: GET_TRANSACTIONPAYMENT_USER_LIST,
  };
}

export function getTransactionPayMentUserListSuccess(response) {
  return {
    type: GET_TRANSACTIONPAYMENT_USER_LIST_SUCCESS,
    response,
  };
}

export function getTransactionPayMentUserListFail(error) {
  return {
    type: GET_TRANSACTIONPAYMENT_USER_LIST_FAIL,
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
