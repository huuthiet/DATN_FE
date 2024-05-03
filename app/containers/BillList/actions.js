/*
 *
 * BillList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_BILL_SUCCESS,
  GET_LIST_BILL,
  GET_LIST_BILL_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getListBill(data) {
  return {
    type: GET_LIST_BILL,
    data,
  };
}

export function getListBillSuccess(response) {
  return {
    type: GET_LIST_BILL_SUCCESS,
    response,
  };
}

export function getListBillFail(error) {
  return {
    type: GET_LIST_BILL_FAIL,
    error,
  };
}
