/*
 *
 * UpdateMotel actions
 *
 */

import {
  DEFAULT_ACTION,
  PUT_MOTEL,
  PUT_MOTEL_SUCCESS,
  PUT_MOTEL_FAIL,
  CHANGE_STORE_DATA,
  POST_IMGL_SUCCESS,
  POST_IMG_FAIL,
  POST_IMG,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function putMotel(id, formData) {
  return {
    type: PUT_MOTEL,
    id,
    formData,
  };
}

export function putMotelSuccess(response) {
  return {
    type: PUT_MOTEL_SUCCESS,
    response,
  };
}

export function putMotelFail(error) {
  return {
    type: PUT_MOTEL_FAIL,
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

export function postImg(id, formData) {
  return {
    type: POST_IMG,
    id,
    formData,
  };
}

export function postImgSuccess(response) {
  return {
    type: POST_IMGL_SUCCESS,
    response,
  };
}

export function postImgFail(error) {
  return {
    type: POST_IMG_FAIL,
    error,
  };
}
