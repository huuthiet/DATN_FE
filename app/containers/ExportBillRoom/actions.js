/*
 *
 * RoomBill actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_ROOM_SUCCESS_USER,
  GET_LIST_ROOM_USER,
  GET_LIST_ROOM_FAIL_USER,
  POST_EXPORT_BILL_USER,
  POST_EXPORT_BILL_USER_SUCCESS,
  POST_EXPORT_BILL_USER_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getListRoomUser(payload) {
  return {
    type: GET_LIST_ROOM_USER,
    payload,
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

export function postExportBill(payload) {
  return {
    type: POST_EXPORT_BILL_USER,
    payload,
  };
}

export function postExportBillSuccess(response) {
  return {
    type: POST_EXPORT_BILL_USER_SUCCESS,
    response,
  };
}

export function postExportBillFail(error) {
  return {
    type: POST_EXPORT_BILL_USER_FAIL,
    error,
  };
}

export function updateTotalElectricity(value) {
  return {
    type: 'UPDATE_TOTAL_ELECTRICITY',
    response: value,
  };
}
