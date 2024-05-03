/*
 *
 * SignUp actions
 *
 */

import {
  DEFAULT_ACTION,
  POST_SIGN_UP,
  POST_SIGN_UP_SUCCESS,
  POST_SIGN_UP_FAIL,
  CHANGE_STORE_DATA,
  POST_CONFIRM_OTP,
  POST_CONFIRM_OTP_SUCCESS,
  POST_CONFIRM_OTP_FAIL,
  GET_RESEND_OTP,
  GET_RESEND_OTP_SUCCESS,
  GET_RESEND_OTP_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function postSignUp(payload) {
  return {
    type: POST_SIGN_UP,
    payload,
  };
}

export function postSignUpSuccess(response) {
  return {
    type: POST_SIGN_UP_SUCCESS,
    response,
  };
}

export function postSignUpFail(error) {
  return {
    type: POST_SIGN_UP_FAIL,
    error,
  };
}

export function postConfirmOTP(payload) {
  return {
    type: POST_CONFIRM_OTP,
    payload,
  };
}

export function postConfirmOTPSuccess(response) {
  return {
    type: POST_CONFIRM_OTP_SUCCESS,
    response,
  };
}

export function postConfirmOTPFail(error) {
  return {
    type: POST_CONFIRM_OTP_FAIL,
    error,
  };
}

export function getResendOTP() {
  return {
    type: GET_RESEND_OTP,
  };
}

export function getResendOTPSuccess(response) {
  return {
    type: GET_RESEND_OTP_SUCCESS,
    response,
  };
}

export function getResendOTPFail(error) {
  return {
    type: GET_RESEND_OTP_FAIL,
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
