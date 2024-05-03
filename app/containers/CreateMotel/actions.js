/*
 *
 * CreateMotel actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_ROOM,
  POST_MOTEL_SUCCESS,
  POST_MOTEL_FAIL,
  POST_MOTEL,
  CHANGE_STORE_DATA,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function set_room(key, value) {
  return {
    type: SET_ROOM,
    key,
    value,
  };
}

export function postMotel(payload) {
  return {
    type: POST_MOTEL,
    payload,
  };
}

export function postMotelSuccess(response) {
  return {
    type: POST_MOTEL_SUCCESS,
    response,
  };
}

export function postMotelFail(error) {
  return {
    type: POST_MOTEL_FAIL,
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
