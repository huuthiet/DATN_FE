/*
 *
 * TransactionPayMentUserList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_REQUESTWITHDRAW_LIST,
  GET_REQUESTWITHDRAW_LIST_SUCCESS,
  GET_REQUESTWITHDRAW_LIST_FAIL,
  PUT_REQUESTWITHDRAW_LIST,
  PUT_REQUESTWITHDRAW_LIST_SUCCESS,
  PUT_REQUESTWITHDRAW_LIST_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getRequestWithdrawList() {
  return {
    type: GET_REQUESTWITHDRAW_LIST,
  };
}

export function getRequestWithdrawListSuccess(response) {
  return {
    type: GET_REQUESTWITHDRAW_LIST_SUCCESS,
    response,
  };
}

export function getRequestWithdrawListFail(error) {
  return {
    type: GET_REQUESTWITHDRAW_LIST_FAIL,
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

export function approveAdminRequestWithdraw(id, status) {
  return {
    type: PUT_REQUESTWITHDRAW_LIST,
    id,
    status,
  };
}

export function approveAdminRequestWithdrawSuccess(response) {
  return {
    type: PUT_REQUESTWITHDRAW_LIST_SUCCESS,
    response,
  };
}

export function approveAdminRequestWithdrawFail(error) {
  return {
    type: PUT_REQUESTWITHDRAW_LIST_FAIL,
    error,
  };
}
