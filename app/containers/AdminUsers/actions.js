/*
 *
 * AdminUsers actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ADMIN_USERS,
  GET_ADMIN_USERS_SUCCESS,
  GET_ADMIN_USERS_FAIL,
  DELETE_ADMIN_USER,
  DELETE_ADMIN_USER_SUCCESS,
  DELETE_ADMIN_USER_FAIL,
  CHANGE_STORE_DATA,
  UPDATE_ADMIN_USER,
  UPDATE_ADMIN_USER_SUCCESS,
  UPDATE_ADMIN_USER_FAIL,
  RESET_PW_ADMIN_USER,
  RESET_PW_ADMIN_USER_SUCCESS,
  RESET_PW_ADMIN_USER_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAdminUsers() {
  return {
    type: GET_ADMIN_USERS,
  };
}

export function getAdminUsersSuccess(response) {
  return {
    type: GET_ADMIN_USERS_SUCCESS,
    response,
  };
}

export function getAdminUsersFail(error) {
  return {
    type: GET_ADMIN_USERS_FAIL,
    error,
  };
}

export function postUpdateUser(userId, wallet) {
  return {
    type: UPDATE_ADMIN_USER,
    userId,
    wallet,
  };
}
export function postUpdateUserSuccess(userId, wallet) {
  return {
    type: UPDATE_ADMIN_USER_SUCCESS,
    userId,
    wallet,
  };
}
export function postUpdateUserFail(userId, wallet) {
  return {
    type: UPDATE_ADMIN_USER_FAIL,
    userId,
    wallet,
  };
}

export function deleteAdminUser(userId, reason) {
  return {
    type: DELETE_ADMIN_USER,
    userId,
    reason,
  };
}

export function deleteAdminUserSuccess(response) {
  return {
    type: DELETE_ADMIN_USER_SUCCESS,
    response,
  };
}

export function deleteAdminUserFail(error) {
  return {
    type: DELETE_ADMIN_USER_FAIL,
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

export function resetPWAdminUser(userId, reason) {
  return {
    type: RESET_PW_ADMIN_USER,
    userId,
    reason,
  };
}

export function resetPWAdminUserSuccess(response) {
  return {
    type: RESET_PW_ADMIN_USER_SUCCESS,
    response,
  };
}

export function resetPWAdminUserFail(error) {
  return {
    type: RESET_PW_ADMIN_USER_FAIL,
    error,
  };
}
