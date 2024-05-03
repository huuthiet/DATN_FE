/*
 *
 * Profile actions
 *
 */

import {
  CHANGE_STORE_DATA,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  POST_PROFILE_UPDATE,
  POST_PROFILE_UPDATE_SUCCESS,
  POST_PROFILE_UPDATE_FAIL,
} from './constants';

export function getProfileUpdate(id) {
  return {
    type: GET_PROFILE,
    id,
  };
}

export function getProfileSuccess(response) {
  return {
    type: GET_PROFILE_SUCCESS,
    response,
  };
}

export function getProfileFail(error) {
  return {
    type: GET_PROFILE_FAIL,
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

export function postUpdateProfile(payload) {
  return {
    type: POST_PROFILE_UPDATE,
    payload,
  };
}

export function postUpdateProfileSuccess(response) {
  return {
    type: POST_PROFILE_UPDATE_SUCCESS,
    response,
  };
}

export function postUpdateProfileFail(error) {
  return {
    type: POST_PROFILE_UPDATE_FAIL,
    error,
  };
}
