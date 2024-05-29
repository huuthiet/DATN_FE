/*
 *
 * Motel reducer
 *
 */
import produce from 'immer';
import {
  GET_MOTEL_INFOR_SUCCESS,
  GET_MOTEL_INFOR_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export const initialState = {
  listFloor: [],
  error: {},
  showSuccessPopup: false,
  showErrorPopup: false,
  showWarningPopup: false,
};

/* eslint-disable default-case, no-param-reassign */
const motelListRoomReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_MOTEL_INFOR_SUCCESS:
        draft.listFloor = action.response;
        break;
      case GET_MOTEL_INFOR_FAIL:
        draft.listFloor = action.error;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default motelListRoomReducer;
