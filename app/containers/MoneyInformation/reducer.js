/*
 *
 * MoneyInformation reducer
 *
 */
import produce from 'immer';
import {
  GET_ADMIN_BANK_SUCCESS,
  GET_ADMIN_BANK_FAIL,
  CHANGE_STORE_DATA,
  DELETE_ADMIN_BANK_SUCCES,
  DELETE_ADMIN_BANK_FAIL,
} from './constants';

export const initialState = {
  banks: [],
  options123: [],
  showSuccessPopup: false,
  showErrorPopup: false,
  showWarningPopup: false,
};

/* eslint-disable default-case, no-param-reassign */
const MoneyInformationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ADMIN_BANK_SUCCESS:
        draft.banks = action.response.data;
        break;
      case GET_ADMIN_BANK_FAIL:
        draft.error = action.error;
        draft.showErrorPopup = true;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
      case DELETE_ADMIN_BANK_SUCCES:
        draft.showSuccessPopup = true;
        break;
      case DELETE_ADMIN_BANK_FAIL:
        draft.error = action.error;
        draft.showErrorPopup = true;
        break;
    }
  });

export default MoneyInformationReducer;
