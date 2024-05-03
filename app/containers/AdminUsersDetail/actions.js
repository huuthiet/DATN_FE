/*
 *
 * MotelDetail actions
 *
 */

import {
  DEFAULT_ACTION,
  POST_USER_DETAIL_SUCCESS,
  POST_USER_DETAIL_FAIL,
  POST_USER_DETAIL,
  CHANGE_STORE_DATA,
  PUT_PROFILE,
  PUT_PROFILE_SUCECSS,
  PUT_PROFILE_FAILD,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAdminUserDetail(id) {
  return {
    type: POST_USER_DETAIL,
    id,
  };
}

export function getAdminUserDetailSuccess(response) {
  return {
    type: POST_USER_DETAIL_SUCCESS,
    response,
  };
}

export function getAdminUserDetailFail(error) {
  return {
    type: POST_USER_DETAIL_FAIL,
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

export function putProfile(payload) {
  return {
    type: PUT_PROFILE,
    payload,
  };
}

export function putProfileSuccess(response) {
  return {
    type: PUT_PROFILE_SUCECSS,
    response,
  };
}

export function putProfileFail(error) {
  return {
    type: PUT_PROFILE_FAILD,
    error,
  };
}
