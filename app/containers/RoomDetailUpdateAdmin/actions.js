/*
 *
 * CreateMotel actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_ROOM,
  POST_MOTEL_SUCCESS,
  POST_MOTEL_FAIL,
  POST_MOTEL,
  CHANGE_STORE_DATA,
  PUT_ROOM_DETAIL_UPDATE,
  PUT_ROOM_DETAIL_UPDATE_SUCCESS,
  PUT_ROOM_DETAIL_UPDATE_FAIL,
  GET_ROOM,
  GET_ROOM_SUCCESS,
  GET_ROOM_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function set_room(key, value) {
  return {
    type: SET_ROOM,
    key,
    value,
  };
}

export function postMotel(payload) {
  return {
    type: POST_MOTEL,
    payload,
  };
}

export function postMotelSuccess(response) {
  return {
    type: POST_MOTEL_SUCCESS,
    response,
  };
}

export function postMotelFail(error) {
  return {
    type: POST_MOTEL_FAIL,
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

export function putRoomDetailUpdate(payload) {
  return {
    type: PUT_ROOM_DETAIL_UPDATE,
    payload,
  };
}

export function putRoomDetailUpdateSuccess(response) {
  return {
    type: PUT_ROOM_DETAIL_UPDATE_SUCCESS,
    response,
  };
}

export function putRoomDetailUpdateFail(error) {
  return {
    type: PUT_ROOM_DETAIL_UPDATE_FAIL,
    error,
  };
}

export function getRoom(id) {
  return {
    type: GET_ROOM,
    id,
  };
}

export function getRoomSuccess(response) {
  return {
    type: GET_ROOM_SUCCESS,
    response,
  };
}

export function getRoomFail(error) {
  return {
    type: GET_ROOM_FAIL,
    error,
  };
}
