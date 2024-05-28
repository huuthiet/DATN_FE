/*
 *
 * MotelDetail actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_MOTEL_DETAIL,
  GET_MOTEL_DETAIL_FAIL,
  GET_MOTEL_DETAIL_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getMotelDetail(id) {
  return {
    type: GET_MOTEL_DETAIL,
    id,
  };
}

export function getMotelDetailSuccess(response) {
  return {
    type: GET_MOTEL_DETAIL_SUCCESS,
    response,
  };
}

export function getMotelDetailFail(error) {
  return {
    type: GET_MOTEL_DETAIL_FAIL,
    error,
  };
}
