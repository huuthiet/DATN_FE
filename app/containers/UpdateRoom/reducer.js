/*
 *
 * UpdateRoom reducer
 *
 */
import produce from 'immer';
import _ from 'lodash';
import { GET_ROOM_SUCCESS, GET_ROOM_FAIL } from '../RoomDetail/constants';
import {
  PUT_EDIT_ROOM_SUCCESS,
  PUT_EDIT_ROOM_FAIL,
  CHANGE_STORE_DATA,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_FAIL,
  PUSH_IMAGE,
  REMOVE_IMAGE,
} from './constants';

export const initialState = {
  room: {},
  showSuccessPopup: false,
  showErrorPopup: false,
  showDelete: false,
  content: '',
  error: '',
  images: [],
};

/* eslint-disable default-case, no-param-reassign */
const updateRoomReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ROOM_SUCCESS:
        draft.room = action.response;
        break;
      case GET_ROOM_FAIL:
        draft.room = action.error;
        break;
      case PUT_EDIT_ROOM_SUCCESS:
        draft.showSuccessPopup = true;
        draft.content = 'Cập nhật thành công';
        break;
      case PUT_EDIT_ROOM_FAIL:
        draft.showErrorPopup = true;
        break;
      case DELETE_ROOM_SUCCESS:
        draft.content = 'Xóa phòng thành công';
        draft.showSuccessPopup = true;
        break;
      case DELETE_ROOM_FAIL:
        draft.showErrorPopup = true;
        break;
      case PUSH_IMAGE:
        draft.images.push(URL.createObjectURL(action.image));
        break;
      case REMOVE_IMAGE:
        draft.images = draft.images.filter(function(value) {
          return value !== action.image;
        });
        break;
      case CHANGE_STORE_DATA:
        if (_.isArray(action.key)) {
          draft[action.key[0]][action.key[1]] = action.value;
          break;
        } else {
          draft[action.key] = action.value;
          break;
        }
    }
  });

export default updateRoomReducer;
