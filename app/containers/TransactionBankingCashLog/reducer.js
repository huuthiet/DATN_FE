/*
 *
 * Profile reducer
 *
 */
import { Breadcrumbs } from '@material-ui/core';
import produce from 'immer';
import {
  CHANGE_STORE_DATA,
  GET_PENDING_ACCEPT_BANKING_CASH_LIST_SUCCESS,
  GET_PENDING_ACCEPT_BANKING_CASH_LIST_FAIL,
} from './constants';

export const initialState = {
  error: {},
  pendingAcceptBankCashList: [],
};

/* eslint-disable default-case, no-param-reassign */
const pendingAcceptBankCashListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PENDING_ACCEPT_BANKING_CASH_LIST_SUCCESS:
        draft.pendingAcceptBankCashList = action.response;
        break;
      case GET_PENDING_ACCEPT_BANKING_CASH_LIST_FAIL:
        draft.error = action.error;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default pendingAcceptBankCashListReducer;
