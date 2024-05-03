/*
 *
 * HistoryFloorsRoomHost actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_MOTEL_ROOM,
  GET_MOTEL_ROOM_FAIL,
  GET_MOTEL_ROOM_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getGetMotelRoom(payload) {
  return {
    type: GET_MOTEL_ROOM,
    payload,
  };
}
export function getGetMotelRoomSucces(response) {
  return {
    type: GET_MOTEL_ROOM_SUCCESS,
    response,
  };
}
export function getGetMotelRoomFail(error) {
  return {
    type: GET_MOTEL_ROOM_FAIL,
    error,
  };
}
