/*
 *
 * Motel actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_MOTEL,
  GET_MOTEL_FAIL,
  GET_MOTEL_SUCCESS,
  POST_FLOOR,
  POST_FLOOR_SUCCESS,
  POST_FLOOR_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getMotel(id) {
  return {
    type: GET_MOTEL,
    id,
  };
}

export function getMotelSuccess(response) {
  return {
    type: GET_MOTEL_SUCCESS,
    response,
  };
}

export function getMotelFail(error) {
  return {
    type: GET_MOTEL_FAIL,
    error,
  };
}

export function postFloor(id, formData) {
  return {
    type: POST_FLOOR,
    id,
    formData,
  };
}

export function postFloorSuccess(response) {
  return {
    type: POST_FLOOR_SUCCESS,
    response,
  };
}

export function postFloorFail(error) {
  return {
    type: POST_FLOOR_FAIL,
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
