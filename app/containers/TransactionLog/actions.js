/*
 *
 * TranSActionLog actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ORDER_SUCCESS,
  GET_ORDER,
  GET_ORDER_FAIL
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getGetOrder(payload) {
  return {
    type: GET_ORDER,
    payload,
  };
}
export function getGetOrderSucces(response) {
  return {
    type: GET_ORDER_SUCCESS,
    response,
  };
}
export function getGetOrderFail(error) {
  return {
    type: GET_ORDER_FAIL,
    error,
  };
}
