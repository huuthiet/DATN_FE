/*
 *
 * AddMoney reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  CHANGE_STORE_DATA,
  ADD_BANK_USER_SUCCESS,
  ADD_BANK_USER_FAIL,
} from './constants';

export const initialState = {
  bankUser: {},
  showSuccessPopup: false,
  showErrorPopup: false,
  showWarningPopup: false,
};

/* eslint-disable default-case, no-param-reassign */
const addMoneyReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
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

export default addMoneyReducer;
