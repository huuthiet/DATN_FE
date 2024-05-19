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
  ADD_METER,
  ADD_METER_SUCCESS,
  ADD_METER_FAIL,
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

export function putMeter(payload) {
  return {
    type: ADD_METER,
    payload,
  };
}

export function putMeterSuccess(response) {
  return {
    type: ADD_METER_SUCCESS,
    response,
  };
}

export function putMeterFail(error) {
  return {
    type: ADD_METER_FAIL,
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
