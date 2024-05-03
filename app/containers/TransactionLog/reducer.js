/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import moment from 'moment';
import { GET_ORDER_SUCCESS } from './constants';
import Money from '../App/format';

export const initialState = {
  OrderArr: [],
  OrderArrNone: [],
  loginError: {},
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
const transactionLogReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ORDER_SUCCESS:
        let dataPayment = [];
        let dataPaymentNone = [];
        if (action.response) {
          // eslint-disable-next-line no-plusplus
          dataPayment = action.response.data;
          // dataPaymentNone = action.response.dataNone;
          for (let index = 0; index < dataPayment.length; index++) {
            const element = dataPayment[index];
            element.key = index + 1;
            element.amount = Money(element.amount);
            element.paymentMethod = methodPay(element.paymentMethod);
            element.type = typePay(element.type);
            element.description = element.description;
            element.nameMotelRoom = element.motelRoom.name;
            element.nameRoom = element.room.name + ' ' + element.room.key;
            element.paymentDate = moment(element.createdAt).format(
              'DD/MM/YYYY HH:mm:ss',
            );
          }
          // for (let index = 0; index < dataPaymentNone.length; index++) {
          //   const element = dataPaymentNone[index];
          //   element.key = index + 1;
          //   element.amount = Money(element.amount);
          //   element.paymentMethod = methodPay(element.paymentMethod);
          //   element.type = typePay(element.type);
          //   element.description = element.description;
          //   element.nameMotelRoom = element.motelRoomDataDetail.name;
          //   element.nameRoom =
          //     element.jobDetail.room.name + ' ' + element.jobDetail.room.key;
          //   element.paymentDate = moment(element.createdAt).format(
          //     'DD/MM/YYYY HH:mm:ss',
          //   );
          // }
        }
        draft.OrderArr = dataPayment;
        draft.OrderArrNone = dataPaymentNone;
        break;
    }
  });

export default transactionLogReducer;
