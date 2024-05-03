/*
 *
 * HostMotelRoom actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_ROOM_SUCCESS_USER,
  GET_LIST_ROOM_USER,
  GET_LIST_ROOM_FAIL_USER,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getListRoomUser() {
  return {
    type: GET_LIST_ROOM_USER,
  };
}

export function getListRoomSuccessUser(response) {
  return {
    type: GET_LIST_ROOM_SUCCESS_USER,
    response,
  };
}

export function getListRoomFailUser(error) {
  return {
    type: GET_LIST_ROOM_FAIL_USER,
    error,
  };
}
