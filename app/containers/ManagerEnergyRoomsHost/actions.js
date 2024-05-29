/*
 *
 * Motel actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_MOTEL_INFOR,
  GET_MOTEL_INFOR_FAIL,
  GET_MOTEL_INFOR_SUCCESS,
  CHANGE_STORE_DATA,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getMotelInfor(id) {
  return {
    type: GET_MOTEL_INFOR,
    id,
  };
}

export function getMotelInforSuccess(response) {
  return {
    type: GET_MOTEL_INFOR_SUCCESS,
    response,
  };
}

export function getMotelInforFail(error) {
  return {
    type: GET_MOTEL_INFOR_FAIL,
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
