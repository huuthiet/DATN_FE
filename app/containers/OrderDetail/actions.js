/*
 *
 * OrderDetail actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ORDER_DETAIL,
  GET_ORDER_DETAIL_SUCCESS,
  GET_ORDER_DETAIL_FAIL,
  CHANGE_STORE_DATA,
  PUT_ORDER_DETAIL,
  PUT_ORDER_DETAIL_SUCCESS,
  PUT_ORDER_DETAIL_FAIL,
  DELETE_ORDER_DETAIL,
  DELETE_ORDER_DETAIL_SUCCESS,
  DELETE_ORDER_DETAIL_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getOrderDetail(id) {
  return {
    type: GET_ORDER_DETAIL,
    id,
  };
}

export function getOrderDetailSuccess(response) {
  return {
    type: GET_ORDER_DETAIL_SUCCESS,
    response,
  };
}

export function getOrderDetailFail(error) {
  return {
    type: GET_ORDER_DETAIL_FAIL,
    error,
  };
}

export function putOrderDetail(data) {
  return {
    type: PUT_ORDER_DETAIL,
    data,
  };
}

export function putOrderDetailSuccess(response) {
  return {
    type: PUT_ORDER_DETAIL_SUCCESS,
    response,
  };
}

export function putOrderDetailFail(error) {
  return {
    type: PUT_ORDER_DETAIL_FAIL,
    error,
  };
}

export function deleteOrderDetail(data) {
  return {
    type: DELETE_ORDER_DETAIL,
    data,
  };
}

export function deleteOrderDetailSuccess(response) {
  return {
    type: DELETE_ORDER_DETAIL_SUCCESS,
    response,
  };
}

export function deleteOrderDetailFail(error) {
  return {
    type: DELETE_ORDER_DETAIL_FAIL,
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
