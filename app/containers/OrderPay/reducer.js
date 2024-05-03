/*
 *
 * orderPay reducer
 *
 */
import produce from 'immer';
import {
  GET_ORDERPAY_FAIL,
  GET_ORDERPAY_SUCCESS,
  ADD_BANK_USER_SUCCESS,
  ADD_BANK_USER_FAIL,
} from './constants';

export const initialState = {
  orderPay: {},
  bankUser: [],
  error: [],
};

/* eslint-disable default-case, no-param-reassign */
const orderPayReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ORDERPAY_SUCCESS:
        draft.orderPay = action.response;
        break;
      case GET_ORDERPAY_FAIL:
        draft.error = action.error.errors;
        break;
      case ADD_BANK_USER_SUCCESS:
        draft.bankUser = action.response;
        break;
      case ADD_BANK_USER_FAIL:
        draft.bankUser = action.error;
        draft.showErrorPopup = true;
        break;
    }
  });

export default orderPayReducer;
