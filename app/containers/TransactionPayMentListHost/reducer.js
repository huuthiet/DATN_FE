/*
 *
 * TRANSACTIONPAYMENTListHost reducer
 *
 */
import produce from 'immer';
import moment from 'moment';
import Money from '../App/format';
import {
  GET_TRANSACTIONPAYMENT_LIST_SUCCESS,
  GET_TRANSACTIONPAYMENT_LIST_FAIL,
  PUT_TRANSACTIONPAYMENT_LIST_SUCCESS,
  PUT_TRANSACTIONPAYMENT_LIST_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export const initialState = {
  transactionPayment: [],
  showWarningapprove: false,
  showSuccessapprove: false,
  showErrorsapprove: false,
  error: [],
};

/* eslint-disable default-case, no-param-reassign */
const transactionPaymentListHostReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_TRANSACTIONPAYMENT_LIST_SUCCESS:
        if (action.response) {
          for (let index = 0; index < action.response.length; index++) {
            const element = action.response[index];
            element.key = index + 1;
            element.keyPayment = element.keyPayment;
            element.paymentMethod = element.paymentMethod;
            element.phoneNumberFull = element.user.phoneNumberFull;
            element.fullName = `${element.user.lastName} - ${
              element.user.firstName
            }`;
            element.amount = Money(element.amount || 0);
            element.updatedAt = moment(element.updatedAt).format(
              'DD/MM/YYYY HH:mm:ss',
            );
            element.description = element.description;
            element.status = element.status;
            element.image = element.images.length > 0 ? element.images[0] : '';
            element.success = element.status === 'waiting' ? 'true' : 'false';
            element.error = element.status === 'waiting' ? 'true' : 'false';
          }
        }
        draft.transactionPayment = action.response;
        break;
      case GET_TRANSACTIONPAYMENT_LIST_FAIL:
        draft.error = action.error;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
      case PUT_TRANSACTIONPAYMENT_LIST_SUCCESS:
        draft.showSuccessapprove = true;
        break;
      case PUT_TRANSACTIONPAYMENT_LIST_FAIL:
        draft.error = action.error;
        draft.showErrorsapprove = true;
        break;
    }
  });

export default transactionPaymentListHostReducer;
