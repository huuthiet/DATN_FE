/*
 *
 * OrderList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ORDER_LIST,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_LIST_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getOrderList() {
  return {
    type: GET_ORDER_LIST,
  };
}

export function getOrderListSuccess(response) {
  return {
    type: GET_ORDER_LIST_SUCCESS,
    response,
  };
}

export function getOrderListFail(error) {
  return {
    type: GET_ORDER_LIST_FAIL,
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
