/*
 *
 * Payment actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_STORE_DATA,
  ADD_BANK_USER,
  ADD_BANK_USER_SUCCESS,
  ADD_BANK_USER_FAIL,
  POST_PAYMENT_USER,
  POST_PAYMENT_USER_SUCCESS,
  POST_PAYMENT_USER_FAIL,
} from './constants';

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

export function postPaymentUser(payload) {
  return {
    type: POST_PAYMENT_USER,
    payload,
  };
}

export function postPaymentUserSuccess(response) {
  return {
    type: POST_PAYMENT_USER_SUCCESS,
    response,
  };
}

export function postPaymentUserFail(error) {
  return {
    type: POST_PAYMENT_USER_FAIL,
    error,
  };
}
