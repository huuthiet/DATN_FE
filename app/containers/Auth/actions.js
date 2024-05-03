/*
 *
 * Auth actions
 *
 */

import {
  DEFAULT_ACTION,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getLogout() {
  return {
    type: LOGOUT,
  };
}

export function getLogoutSuccess(response) {
  return {
    type: LOGOUT_SUCCESS,
    response,
  };
}

export function getLogoutFail(error) {
  return {
    type: LOGOUT_FAIL,
    error,
  };
}
