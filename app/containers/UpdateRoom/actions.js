/*
 *
 * UpdateRoom actions
 *
 */

import {
  DEFAULT_ACTION,
  PUT_EDIT_ROOM,
  PUT_EDIT_ROOM_SUCCESS,
  PUT_EDIT_ROOM_FAIL,
  CHANGE_STORE_DATA,
  DELETE_ROOM,
  DELETE_ROOM_SUCCESS,
  PUSH_IMAGE,
  REMOVE_IMAGE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function putEditRoom(formData, id) {
  return {
    type: PUT_EDIT_ROOM,
    formData,
    id,
  };
}

export function putEditRoomSucess(response) {
  return {
    type: PUT_EDIT_ROOM_SUCCESS,
    response,
  };
}

export function putEditRoomFail(error) {
  return {
    type: PUT_EDIT_ROOM_FAIL,
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

export function deleteRoom(id) {
  return {
    type: DELETE_ROOM,
    id,
  };
}

export function deleteRoomSuccess(response) {
  return {
    type: DELETE_ROOM_SUCCESS,
    response,
  };
}

export function deleteRoomFail(error) {
  return {
    type: DELETE_ROOM_FAIL,
    error,
  };
}

export function pushImage(image) {
  return {
    type: PUSH_IMAGE,
    image,
  };
}

export function removeImage(image) {
  return {
    type: REMOVE_IMAGE,
    image,
  };
}
