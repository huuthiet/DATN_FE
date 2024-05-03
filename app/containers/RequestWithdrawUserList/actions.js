/*
 *
 * TransactionPayMentUserList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_REQUESTWITHDRAW_USER_LIST,
  GET_REQUESTWITHDRAW_USER_LIST_SUCCESS,
  GET_REQUESTWITHDRAW_USER_LIST_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getRequestWithdrawUserList() {
  return {
    type: GET_REQUESTWITHDRAW_USER_LIST,
  };
}

export function getRequestWithdrawUserListSuccess(response) {
  return {
    type: GET_REQUESTWITHDRAW_USER_LIST_SUCCESS,
    response,
  };
}

export function getRequestWithdrawUserListFail(error) {
  return {
    type: GET_REQUESTWITHDRAW_USER_LIST_FAIL,
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
