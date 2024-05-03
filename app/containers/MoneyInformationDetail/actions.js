/*
 *
 * MotelDetail actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_STORE_DATA,
  ADD_BANK,
  ADD_BANK_SUCCESS,
  ADD_BANK_FAIL,
  EDIT_BANK,
  EDIT_BANK_SUCCESS,
  EDIT_BANK_FAIL,
  GET_DETAIL_BANK,
  GET_DETAIL_BANK_SUCCESS,
  GET_DETAIL_BANK_FAIL,
  GET_MASTER_BANK_BANK,
  GET_MASTER_BANK_BANK_SUCCESS,
  GET_MASTER_BANK_BANK_FAIL,
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

export function addBank(payload) {
  return {
    type: ADD_BANK,
    payload,
  };
}

export function addBankSuccess(response) {
  return {
    type: ADD_BANK_SUCCESS,
    response,
  };
}

export function addBankFail(error) {
  return {
    type: ADD_BANK_FAIL,
    error,
  };
}

export function editBank(payload) {
  return {
    type: EDIT_BANK,
    payload,
  };
}

export function editBankSuccess(response) {
  return {
    type: EDIT_BANK_SUCCESS,
    response,
  };
}

export function editBankFail(error) {
  return {
    type: EDIT_BANK_FAIL,
    error,
  };
}

export function getDetailBank(payload) {
  return {
    type: GET_DETAIL_BANK,
    payload,
  };
}

export function getDetailBankSuccess(response) {
  return {
    type: GET_DETAIL_BANK_SUCCESS,
    response,
  };
}

export function getDetailBankFail(error) {
  return {
    type: GET_DETAIL_BANK_FAIL,
    error,
  };
}

// Bank
export function getMasterDataBank(payload) {
  return {
    type: GET_MASTER_BANK_BANK,
    payload,
  };
}

export function getMasterDataBankSuccess(response) {
  return {
    type: GET_MASTER_BANK_BANK_SUCCESS,
    response,
  };
}

export function getMasterDataBankFail(error) {
  return {
    type: GET_MASTER_BANK_BANK_FAIL,
    error,
  };
}
