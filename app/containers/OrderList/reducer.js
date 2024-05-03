/*
 *
 * OrderList reducer
 *
 */
import produce from 'immer';
import Money from '../App/format';
import {
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_LIST_FAIL,
  CHANGE_STORE_DATA,
} from './constants';

export const initialState = {
  orders: [],
  orderArrNone: [],
  error: [],
};

const methodPay = e => {
  if (e === 'internal') {
    return 'Ví nội bộ';
  }
  if (e === 'vnpay') {
    return 'Vnpay';
  }
  if (e === 'cash') {
    return 'Tiền mặt';
  }
  return 'Chưa thanh toán';
};
const typePay = e => {
  if (e === 'deposit') {
    return 'Tiền đặt cọc';
  }
  if (e === 'afterCheckInCost') {
    return 'Tiền khi nhận phòng';
  }
  if (e === 'monthly') return 'Tiền hàng tháng';
  return 'Nạp tiền vào ví';
};

/* eslint-disable default-case, no-param-reassign */
const orderListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ORDER_LIST_SUCCESS:
        let dataPayment = [];
        let dataPaymentNone = [];
        if (action.response) {
          dataPayment = action.response.data;
          dataPaymentNone = action.response.dataNone;
          // eslint-disable-next-line no-plusplus
          for (let index = 0; index < dataPayment.length; index++) {
            const element = dataPayment[index];
            element.key = index + 1;
            element.description = element.description;
            element.typeAction = element.type;
            element.type = typePay(element.type);
            element.amount = Money(element.amount || 0);
            element.paymentMethod = methodPay(element.paymentMethod);
            element.nameMotelRoom = element.motelRoomDataDetail.name;
            element.nameRoom =
              element.roomDetail.name + ' ' + element.roomDetail.key;
            element.nameUser =
              element.userDetail.lastName + element.userDetail.firstName;
            element.phoneNumberUser = `${
              element.userDetail.phoneNumber.countryCode
            } ${element.userDetail.phoneNumber.number}`;
          }
          for (let index = 0; index < dataPaymentNone.length; index++) {
            const element = dataPaymentNone[index];
            element.key = index + 1;
            element.description = element.description;
            element.typeAction = element.type;
            element.type = typePay(element.type);
            element.amount = Money(element.amount || 0);
            element.paymentMethod = methodPay(element.paymentMethod);
            element.nameMotelRoom = element.motelRoomDataDetail.name;
            element.nameRoom =
              element.roomDetail.name + ' ' + element.roomDetail.key;
            element.nameUser =
              element.userDetail.lastName + element.userDetail.firstName;
            element.phoneNumberUser = `${
              element.userDetail.phoneNumber.countryCode
            } ${element.userDetail.phoneNumber.number}`;
          }
        }
        draft.orders = dataPayment;
        draft.orderArrNone = dataPaymentNone;
        break;
      case GET_ORDER_LIST_FAIL:
        draft.error = action.error;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default orderListReducer;
