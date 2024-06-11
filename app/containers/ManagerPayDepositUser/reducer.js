/*
 *
 * Profile reducer
 *
 */
import { Breadcrumbs } from '@material-ui/core';
import produce from 'immer';
import {
  CHANGE_STORE_DATA,
  GET_PAY_DEPOSIT_LIST_SUCCESS,
  GET_PAY_DEPOSIT_LIST_FAIL,
} from './constants';

export const initialState = {
  error: {},
  action: false,
  payDepositList: [],
  showWarningapprove: false,
  showSuccessapprove: false,
  showErrorsapprove: false,
};

/* eslint-disable default-case, no-param-reassign */
const payDepositListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PAY_DEPOSIT_LIST_SUCCESS:
        draft.payDepositList = action.response;
        break;
      case GET_PAY_DEPOSIT_LIST_FAIL:
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default payDepositListReducer;
