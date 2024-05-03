/*
 *
 * MotelDetail reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_STORE_DATA,
  GET_DETAIL_BANK_SUCCESS,
  GET_DETAIL_BANK_FAIL,
  GET_MASTER_BANK_BANK_SUCCESS,
  GET_MASTER_BANK_BANK_FAIL,
} from './constants';

export const initialState = {
  moneyInformationDetail: {},
  options: [],
  error: {},
  showSuccessPopup: false,
  showErrorPopup: false,
  showWarningPopup: false,
};

/* eslint-disable default-case, no-param-reassign */
const MoneyInformationDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
      case GET_DETAIL_BANK_SUCCESS:
        draft.moneyInformationDetail = action.response;
        break;
      case GET_DETAIL_BANK_FAIL:
        draft.moneyInformationDetail = action.error;
        draft.showErrorPopup = true;
        break;

      case GET_MASTER_BANK_BANK_SUCCESS:
        draft.options = action.response;
        break;
      case GET_MASTER_BANK_BANK_FAIL:
        draft.options = action.error;
        draft.showErrorPopup = true;
        break;
    }
  });

export default MoneyInformationDetailReducer;
