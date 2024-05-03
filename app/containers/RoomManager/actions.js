/*
 *
 * RoomManage actions
 *
 */

import {
  CHANGE_STORE_DATA,
  GET_LIST_ROOM,
  GET_LIST_ROOM_SUCCESS,
  GET_LIST_ROOM_FAIL,
} from './constants';

export function changeStoreData(key, value) {
  return {
    type: CHANGE_STORE_DATA,
    key,
    value,
  };
}
export function getListRoom() {
  return {
    type: GET_LIST_ROOM,
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
