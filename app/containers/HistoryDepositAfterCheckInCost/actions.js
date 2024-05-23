/*
 *
 * Profile actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_STORE_DATA,
  GET_PAY_DEPOSIT_LIST_SUCCESS,
  GET_PAY_DEPOSIT_LIST_FAIL,
  GET_PAY_DEPOSIT_LIST,
  PUT_PAY_DEPOSIT_LIST,
  PUT_PAY_DEPOSIT_LIST_SUCCESS,
  PUT_PAY_DEPOSIT_LIST_FAIL,
} from './constants';

export function getPayDepositList(payload) {
  return {
    type: GET_PAY_DEPOSIT_LIST,
    payload,
  };
}

export function getPayDepositListSuccess(response) {
  return {
    type: GET_PAY_DEPOSIT_LIST_SUCCESS,
    response,
  };
}

export function getPayDepositListFail(error) {
  return {
    type: GET_PAY_DEPOSIT_LIST_FAIL,
    error,
  };
}
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function approvePendingPayDeposit(idTransaction, status) {
  console.log('idTransaction', idTransaction);
  console.log('status', status);

  return {
    type: PUT_PAY_DEPOSIT_LIST,
    idTransaction,
    status,
  };
}

export function approvePendingPayDepositSuccess(response) {
  return {
    type: PUT_PAY_DEPOSIT_LIST_SUCCESS,
    response,
  };
}

export function approvePendingPayDepositFail(error) {
  return {
    type: PUT_PAY_DEPOSIT_LIST_FAIL,
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
