/*
 *
 * REQUESTWITHDRAWUSERList reducer
 *
 */
import produce from 'immer';

import Money from '../App/format';
import {
  CHANGE_STORE_DATA,
  GET_REQUESTWITHDRAW_USER_LIST_SUCCESS,
  GET_REQUESTWITHDRAW_USER_LIST_FAIL,
} from './constants';

export const initialState = {
  requestWithdraw: [],
  showWarningapprove: false,
  showSuccessapprove: false,
  showErrorsapprove: false,
  error: [],
};

/* eslint-disable default-case, no-param-reassign */
const requestWithdrawUserListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_REQUESTWITHDRAW_USER_LIST_SUCCESS:
        if (action.response) {
          // eslint-disable-next-line no-plusplus
          for (let index = 0; index < action.response.length; index++) {
            const element = action.response[index];
            element.key = index + 1;
            element.fullName = `${element.user.lastName}${
              element.user.firstName
            }`;
            element.keyPayment = element.keyPayment;
            element.paymentMethod = element.paymentMethod;
            element.stk = element.stk;
            element.nameTk = element.nameTk;
            element.nameTkLable = element.nameTkLable;
            element.branch = element.branch;
            element.amount = Money(element.amount || 0);
            element.description = element.description;
            element.status = element.status;
            element.iamgeLink = element.file;
          }
        }
        draft.requestWithdraw = action.response;
        break;
      case GET_REQUESTWITHDRAW_USER_LIST_FAIL:
        draft.error = action.error;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default requestWithdrawUserListReducer;
