/*
 *
 * OrderPay actions
 *
 */

import {
  GET_ORDERPAY,
  GET_ORDERPAY_FAIL,
  GET_ORDERPAY_SUCCESS,
  CHANGE_STORE_DATA,
  ADD_BANK_USER,
  ADD_BANK_USER_SUCCESS,
  ADD_BANK_USER_FAIL,
} from './constants';

export function getOrderPay(id) {
  return {
    type: GET_ORDERPAY,
    id,
  };
}

export function getOrderPaySuccess(response) {
  return {
    type: GET_ORDERPAY_SUCCESS,
    response,
  };
}

export function getOrderPayFail(error) {
  return {
    type: GET_ORDERPAY_FAIL,
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
export function getMasterDataBankUser(payload) {
  return {
    type: ADD_BANK_USER,
    payload,
  };
}

export function getMasterDataBankUserSuccess(response) {
  return {
    type: ADD_BANK_USER_SUCCESS,
    response,
  };
}

export function getMasterDataBankUserFail(error) {
  return {
    type: ADD_BANK_USER_FAIL,
    error,
  };
}
