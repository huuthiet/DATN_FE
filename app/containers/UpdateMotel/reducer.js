/*
 *
 * UpdateMotel reducer
 *
 */
import produce from 'immer';
import { GET_MOTEL_FAIL, GET_MOTEL_SUCCESS } from '../Motel/constants';
import {
  CHANGE_STORE_DATA,
  POST_IMGL_SUCCESS,
  POST_IMG_FAIL,
  PUT_MOTEL_FAIL,
  PUT_MOTEL_SUCCESS,
} from './constants';

export const initialState = {
  motel: {},
  error: '',
  success: '',
  showSuccessPopup: false,
  content: '',
  postImgData: {},
};

/* eslint-disable default-case, no-param-reassign */
const updateMotelReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_MOTEL_SUCCESS:
        draft.motel = action.response;
        break;
      case GET_MOTEL_FAIL:
        draft.motel = action.error;
        break;
      case PUT_MOTEL_SUCCESS:
        draft.motel = action.response;
        break;
      case PUT_MOTEL_FAIL:
        draft.motel = action.error;
        break;
      case POST_IMGL_SUCCESS:
        draft.postImgData = action.response;
        break;
      case POST_IMG_FAIL:
        draft.postImgData = action.error;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default updateMotelReducer;
