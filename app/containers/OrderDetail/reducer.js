/*
 *
 * OrderDetail reducer
 *
 */
import produce from 'immer';
import {
  GET_ORDER_DETAIL_SUCCESS,
  GET_ORDER_DETAIL_FAIL,
  CHANGE_STORE_DATA,
  PUT_ORDER_DETAIL_SUCCESS,
  PUT_ORDER_DETAIL_FAIL,
  DELETE_ORDER_DETAIL_SUCCESS,
  DELETE_ORDER_DETAIL_FAIL,
} from './constants';

export const initialState = {
  content: '',
  order: {},
  error: [],
  showSuccessPopup: false,
  editPopup: false,
  deletePopup: false,
};

/* eslint-disable default-case, no-param-reassign */
const orderDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ORDER_DETAIL_SUCCESS:
        draft.order = action.response;
        break;
      case GET_ORDER_DETAIL_FAIL:
        draft.error = action.error;
        break;
      case PUT_ORDER_DETAIL_SUCCESS:
        draft.order = action.response;
        draft.showSuccessPopup = true;
        draft.content = 'Thay đổi thành công';
        break;
      case PUT_ORDER_DETAIL_FAIL:
        draft.error = action.error;
        break;
      case DELETE_ORDER_DETAIL_SUCCESS:
        draft.showSuccessPopup = true;
        draft.content = 'Xóa thành công thành công';
        break;
      case DELETE_ORDER_DETAIL_FAIL:
        draft.error = action.error;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default orderDetailReducer;
