/*
 *
 * OrderList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_MONTHLY_ORDER_LIST,
  GET_MONTHLY_ORDER_LIST_SUCCESS,
  GET_MONTHLY_ORDER_LIST_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getMonthlyOrderList() {
  return {
    type: GET_MONTHLY_ORDER_LIST,
  };
}

export function getMonthlyOrderListSuccess(response) {
  return {
    type: GET_MONTHLY_ORDER_LIST_SUCCESS,
    response,
  };
}

export function getMonthlyOrderListFail(error) {
  return {
    type: GET_MONTHLY_ORDER_LIST_FAIL,
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
