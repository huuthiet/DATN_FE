/*
 *
 * HostMotelRoom actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_ROOM_SUCCESS,
  GET_LIST_ROOM,
  GET_LIST_ROOM_FAIL,
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
