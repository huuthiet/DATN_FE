/*
 *
 * Profile actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_MOTEL_LIST,
  GET_MOTEL_LIST_SUCCESS,
  GET_MOTEL_LIST_FAIL,
  CHANGE_STORE_DATA,
  GET_HOST_REVENUE,
  GET_HOST_REVENUE_SUCCESS,
  GET_HOST_REVENUE_FAIL,
} from './constants';


export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getMotelList() {
  return {
    type: GET_MOTEL_LIST,
  };
}
export function getMotelListSuccess(response) {
  return {
    type: GET_MOTEL_LIST_SUCCESS,
    response,
  };
}
export function getMotelListFail(error) {
  return {
    type: GET_MOTEL_LIST_FAIL,
    error,
  };
}

const getHostRevenueSuccess = (hostRevenue) => ({
  type: GET_HOST_REVENUE_SUCCESS,
  payload: hostRevenue,
});

const getHostRevenueFail = (error) => ({
  type: GET_HOST_REVENUE_FAIL,
  payload: error,
});

export function changeStoreData(key, value) {
  return {
    type: CHANGE_STORE_DATA,
    key,
    value,
  };
}
