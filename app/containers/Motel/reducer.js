/*
 *
 * Motel reducer
 *
 */
import produce from 'immer';
import {
  GET_MOTEL_SUCCESS,
  GET_MOTEL_FAIL,
  GET_MOTEL_INFOR_SUCCESS,
  GET_MOTEL_INFOR_FAIL,
  POST_FLOOR_SUCCESS,
  POST_FLOOR_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export const initialState = {
  motel: {},
  motelInfor: {},
  error: {},
  showSuccessPopup: false,
  showErrorPopup: false,
  showWarningPopup: false,
};

/* eslint-disable default-case, no-param-reassign */
const motelReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_MOTEL_SUCCESS:
        draft.motel = action.response;
        break;
      case GET_MOTEL_FAIL:
        draft.motel = action.error;
        break;
      case GET_MOTEL_INFOR_SUCCESS:
        draft.motelInfor = action.response;
        break;
      case GET_MOTEL_INFOR_FAIL:
        draft.motelInfor = action.error;
        break;
      case POST_FLOOR_SUCCESS:
        draft.showSuccessPopup = true;
        break;
      case POST_FLOOR_FAIL:
        draft.error = action.error;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default motelReducer;
