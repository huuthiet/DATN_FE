/*
 *
 * TransactionPayMentListHost actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_TRANSACTIONPAYMENT_LIST,
  GET_TRANSACTIONPAYMENT_LIST_SUCCESS,
  GET_TRANSACTIONPAYMENT_LIST_FAIL,
  PUT_TRANSACTIONPAYMENT_LIST,
  PUT_TRANSACTIONPAYMENT_LIST_SUCCESS,
  PUT_TRANSACTIONPAYMENT_LIST_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getTransactionPayMentListHost() {
  return {
    type: GET_TRANSACTIONPAYMENT_LIST,
  };
}

export function getTransactionPayMentListHostSuccess(response) {
  return {
    type: GET_TRANSACTIONPAYMENT_LIST_SUCCESS,
    response,
  };
}

export function getTransactionPayMentListHostFail(error) {
  return {
    type: GET_TRANSACTIONPAYMENT_LIST_FAIL,
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

export function approveAdminTransactionPayment(id, status) {
  return {
    type: PUT_TRANSACTIONPAYMENT_LIST,
    id,
    status,
  };
}

export function approveAdminTransactionPaymentSuccess(response) {
  return {
    type: PUT_TRANSACTIONPAYMENT_LIST_SUCCESS,
    response,
  };
}

export function approveAdminTransactionPaymentFail(error) {
  return {
    type: PUT_TRANSACTIONPAYMENT_LIST_FAIL,
    error,
  };
}
