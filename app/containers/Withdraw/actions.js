/*
 *
 * Profile actions
 *
 */

import {
    GET_USER_BANK,
    GET_USER_BANK_SUCCESS,
    GET_USER_BANK_FAIL,
    GET_PROFILE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    POST_REQUEST_WITHDRAW_USER,
    POST_REQUEST_WITHDRAW_USER_SUCCESS,
    POST_REQUEST_WITHDRAW_USER_FAIL,
} from './constants';

export function getProfile() {
    return {
        type: GET_PROFILE,
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

export function getUserBank() {
  return {
    type: GET_USER_BANK,
  };
}

export function getUserBankSuccess(response) {
  return {
    type: GET_USER_BANK_SUCCESS,
    response,
  };
}

export function getUserBankFail(error) {
  return {
    type: GET_USER_BANK_FAIL,
    error,
  };
}

export function postRequestWithdrawUser(payload) {
  return {
    type: POST_REQUEST_WITHDRAW_USER,
    payload,
  };
}

export function postRequestWithdrawUserSuccess(response) {
  return {
    type: POST_REQUEST_WITHDRAW_USER_SUCCESS,
    response,
  };
}

export function postRequestWithdrawUserFail(error) {
  return {
    type: POST_REQUEST_WITHDRAW_USER_FAIL,
    error,
  };
}
