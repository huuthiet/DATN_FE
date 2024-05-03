/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, POST_SIGN_IN, POST_SIGN_IN_SUCCESS, POST_SIGN_IN_FAIL } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function postSignIn(payload) {
  return {
    type: POST_SIGN_IN,
    payload,
  };
}

export function postSignInSuccess(response) {
  return {
    type: POST_SIGN_IN_SUCCESS,
    response,
  };
}

export function postSignInFail(error) {
  return {
    type: POST_SIGN_IN_FAIL,
    error,
  };
}

