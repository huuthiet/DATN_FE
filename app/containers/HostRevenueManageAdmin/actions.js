/*
 *
 * HostMotelRoom actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_ROOM_SUCCESS,
  GET_LIST_ROOM,
  POST_WITHDRAW,
  POST_WITHDRAW_SUCCESS,
  POST_WITHDRAW_FAIL,
  GET_LIST_ROOM_FAIL,
  GET_HOST_REVENUE,
  GET_HOST_REVENUE_SUCCESS,
  GET_HOST_REVENUE_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getListRoom(data) {
  return {
    type: GET_LIST_ROOM,
    data,
  };
}

export function getListRoomSuccess(response) {
  return {
    type: GET_LIST_ROOM_SUCCESS,
    response,
  };
}

export function getListRoomFail(error) {
  return {
    type: GET_LIST_ROOM_FAIL,
    error,
  };
}

export function getHostRevenue(data) {
  return {
    type: GET_HOST_REVENUE,
    data,
  };
}

export function getHostRevenueSuccess(response) {
  return {
    type: GET_HOST_REVENUE_SUCCESS,
    response,
  };
}

export function getHostRevenueFail(error) {
  return {
    type: GET_HOST_REVENUE_FAIL,
    error,
  };
}

export function postWithdraw(data) {
  return {
    type: POST_WITHDRAW,
    data,
  };
}

export function postWithdrawSuccess(response) {
  return {
    type: POST_WITHDRAW_SUCCESS,
    response,
  };
}

export function postWithdrawFail(error) {
  return {
    type: POST_WITHDRAW_FAIL,
    error,
  };
}
