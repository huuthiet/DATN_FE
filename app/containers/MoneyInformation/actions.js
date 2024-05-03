/*
 *
 * AdminBank actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ADMIN_BANK,
  GET_ADMIN_BANK_SUCCESS,
  GET_ADMIN_BANK_FAIL,
  CHANGE_STORE_DATA,
  DELETE_ADMIN_BANK,
  DELETE_ADMIN_BANK_SUCCES,
  DELETE_ADMIN_BANK_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAdminBank() {
  return {
    type: GET_ADMIN_BANK,
  };
}

export function getAdminBankSuccess(response) {
  return {
    type: GET_ADMIN_BANK_SUCCESS,
    response,
  };
}

export function getAdminBankFail(error) {
  return {
    type: GET_ADMIN_BANK_FAIL,
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

export function deleteAdminBank(id) {
  return {
    type: DELETE_ADMIN_BANK,
    id,
  };
}

export function deleteAdminBankSuccess(response) {
  return {
    type: DELETE_ADMIN_BANK_SUCCES,
    response,
  };
}

export function deleteAdminBankFail(error) {
  return {
    type: DELETE_ADMIN_BANK_FAIL,
    error,
  };
}
