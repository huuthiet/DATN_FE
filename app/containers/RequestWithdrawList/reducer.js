/*
 *
 * REQUESTWITHDRAWList reducer
 *
 */
import produce from 'immer';
import moment from 'moment';
import Money from '../App/format';
import {
  CHANGE_STORE_DATA,
  GET_REQUESTWITHDRAW_LIST_SUCCESS,
  GET_REQUESTWITHDRAW_LIST_FAIL,
  PUT_REQUESTWITHDRAW_LIST_SUCCESS,
  PUT_REQUESTWITHDRAW_LIST_FAIL,
} from './constants';

export const initialState = {
  requestWithdraw: [],
  showWarningapprove: false,
  showSuccessapprove: false,
  showErrorsapprove: false,
  error: [],
};

/* eslint-disable default-case, no-param-reassign */
const requestWithdrawListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_REQUESTWITHDRAW_LIST_SUCCESS:
        if (action.response) {
          // eslint-disable-next-line no-plusplus
          for (let index = 0; index < action.response.length; index++) {
            const element = action.response[index];
            element.key = index + 1;
            element.fullName = `${element.user.lastName}${
              element.user.firstName
            }`;
            element.updatedAt = moment(element.updatedAt).format(
              'DD/MM/YYYY HH:mm:ss',
            );
            element.paymentInfor = [
              element.nameTkLable,
              element.branch,
              element.nameTk,
              element.stk,
            ];
            element.phoneNumberFull = element.phoneNumberFull;
            element.keyPayment = element.keyPayment;
            element.paymentMethod = element.paymentMethod;
            element.stk = element.stk;
            element.nameTk = element.nameTk;
            element.nameTkLable = element.nameTkLable;
            element.branch = element.branch;
            element.amount = Money(element.amount || 0);
            element.description = element.description;
            element.status = element.status;
            element.image = element.images.length > 0 ? element.images[0] : '';
            element.success = element.status === 'waiting' ? 'true' : 'false';
            element.error = element.status === 'waiting' ? 'true' : 'false';
          }
        }
        draft.requestWithdraw = action.response;
        break;
      case GET_REQUESTWITHDRAW_LIST_FAIL:
        draft.error = action.error;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
      case PUT_REQUESTWITHDRAW_LIST_SUCCESS:
        draft.showSuccessapprove = true;
        break;
      case PUT_REQUESTWITHDRAW_LIST_FAIL:
        draft.error = action.error;
        draft.showErrorsapprove = true;
        break;
    }
  });

export default requestWithdrawListReducer;
