/*
 *
 * Profile reducer
 *
 */
import { Breadcrumbs } from '@material-ui/core';
import produce from 'immer';
import {
  CHANGE_STORE_DATA,
  GET_LIST_ORDER_NO_PAY_OF_PAY_DEPOSIT_SUCCESS,
  GET_LIST_ORDER_NO_PAY_OF_PAY_DEPOSIT_FAIL,
} from './constants';

export const initialState = {
  listOrderNoPayOfPayDeposit: [],
};

/* eslint-disable default-case, no-param-reassign */
const payDepositListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_ORDER_NO_PAY_OF_PAY_DEPOSIT_SUCCESS:
        draft.listOrderNoPayOfPayDeposit = action.response;
        break;
      case GET_LIST_ORDER_NO_PAY_OF_PAY_DEPOSIT_FAIL:
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default payDepositListReducer;
